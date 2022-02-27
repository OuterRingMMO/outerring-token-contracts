// SPDX-License-Identifier: MIT
pragma solidity 0.8.4;

import "@openzeppelin/contracts/utils/Context.sol";

contract LGEWhitelisted is Context {
    struct WhitelistRound {
        uint256 duration;
        uint256 amountMax;
        mapping(address => bool) addresses;
        mapping(address => uint256) purchased;
    }

    WhitelistRound[] public _lgeWhitelistRounds;

    uint256 public _lgeTimestamp;
    address public _lgePairAddress;

    address public _whitelister;

    event WhitelisterTransferred(address indexed previousWhitelister, address indexed newWhitelister);

    constructor() {
        _whitelister = _msgSender();
    }

    modifier onlyWhitelister() {
        require(_whitelister == _msgSender(), "Caller is not the whitelister");
        _;
    }

    function renounceWhitelister() external onlyWhitelister {
        emit WhitelisterTransferred(_whitelister, address(0));
        _whitelister = address(0);
    }

    function transferWhitelister(address newWhitelister) external onlyWhitelister {
        _transferWhitelister(newWhitelister);
    }

    function _transferWhitelister(address newWhitelister) internal {
        require(newWhitelister != address(0), "New whitelister is the zero address");
        emit WhitelisterTransferred(_whitelister, newWhitelister);
        _whitelister = newWhitelister;
    }

    /*
     * createLGEWhitelist - Call this after initial Token Generation Event (TGE)
     *
     * pairAddress - address generated from createPair() event on DEX
     * durations - array of durations (seconds) for each whitelist rounds
     * amountsMax - array of max amounts (TOKEN decimals) for each whitelist round
     *
     */

    function createLGEWhitelist(
        address pairAddress,
        uint256[] calldata durations,
        uint256[] calldata amountsMax
    ) external onlyWhitelister() {
        require(durations.length == amountsMax.length, "Invalid whitelist(s)");

        _lgePairAddress = pairAddress;

        if (durations.length > 0) {
            delete _lgeWhitelistRounds;

            for (uint256 i = 0; i < durations.length; i++) {
                WhitelistRound storage whitelistRound = _lgeWhitelistRounds.push();
                whitelistRound.duration = durations[i];
                whitelistRound.amountMax = amountsMax[i];
            }
        }
    }

    /*
     * modifyLGEWhitelistAddresses - Define what addresses are included/excluded from a whitelist round
     *
     * index - 0-based index of round to modify whitelist
     * duration - period in seconds from LGE event or previous whitelist round
     * amountMax - max amount (TOKEN decimals) for each whitelist round
     *
     */

    function modifyLGEWhitelist(
        uint256 index,
        uint256 duration,
        uint256 amountMax
    ) external onlyWhitelister() {
        require(index < _lgeWhitelistRounds.length, "Invalid index");
        require(amountMax > 0, "Invalid amountMax");

        if (duration != _lgeWhitelistRounds[index].duration) _lgeWhitelistRounds[index].duration = duration;

        if (amountMax != _lgeWhitelistRounds[index].amountMax) _lgeWhitelistRounds[index].amountMax = amountMax;

    }

    /*
     *  getLGEWhitelistRound
     *
     *  returns:
     *
     *  1. whitelist round number ( 0 = no active round now )
     *  2. duration, in seconds, current whitelist round is active for
     *  3. timestamp current whitelist round closes at
     *  4. maximum amount a whitelister can purchase in this round
     *  5. is caller whitelisted
     *  6. how much caller has purchased in current whitelist round
     *
     */

    function getLGEWhitelistRound()
        public
        view
        returns (
            uint256,
            uint256,
            uint256,
            uint256,
            uint256
        )
    {
        if (_lgeTimestamp > 0) {
            uint256 wlCloseTimestampLast = _lgeTimestamp;

            for (uint256 i = 0; i < _lgeWhitelistRounds.length; i++) {
                WhitelistRound storage wlRound = _lgeWhitelistRounds[i];

                wlCloseTimestampLast = wlCloseTimestampLast + wlRound.duration;
                if (block.timestamp <= wlCloseTimestampLast)
                    return (
                        i + 1,
                        wlRound.duration,
                        wlCloseTimestampLast,
                        wlRound.amountMax,
                        wlRound.purchased[_msgSender()]
                    );
            }
        }

        return (0, 0, 0, 0, 0);
    }

    /*
     * _applyLGEWhitelist - internal function to be called initially before any transfers
     *
     */

    function _applyLGEWhitelist(
        address sender,
        address recipient,
        uint256 amount
    ) internal {
        if (_lgePairAddress == address(0) || _lgeWhitelistRounds.length == 0) return;

        if (_lgeTimestamp == 0 && sender != _lgePairAddress && recipient == _lgePairAddress && amount > 0)
            _lgeTimestamp = block.timestamp;

        if (sender == _lgePairAddress && recipient != _lgePairAddress) {
            //buying

            (uint256 wlRoundNumber, , , , ) = getLGEWhitelistRound();

            if (wlRoundNumber > 0) {
                WhitelistRound storage wlRound = _lgeWhitelistRounds[wlRoundNumber - 1];

                uint256 amountRemaining = 0;

                if (wlRound.purchased[recipient] < wlRound.amountMax)
                    amountRemaining = wlRound.amountMax - wlRound.purchased[recipient];

                require(amount <= amountRemaining, "LGE - Amount exceeds maximum amount");
                wlRound.purchased[recipient] = wlRound.purchased[recipient] + amount;
            }
        }
    }
}
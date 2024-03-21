// SPDX-License-Identifier: MIT
pragma solidity 0.8.4;

import "@openzeppelin/contracts/utils/Context.sol";
import "@openzeppelin/contracts/access/AccessControlEnumerable.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "./BEP20TokenWhitelisted.sol";

import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";

contract TestERC20 is
    BEP20TokenWhitelisted,
    AccessControlEnumerable
{
    using SafeERC20 for IERC20;

    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");
    bytes32 public constant EMERGENCY_WITHDRAW_ROLE = keccak256("EMERGENCY_WITHDRAW_ROLE");

    constructor() BEP20TokenWhitelisted("TestERC20", "TERC20") {
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(MINTER_ROLE, msg.sender);
        _grantRole(EMERGENCY_WITHDRAW_ROLE, msg.sender);
        _mint(msg.sender, 1000000000 * 10**decimals());
    }

    function mint(address to, uint256 amount) public onlyRole(MINTER_ROLE) {
        _mint(to, amount);
    }

    function emergencyWithdraw(address token) external onlyRole(EMERGENCY_WITHDRAW_ROLE) {
        uint256 balance = IERC20(token).balanceOf(address(this));
        require(balance > 0, "No tokens to withdraw");
        IERC20(token).safeTransfer(msg.sender, balance);
    }
}

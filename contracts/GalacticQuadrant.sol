// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/utils/Context.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "./BEP20TokenWhitelisted.sol";

contract GalacticQuadrant is BEP20TokenWhitelisted, AccessControl {
    
    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");

    uint256 immutable private _cap;

    event Minted(address indexed minter, address indexed receiver, uint256 mintAmount);
    event Burned(address indexed burner, uint256 burnAmount);

    constructor() BEP20TokenWhitelisted("Galactic Quadrant", "GQ") {
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(MINTER_ROLE, msg.sender);
        _cap = 10000000000 * 10 ** decimals();
    }

    /**
    * @dev Returns the max cap of the token
    */
    function cap() public view returns (uint256) {
        return _cap;
    }

    function mint(address _to, uint256 _amount) public onlyRole(MINTER_ROLE) {
        require(totalSupply() + _amount <= _cap, "BEP20Capped: Cap exceeded");
        _mint(_to, _amount);
        emit Minted(msg.sender, _to, _amount);
    }

    function burn(uint256 _amount) public {
        _burn(msg.sender, _amount);
        emit Burned(msg.sender, _amount);
    }


}

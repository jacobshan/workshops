// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/metatx/ERC2771Context.sol";
import "@openzeppelin/contracts/metatx/MinimalForwarder.sol";

contract SushiCutie is ERC1155, ERC2771Context {
    uint256 public constant Sushi1 = 1;
    // uint256 public constant Sushi2 = 2;

    mapping(address => uint256) public nonces;

    constructor(
        MinimalForwarder forwarder
    ) ERC1155("https://bafybeigbpedvsde45bq5gi4rwamg2nxynoojwampa2edknfkkuoz5574gm.ipfs.nftstorage.link/{id}.json") ERC2771Context(address(forwarder)) {}

    function mint(uint256 id, uint256 amount) public {
        _mint(_msgSender(), id, amount, "");
    }

    function _msgSender()
        internal
        view
        override(Context, ERC2771Context)
        returns (address)
    {
        return ERC2771Context._msgSender();
    }

    function _msgData()
        internal
        view
        override(Context, ERC2771Context)
        returns (bytes calldata)
    {
        return ERC2771Context._msgData();
    }

    function uri(
        uint256 _tokenid
    ) public pure override returns (string memory) {
        return
            string(
                abi.encodePacked(
                    "https://bafybeigbpedvsde45bq5gi4rwamg2nxynoojwampa2edknfkkuoz5574gm.ipfs.nftstorage.link/",
                    Strings.toString(_tokenid),
                    ".json"
                )
            );
    }
}

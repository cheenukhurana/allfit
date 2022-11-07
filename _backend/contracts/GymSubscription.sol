// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "./GymStore.sol";

contract GymSubscription is ERC721URIStorage {
    GymStore private _gymStore;
    uint256 serviceId = 0;

    struct storeSubscription {
        uint256 tokenId;
        string ipfsHash;
        string imgUrl;
        address owner; // == None -> Akshit
        uint256 createdAt; // timestamp
        uint256 invalidAfter; // timestamp after which service is invalid
    }

    storeSubscription[] subscriptions;

    constructor(address gymStoreContract) ERC721("GymSubscriptionNFT", "GSFT") {
        _gymStore = GymStore(gymStoreContract);
    }

    function createSubscription(
        string memory ipfsHash,
        string memory imgUrl,
        address ownerAddress,
        uint256 invalidAfter,
        uint256 subValue
    ) public {
        if (ownerAddress == address(0)) {
            ownerAddress = msg.sender;
        }

        uint256 sid = subscriptions.length;
        storeSubscription memory nextSub = storeSubscription(
            sid,
            ipfsHash,
            imgUrl,
            ownerAddress,
            block.timestamp,
            invalidAfter
        );

        // _transfer(msg.sender, _gymStore, tokenId);
        subscriptions.push(nextSub);
        _mint(msg.sender, serviceId);
        serviceId++;

        address storeOwner = _gymStore.getStoreOwner(
            _gymStore.getStoreNumber()
        );
        payable(storeOwner).transfer(subValue);
    }

    function hasStoreSubscription(address userAddr) public view returns (bool) {
        for (uint256 i = 0; i < serviceId; i++) {
            if (subscriptions[i].owner == userAddr) {
                return true;
            }
        }
        return false;
    }

    function transferSubscription(uint256 sId, address transferAddr)
        public
        returns (bool)
    {
        for (uint256 i = 0; i < serviceId; i++) {
            if (subscriptions[i].tokenId == sId) {
                // make the transfer now
                subscriptions[i].owner = transferAddr;
                return true;
            }
        }
        return false;
    }
}

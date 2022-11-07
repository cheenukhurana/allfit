// SPDX-License-Identifier: MIT
// pragma solidity >=0.4.22 <0.9.0;
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract GymStore is ERC721URIStorage {
    uint256 storeNumber = 0;

    struct storeDetails {
        uint256 tokenId;
        address ownerAddress;
        string ipfsHash;
        uint256 createdAt; // timestamp
        address[] subscriptions; // services
    }

    storeDetails[] stores;

    mapping(uint256 => storeDetails) storeMappings;
    mapping(uint256 => address) storeOwner;
    mapping(address => uint256) storeNumberMapping;
    mapping(address => bool) registeredAStore;

    constructor() ERC721("GymStoreNFT", "GST") {
        // create the token here. Nothing to do for now, might add something later
    }

    function createStore(
        string memory ipfsHash,
        address[] memory _subscriptions
    ) public {
        require(
            registeredAStore[msg.sender] == false,
            "You already have a store in place"
        );
        // Does one member can have only one business, or can have more?
        // Going with only 1 store per account for now
        uint256 sid = stores.length;
        storeDetails memory nextStore = storeDetails(
            sid,
            msg.sender,
            ipfsHash,
            block.timestamp,
            _subscriptions
        );
        stores.push(nextStore);
        _mint(msg.sender, storeNumber);

        registeredAStore[msg.sender] = true;
        storeNumberMapping[msg.sender] = storeNumber;
        storeOwner[sid] = msg.sender;

        storeNumber++;
    }

    function getStore(uint256 _storeId)
        public
        view
        returns (
            uint256,
            string memory,
            address,
            uint256,
            address[] memory
        )
    {
        return (
            stores[_storeId].tokenId,
            stores[_storeId].ipfsHash,
            stores[_storeId].ownerAddress,
            stores[_storeId].createdAt,
            stores[_storeId].subscriptions
        );
    }

    function getOwnerStore(address ownerAddress)
        public
        view
        returns (
            uint256,
            string memory,
            address,
            uint256,
            address[] memory
        )
    {
        uint256 storeNum = storeNumberMapping[ownerAddress];
        return (
            stores[storeNum].tokenId,
            stores[storeNum].ipfsHash,
            stores[storeNum].ownerAddress,
            stores[storeNum].createdAt,
            stores[storeNum].subscriptions
        );
    }

    function deleteStore(uint256 _storeId) public {
        require(storeOwner[_storeId] == msg.sender);
        delete storeOwner[_storeId];
    }

    function getStoreOwner(uint256 storeId) public view returns (address) {
        return (storeOwner[storeId]);
    }

    function getStoreNumber() public view returns (uint256) {
        return storeNumber;
    }

    function getStoreId(address _address) public view returns (uint256) {
        return storeNumberMapping[_address];
    }

    function ownsAStore(address _storeOWner) public view returns (bool) {
        return registeredAStore[_storeOWner];
    }
}

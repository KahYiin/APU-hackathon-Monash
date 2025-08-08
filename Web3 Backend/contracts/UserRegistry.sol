// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

/**
 * @title UserRegistry - Simplified Version for Beginners
 * @dev This contract manages user profiles in a simple, easy-to-understand way
 */
contract UserRegistry {
    
    // Structure to hold user information
    struct User {
        address walletAddress;    // User's wallet address
        string username;          // Unique username
        string profileData;       // JSON string with profile info (name, bio, etc.)
        uint256 createdAt;        // When user registered
        bool isActive;           // Is account active
    }

    // Mapping from address to user data
    mapping(address => User) public users;
    
    // Mapping from username to address (to check uniqueness)
    mapping(string => address) public usernameToAddress;
    
    // Mapping to check if user is registered
    mapping(address => bool) public isRegistered;
    
    // Array to store all user addresses (for listing)
    address[] public userList;
    
    // Events (like notifications when things happen)
    event UserRegistered(address indexed userAddress, string username);
    event ProfileUpdated(address indexed userAddress);

    /**
     * @dev Register a new user
     * @param _username Unique username (3-20 characters)
     * @param _profileData JSON string with user info
     */
    function registerUser(string memory _username, string memory _profileData) external {
        // Check if user is already registered
        require(!isRegistered[msg.sender], "User already registered");
        
        // Check username length
        require(bytes(_username).length >= 3, "Username too short (min 3 chars)");
        require(bytes(_username).length <= 20, "Username too long (max 20 chars)");
        
        // Check if username is available
        require(usernameToAddress[_username] == address(0), "Username already taken");
        
        // Check profile data is provided
        require(bytes(_profileData).length > 0, "Profile data required");

        // Create new user
        users[msg.sender] = User({
            walletAddress: msg.sender,
            username: _username,
            profileData: _profileData,
            createdAt: block.timestamp,
            isActive: true
        });

        // Update mappings
        usernameToAddress[_username] = msg.sender;
        isRegistered[msg.sender] = true;
        userList.push(msg.sender);

        // Emit event
        emit UserRegistered(msg.sender, _username);
    }

    /**
     * @dev Update user profile data
     * @param _profileData New profile data
     */
    function updateProfile(string memory _profileData) external {
        require(isRegistered[msg.sender], "User not registered");
        require(users[msg.sender].isActive, "Account not active");
        require(bytes(_profileData).length > 0, "Profile data required");

        users[msg.sender].profileData = _profileData;
        
        emit ProfileUpdated(msg.sender);
    }

    /**
     * @dev Get user profile by address
     * @param _userAddress User's wallet address
     * @return User data
     */
    function getUser(address _userAddress) external view returns (User memory) {
        require(isRegistered[_userAddress], "User not found");
        return users[_userAddress];
    }

    /**
     * @dev Get user profile by username
     * @param _username Username to search
     * @return User data
     */
    function getUserByUsername(string memory _username) external view returns (User memory) {
        address userAddress = usernameToAddress[_username];
        require(userAddress != address(0), "Username not found");
        return users[userAddress];
    }

    /**
     * @dev Check if username is available
     * @param _username Username to check
     * @return true if available
     */
    function isUsernameAvailable(string memory _username) external view returns (bool) {
        return usernameToAddress[_username] == address(0);
    }

    /**
     * @dev Get total number of registered users
     * @return Number of users
     */
    function getTotalUsers() external view returns (uint256) {
        return userList.length;
    }

    /**
     * @dev Get all user addresses (for admin purposes)
     * @param _start Starting index
     * @param _limit Number of users to return
     * @return Array of user addresses
     */
    function getUsers(uint256 _start, uint256 _limit) external view returns (address[] memory) {
        require(_start < userList.length, "Start index out of bounds");
        
        uint256 end = _start + _limit;
        if (end > userList.length) {
            end = userList.length;
        }
        
        address[] memory result = new address[](end - _start);
        for (uint256 i = _start; i < end; i++) {
            result[i - _start] = userList[i];
        }
        
        return result;
    }
}
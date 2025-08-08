// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

/**
 * @title PostManager - Simplified Version for Beginners
 * @dev This contract manages blog posts in a simple way
 */
contract PostManager {
    
    // Post status options
    enum Status { Draft, Published, Deleted }
    
    // Structure to hold post information
    struct Post {
        uint256 id;               // Unique post ID
        address author;           // Who wrote the post
        string title;            // Post title
        string content;          // Post content (could be IPFS hash)
        string category;         // Post category
        Status status;           // Current status
        uint256 createdAt;       // When post was created
        uint256 likes;           // Number of likes
        uint256 views;           // Number of views
    }

    // Counter for post IDs
    uint256 private nextPostId = 1;
    
    // Mapping from post ID to post data
    mapping(uint256 => Post) public posts;
    
    // Mapping from author to their post IDs
    mapping(address => uint256[]) public authorPosts;
    
    // Mapping to track if user liked a post
    mapping(uint256 => mapping(address => bool)) public hasLiked;
    
    // Array of all post IDs
    uint256[] public allPosts;
    
    // Events
    event PostCreated(uint256 indexed postId, address indexed author, string title);
    event PostPublished(uint256 indexed postId, address indexed author);
    event PostLiked(uint256 indexed postId, address indexed liker);
    event PostViewed(uint256 indexed postId);

    /**
     * @dev Create a new post
     * @param _title Post title
     * @param _content Post content
     * @param _category Post category
     * @param _publishNow Whether to publish immediately
     */
    function createPost(
        string memory _title,
        string memory _content,
        string memory _category,
        bool _publishNow
    ) external {
        require(bytes(_title).length > 0, "Title cannot be empty");
        require(bytes(_content).length > 0, "Content cannot be empty");
        require(bytes(_category).length > 0, "Category cannot be empty");

        uint256 postId = nextPostId;
        nextPostId++;

        Status postStatus = _publishNow ? Status.Published : Status.Draft;

        posts[postId] = Post({
            id: postId,
            author: msg.sender,
            title: _title,
            content: _content,
            category: _category,
            status: postStatus,
            createdAt: block.timestamp,
            likes: 0,
            views: 0
        });

        // Add to author's posts
        authorPosts[msg.sender].push(postId);
        
        // Add to all posts list
        allPosts.push(postId);

        emit PostCreated(postId, msg.sender, _title);
        
        if (_publishNow) {
            emit PostPublished(postId, msg.sender);
        }
    }

    /**
     * @dev Update an existing post (only by author)
     * @param _postId Post ID to update
     * @param _title New title
     * @param _content New content
     * @param _category New category
     */
    function updatePost(
        uint256 _postId,
        string memory _title,
        string memory _content,
        string memory _category
    ) external {
        require(_postId > 0 && _postId < nextPostId, "Post does not exist");
        require(posts[_postId].author == msg.sender, "Only author can update");
        require(posts[_postId].status != Status.Deleted, "Cannot update deleted post");
        
        require(bytes(_title).length > 0, "Title cannot be empty");
        require(bytes(_content).length > 0, "Content cannot be empty");
        require(bytes(_category).length > 0, "Category cannot be empty");

        posts[_postId].title = _title;
        posts[_postId].content = _content;
        posts[_postId].category = _category;
    }

    /**
     * @dev Publish a draft post
     * @param _postId Post ID to publish
     */
    function publishPost(uint256 _postId) external {
        require(_postId > 0 && _postId < nextPostId, "Post does not exist");
        require(posts[_postId].author == msg.sender, "Only author can publish");
        require(posts[_postId].status == Status.Draft, "Post is not a draft");

        posts[_postId].status = Status.Published;
        emit PostPublished(_postId, msg.sender);
    }

    /**
     * @dev Delete a post (only by author)
     * @param _postId Post ID to delete
     */
    function deletePost(uint256 _postId) external {
        require(_postId > 0 && _postId < nextPostId, "Post does not exist");
        require(posts[_postId].author == msg.sender, "Only author can delete");

        posts[_postId].status = Status.Deleted;
    }

    /**
     * @dev Like a post
     * @param _postId Post ID to like
     */
    function likePost(uint256 _postId) external {
        require(_postId > 0 && _postId < nextPostId, "Post does not exist");
        require(posts[_postId].status == Status.Published, "Post not published");
        require(!hasLiked[_postId][msg.sender], "Already liked this post");

        hasLiked[_postId][msg.sender] = true;
        posts[_postId].likes++;

        emit PostLiked(_postId, msg.sender);
    }

    /**
     * @dev Unlike a post
     * @param _postId Post ID to unlike
     */
    function unlikePost(uint256 _postId) external {
        require(_postId > 0 && _postId < nextPostId, "Post does not exist");
        require(hasLiked[_postId][msg.sender], "Haven't liked this post");

        hasLiked[_postId][msg.sender] = false;
        posts[_postId].likes--;
    }

    /**
     * @dev Record a view on a post
     * @param _postId Post ID being viewed
     */
    function viewPost(uint256 _postId) external {
        require(_postId > 0 && _postId < nextPostId, "Post does not exist");
        require(posts[_postId].status == Status.Published, "Post not published");

        posts[_postId].views++;
        emit PostViewed(_postId);
    }

    /**
     * @dev Get a post by ID
     * @param _postId Post ID
     * @return Post data
     */
    function getPost(uint256 _postId) external view returns (Post memory) {
        require(_postId > 0 && _postId < nextPostId, "Post does not exist");
        return posts[_postId];
    }

    /**
     * @dev Get posts by author
     * @param _author Author address
     * @return Array of post IDs
     */
    function getPostsByAuthor(address _author) external view returns (uint256[] memory) {
        return authorPosts[_author];
    }

    /**
     * @dev Get all published posts
     * @return Array of published post IDs
     */
    function getPublishedPosts() external view returns (uint256[] memory) {
        uint256[] memory publishedPosts = new uint256[](allPosts.length);
        uint256 count = 0;

        for (uint256 i = 0; i < allPosts.length; i++) {
            if (posts[allPosts[i]].status == Status.Published) {
                publishedPosts[count] = allPosts[i];
                count++;
            }
        }

        // Resize array to actual count
        uint256[] memory result = new uint256[](count);
        for (uint256 i = 0; i < count; i++) {
            result[i] = publishedPosts[i];
        }

        return result;
    }

    /**
     * @dev Get total number of posts
     * @return Total post count
     */
    function getTotalPosts() external view returns (uint256) {
        return nextPostId - 1;
    }

    /**
     * @dev Check if user has liked a post
     * @param _postId Post ID
     * @param _user User address
     * @return true if user has liked the post
     */
    function checkIfLiked(uint256 _postId, address _user) external view returns (bool) {
        return hasLiked[_postId][_user];
    }
}
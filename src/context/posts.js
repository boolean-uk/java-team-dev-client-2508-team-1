import { createContext, useContext, useEffect, useState } from 'react';
import { del, get, getPosts, patch, postTo } from '../service/apiClient';
import useAuth from '../hooks/useAuth';
import jwtDecode from 'jwt-decode';

const PostsContext = createContext();

export const PostsProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const { token } = useAuth();

  const decodedToken = jwtDecode(token || localStorage.getItem('token')) || {};

  // Fetch posts and user data
  useEffect(() => {
    fetchPosts();
    fetchUser();
  }, []);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const fetchedPosts = await getPosts();
      setPosts(fetchedPosts.reverse()); // Reverse so newest are first
    } catch (error) {
      console.error('Error fetching posts:', error);
      setPosts([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchUser = async () => {
    const userId = decodedToken.userId;
    if (userId) {
      try {
        const userData = await get(`users/${userId}`);
        setUser(userData);
      } catch (error) {
        console.error('Error fetching user:', error);
        setUser(null);
      }
    }
  };

  // Add a new post
  const addPost = (newPost) => {
    setPosts(prevPosts => [newPost, ...prevPosts]);
  };

  // Update a post
  const updatePost = (updatedPost) => {
    setPosts(prevPosts => 
      prevPosts.map(post => 
        post.id === updatedPost.id ? { ...post, ...updatedPost } : post
      )
    );
  };

  // Delete a post
  const deletePost = async (postId) => {
    try {
      await del(`posts/${postId}`);
      setPosts(prevPosts => prevPosts.filter(post => post.id !== postId));
      return true;
    } catch (error) {
      console.error('Error deleting post:', error);
      return false;
    }
  };

  // Like/unlike a post
  const toggleLike = async (postId, currentlyLiked) => {
    try {
      if (currentlyLiked) {
        await postTo(`posts/${postId}/like`);
      } else {
        await del(`posts/${postId}/like`);
      }
      
      // Update user's liked posts
      await patch(`users/${decodedToken.userId}/like`, { post_id: postId });
      
      // Refresh user data to get updated liked posts
      await fetchUser();
      
      return true;
    } catch (error) {
      console.error('Error updating like state:', error);
      return false;
    }
  };

  // Get user's liked posts
  const getUserLikedPosts = () => {
    return user?.data?.user?.likedPosts || [];
  };

  const value = {
    posts,
    user,
    loading,
    addPost,
    updatePost,
    deletePost,
    toggleLike,
    getUserLikedPosts,
    fetchPosts,
    fetchUser
  };

  return (
    <PostsContext.Provider value={value}>
      {children}
    </PostsContext.Provider>
  );
};

export const usePosts = () => {
  const context = useContext(PostsContext);
  if (!context) {
    throw new Error('usePosts must be used within a PostsProvider');
  }
  return context;
};

export default PostsContext;
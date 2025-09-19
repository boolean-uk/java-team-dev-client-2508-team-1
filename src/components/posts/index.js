import { useEffect, useState } from 'react';
import Post from '../post';
import { get, getPosts } from '../../service/apiClient';
import useAuth from '../../hooks/useAuth';
import jwtDecode from 'jwt-decode';

const Posts = ({ onPostAdded }) => {
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState(null);
  const { token } = useAuth();
  const decodedToken = jwtDecode(token || localStorage.getItem('token')) || {};
  useEffect(() => {
    async function fetchPosts() {
      try {
        const fetchedPosts = await getPosts();
        setPosts(fetchedPosts.reverse()); // Reverse fetched posts so newest are first
      } catch (error) {
        console.error('Error fetching posts:', error);
        setPosts([]);
      }
    }
    async function fetchUser() {
      const userId = decodedToken.userId;
      if (userId) {
        try {
          const user = await get(`users/${userId}`);
          console.log('Fetched user:', user);
          setUser(user);
        } catch (error) {
          console.error('Error fetching user:', error);
          setUser(null);
        }
      }
    }
    fetchUser();
    fetchPosts();
  }, []);

  // Expose the function to add a new post
  useEffect(() => {
    if (onPostAdded) {
      onPostAdded.current = (newPost) => {
        setPosts(prevPosts => [newPost, ...prevPosts]);
      };
    }
  }, [onPostAdded]);


  return (
    <>
    {posts.map((post) => (
      <Post key={post.id} post={post} user={(user?.data?.user?.likedPosts) ? user.data.user.likedPosts : []} />
    ))}
    </>
  );
};

export default Posts;

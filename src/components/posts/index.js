import { useEffect, useState } from 'react';
import Post from '../post';
import { getPosts } from '../../service/apiClient';

const Posts = ({ onPostAdded }) => {
  const [posts, setPosts] = useState([]);

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
      <Post key={post.id} post={post} />
    ))}
    </>
  );
};

export default Posts;

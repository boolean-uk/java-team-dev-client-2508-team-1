import { useEffect } from 'react';
import Post from '../post';
import { usePosts } from '../../context/posts';

const Posts = ({ onPostAdded }) => {
  const { posts, loading, addPost } = usePosts();

  // Expose the function to add a new post
  useEffect(() => {
    if (onPostAdded) {
      onPostAdded.current = (newPost) => {
        addPost(newPost);
      };
    }
  }, [onPostAdded, addPost]);

  if (loading) {
    return <div>Loading posts...</div>;
  }

  return (
    <>
      {posts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </>
  );
};

export default Posts;

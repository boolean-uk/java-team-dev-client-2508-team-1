import Post from '../post';
import { usePosts } from '../../context/posts';

const Posts = () => {
  const { posts, loading } = usePosts();

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

import Post from '../post';
import { usePosts } from '../../context/posts';

const Posts = ({ refresh }) => {
  const { posts, loading } = usePosts();

  if (loading) {
    return <div>Loading posts...</div>;
  }

  return (
    <>
      {posts.map((post) => (
        <Post key={post.id} post={post} refresh={refresh}/>
      ))}
    </>
  );
};

export default Posts;

import { useEffect, useState } from 'react';
import Post from '../post';
import { getPosts } from '../../service/apiClient';

const Posts = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    getPosts().then(setPosts);
  }, []);

  return (
    <>
      {posts.map((post) => {
        return (
          <Post
            key={post.id}
            name={`${post.author.first_name} ${post.author.last_name}`}
            date={post.createdAt}
            content={post.content}
            comments={post.comments}
          />
        );
      })}
    </>
  );
};

export default Posts;

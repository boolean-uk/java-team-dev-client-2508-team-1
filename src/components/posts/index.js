import { useEffect, useState } from 'react';
import Post from '../post';
import { getPosts } from '../../service/apiClient';

const Posts = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const posts = await getPosts();
        setPosts(posts);
      } catch (error) {
        console.error('Error fetching posts:', error);
        setPosts([]);
      }
    }
    fetchPosts();
  }, []);


  return (
    <>
      {posts.map((post) => {
        // Handle missing author gracefully
        const authorName = post.author 
          ? `${post.author.first_name || 'Unknown'} ${post.author.last_name || 'User'}`
          : 'Unknown User';
        
        return (
          <Post
            key={post.id}
            name={authorName}
            date={post.createdAt || 'Unknown date'}
            content={post.content}
            comments={post.comments}
          />
        );
      })}
    </>
  );
};

export default Posts;

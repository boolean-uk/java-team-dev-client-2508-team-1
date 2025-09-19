import { createContext, useContext } from 'react';
import { del, postTo } from '../service/apiClient';

const CommentsContext = createContext();

export const CommentsProvider = ({ children }) => {
  // Add a comment to a specific post
  const addComment = async (postId, commentData) => {
    try {
      const response = await postTo(`posts/${postId}/comments`, commentData);
      return response;
    } catch (error) {
      console.error('Error adding comment:', error);
      throw error;
    }
  };

  // Update a comment
  const updateComment = async (postId, commentId, commentData) => {
    try {
      // Assuming there's a PATCH endpoint for updating comments
      const response = await fetch(`/api/posts/${postId}/comments/${commentId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(commentData)
      });
      
      if (!response.ok) {
        throw new Error('Failed to update comment');
      }
      
      return response.json();
    } catch (error) {
      console.error('Error updating comment:', error);
      throw error;
    }
  };

  // Delete a comment
  const deleteComment = async (postId, commentId) => {
    try {
      await del(`posts/${postId}/comments/${commentId}`);
      return true;
    } catch (error) {
      console.error('Error deleting comment:', error);
      return false;
    }
  };

  const value = {
    addComment,
    updateComment,
    deleteComment
  };

  return (
    <CommentsContext.Provider value={value}>
      {children}
    </CommentsContext.Provider>
  );
};

export const useComments = () => {
  const context = useContext(CommentsContext);
  if (!context) {
    throw new Error('useComments must be used within a CommentsProvider');
  }
  return context;
};

export default CommentsContext;
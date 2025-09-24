import { forwardRef, useState } from 'react';
import useAuth from '../../hooks/useAuth';
import { useComments } from '../../context/comments';
import jwtDecode from 'jwt-decode';
import SendIcon from '../../assets/icons/sendIcon';
import './style.css';
import SimpleProfileCircle from '../simpleProfileCircle';

const CreateComment = forwardRef(({ postId, onCommentAdded }, ref) => {
  const { token } = useAuth();
  const { addComment } = useComments();
  const [message, setMessage] = useState(null);
  const [text, setText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Safely decode token with fallback
  let decodedToken = {};
  try {
    if (token || localStorage.getItem('token')) {
      decodedToken = jwtDecode(token || localStorage.getItem('token')) || {};
    }
  } catch (error) {
    console.error('Invalid token in CreateComment:', error);
  }
  
  const fullName = `${decodedToken.firstName || decodedToken.first_name || 'Current'} ${decodedToken.lastName || decodedToken.last_name || 'User'}`;
  const initials = fullName?.match(/\b(\w)/g)?.join('') || 'NO';
  
  const onChange = (e) => {
    setText(e.target.value);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!text.trim() || isSubmitting) return;

    setIsSubmitting(true);
    try {
      const { userId } = decodedToken;
      
      if (!userId) {
        setMessage('Could not determine user. Please log in again.');
        setIsSubmitting(false);
        return;
      }

      const response = await addComment(postId, { body: text, userId });
      console.log('Comment created successfully:', response);
      
      // Store the comment text before clearing
      const commentText = text;
      
      // Clear the input and show success message
      setText('');
      setMessage('Comment posted successfully!');
      
      // Create a properly structured comment object for immediate display
      const firstName = decodedToken.firstName || decodedToken.first_name || 'Current';
      const lastName = decodedToken.lastName || decodedToken.last_name || 'User';
      
      const newComment = {
        id: response.data?.comment?.id,
        body: commentText,
        user: {
          id: userId,
          profile: {
            firstName,
            lastName,
            photo: localStorage.getItem("userPhoto") || null
          }
        },
        timeCreated: new Date().toISOString()
      };
      
      // Call the callback to update the parent component
      if (onCommentAdded) {
        onCommentAdded(newComment);
      }
      
      // Clear success message after 2 seconds
      setTimeout(() => {
        setMessage(null);
      }, 2000);
      
    } catch (error) {
      console.error('Error creating comment:', error);
      setMessage('Failed to post comment. Please try again.');
      setTimeout(() => {
        setMessage(null);
      }, 3000);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className="create-comment" onSubmit={onSubmit}>
      <div className="profile-icon profile-icon--sm">
        <SimpleProfileCircle
        photo={localStorage.getItem("userPhoto")}
        
          initials={initials} size={40} />
        {/* <p>{initials}</p> */}
      </div>

      <div className="create-comment__input-wrapper">
        <input
          ref={ref}
          className="create-comment__input"
          type="text"
          placeholder="Add a comment..."
          value={text}
          onChange={onChange}
        />
        <button
          className="create-comment__submit"
          type="submit"
          disabled={!text.trim() || isSubmitting}
          aria-label="Send comment"
        >
          <SendIcon />
        </button>
      </div>

      {message && <p className="create-comment__message">{message}</p>}
    </form>
  );
});

CreateComment.displayName = 'CreateComment';

export default CreateComment;
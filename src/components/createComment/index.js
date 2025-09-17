import { useState } from 'react';
import useAuth from '../../hooks/useAuth';
import { post } from '../../service/apiClient';
import jwtDecode from 'jwt-decode';
import SendIcon from '../../assets/icons/sendIcon';
import './style.css';

// eslint-disable-next-line camelcase

const CreateComment = ({ postId }) => {


  const { token } = useAuth();


  
  const [message, setMessage] = useState(null);
  const [text, setText] = useState('');

  const onChange = (e) => {
    setText(e.target.value);
  };

  const onSubmit = async () => {
    try {
  const { userId } = jwtDecode(token || localStorage.getItem('token')) || {};
      if (!userId) {
        setMessage('Could not determine user. Please log in again.');
        return;
      }

      const postResponse = await post(`posts/${String(postId)}/comments`, { body: text, userId });
      console.log('Comment created successfully:', postResponse);
      setMessage('Posted! Closing modal in 1.5 seconds...');
      setTimeout(() => {
        setMessage(null);
      }, 1500);
    } catch (error) {
      console.error('Error creating post:', error);
      setMessage('Failed to create post. Please try again.');
    }


    window.location.reload();

    console.log('Submitting comment:', text);


  };

  return (
    <div className="create-comment">
      <div className="profile-icon profile-icon--sm">
        <p>AJ</p>
      </div>

      <div className="create-comment__input-wrapper">
        <input
          className="create-comment__input"
          type="text"
          onChange={onChange}
          value={text}
          placeholder="Add a comment..."
        />
        <button
          type="button"
          className={`create-comment__send ${text.length ? 'create-comment__send--active' : ''}`}
          onClick={onSubmit}
          disabled={!text.length}
          aria-label="Send comment"
        >
          <SendIcon />
        </button>
      </div>

      {message && <p className="create-comment__message">{message}</p>}
    </div>
  );
};

export default CreateComment;
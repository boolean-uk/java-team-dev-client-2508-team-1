import { useState } from 'react';
import useModal from '../../hooks/useModal';
import './style.css';
import Button from '../button';
import jwt_decode from 'jwt-decode';
import useAuth from '../../hooks/useAuth';
import { put } from '../../service/apiClient';



const EditCommentModal = ({ postText, postId, name, commentId}) => {
  const { closeModal } = useModal();
  const { token } = useAuth();
  const [message, setMessage] = useState(null);
  const [text, setText] = useState(postText || '');
  const initials = name?.match(/\b(\w)/g);

  
  const onChange = (e) => {
    setText(e.target.value);
  };

  const onSubmit = async () => {
    try {
      const { userId } = jwt_decode(token || localStorage.getItem('token')) || {};
      if (!userId) {
        setMessage('Could not determine user. Please log in again.');
        return;
      }

    const postResponse = await put(`posts/${String(postId)}/comments/${String(commentId)}`, { body: text, userId });
      console.log('Post updated successfully:', postResponse);
      setMessage('Posted! Closing modal in 1.5 seconds...');
      setTimeout(() => {
        setMessage(null);
        closeModal();
      }, 1500);
    } catch (error) {
      console.error('Error creating post:', error);
      setMessage('Failed to create post. Please try again.');
    }

    
    window.location.reload();

    console.log('Submitting comment:', text);
  };

  return (
    <>
      <section className="create-post-user-details">
        <div className="profile-icon">
          <p>{initials}</p>
        </div>
        <div className="post-user-name">
          <p>{name}</p>
        </div>
      </section>

      <section>
        <textarea onChange={onChange} value={text} placeholder="Edit your post"></textarea>
      </section>

      <section className="create-post-actions">
        <Button
          onClick={onSubmit}
          text="Post"
          classes={`${text.length ? 'blue' : 'offwhite'} width-full`}
          disabled={!text.length}
        />
      </section>

      {message && <p>{message}</p>}
    </>
  );
};

export default EditCommentModal;

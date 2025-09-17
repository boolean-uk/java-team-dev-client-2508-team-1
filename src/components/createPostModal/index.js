import { useState } from 'react';
import useModal from '../../hooks/useModal';
import useAuth from '../../hooks/useAuth';
import './style.css';
import Button from '../button';
import { post } from '../../service/apiClient';
// eslint-disable-next-line camelcase
import jwt_decode from 'jwt-decode';


const CreatePostModal = () => {
  // Use the useModal hook to get the closeModal function so we can close the modal on user interaction
  const { closeModal } = useModal();
  const { token } = useAuth();

  const [message, setMessage] = useState(null);
  const [text, setText] = useState('');

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

      const postResponse = await post('posts', { content: text, userId });
      console.log('Post created successfully:', postResponse);
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



  };

  return (
    <>
      <section className="create-post-user-details">
        <div className="profile-icon">
          {/* TODO: TO THIS SO THAT IT WORKS WIHT CORRECT NAMES */}
          <p>AJ</p>
        </div>
        <div className="post-user-name">
          <p>Alex J</p>
        </div>
      </section>

      <section>
        <textarea onChange={onChange} value={text} placeholder="What's on your mind?"></textarea>
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

export default CreatePostModal;

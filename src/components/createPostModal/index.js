import { useState } from 'react';
import useModal from '../../hooks/useModal';
import useAuth from '../../hooks/useAuth';
import './style.css';
import Button from '../button';
import { post } from '../../service/apiClient';
import jwtDecode from 'jwt-decode';


const CreatePostModal = ({ authorName, onPostAdded }) => {
  // Use the useModal hook to get the closeModal function so we can close the modal on user interaction
  const { closeModal } = useModal();
  const { token } = useAuth();

  const [message, setMessage] = useState(null);
  const [text, setText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const decodedToken = jwtDecode(token || localStorage.getItem('token')) || {};
  const fullName = `${decodedToken.firstName || decodedToken.first_name || 'Current'} ${decodedToken.lastName || decodedToken.last_name || 'User'}`;
  const initials = fullName?.match(/\b(\w)/g)?.join('') || 'NO';
  const onChange = (e) => {
    setText(e.target.value);
  };

  const onSubmit = async () => {
    if (!text.trim() || isSubmitting) return;

    setIsSubmitting(false);
    setMessage('Post created successfully!');

    try {


      const { userId } = decodedToken;
      
      if (!userId) {
        setMessage('Could not determine user. Please log in again.');
        setIsSubmitting(false);
        return;
      }

      const response = await post('posts', { content: text, userId });
      console.log('Post created successfully:', response);

      // Get user info from token for immediate display
      const firstName = decodedToken.firstName || decodedToken.first_name || 'Current';
      const lastName = decodedToken.lastName || decodedToken.last_name || 'User';

      // Create a properly structured post object for immediate display
      const newPost = {
        id: response.data?.id || Date.now(),
        content: text,
        user: {
          id: userId,
          profile: {
            firstName,
            lastName
          }
        },
        timeCreated: new Date().toISOString(),
        timeUpdated: new Date().toISOString(),
        comments: [],
        likes: 0
      };

      // Clear the input and show success message
      setText('');

      // Call the callback to update the parent component
      if (onPostAdded) {
        onPostAdded(newPost);
      }

      // Close modal after short delay
      setTimeout(() => {
        setMessage('Post is processing!');
        closeModal();
      }, 100);

    } catch (error) {
      console.error('Error creating post:', error);
      setMessage('Failed to create post. Please try again.');
      setTimeout(() => {
        setMessage(null);
      }, 3000);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <section className="create-post-user-details">
        <div className="profile-icon">

          {/* TODO: TO THIS SO THAT IT WORKS WIHT CORRECT NAMES */}
          <p>{initials}</p>
        </div>
        <div className="post-user-name">
          <p>{fullName}</p>
        </div>
{/*         <ProfileCircle initials={userInitials} />
 */}
      </section>

      <section>
        <textarea onChange={onChange} value={text} placeholder="What's on your mind?"></textarea>
      </section>

      <section className="create-post-actions">
        <Button
          onClick={onSubmit}
          text="Post"
          classes={`${text.length ? 'blue' : 'offwhite'} width-full`}
          disabled={!text.length || isSubmitting}
        />
      </section>

      {message && <p>{message}</p>}
    </>
  );
};

export default CreatePostModal;

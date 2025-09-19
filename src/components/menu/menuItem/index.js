import { NavLink } from 'react-router-dom';
import ArrowRightIcon from '../../../assets/icons/arrowRightIcon';
import useModal from '../../../hooks/useModal';
import EditPostModal from '../../editPostModal';
import { del } from '../../../service/apiClient';

const MenuItem = ({ icon, text, children, linkTo = '#nogo', clickable, postText, postId, name, isMenuVisible, setIsMenuVisible }) => {
  const { openModal, setModal } = useModal();
  const showModal = () => {
      setModal('Edit post', <EditPostModal postText={postText} postId={postId} name={name} />);
      setIsMenuVisible(false);
      openModal();
  };

  const deletePost = async () => {
    setIsMenuVisible(false);
    console.log('deletePost function called');
    try {
      
      const results = await del(`posts/${postId}`);
      console.log('Post deleted successfully', results);
      
      
    } catch (error) {
      console.error('Error deleting post:', error);
    }
    console.log('Deleting post with ID:', postId);

    /* window.location.reload(); */
  };





  if (clickable) {
    return (
      <li>
        <button type="button" onClick={ (clickable === "Modal") ? showModal : deletePost }>
          {icon}
          <p>{text}</p>
          {children && <ArrowRightIcon />}
        </button>
        {children && <ul>{children}</ul>}
      </li>
    );
  }

  return (
    <li>
      <NavLink to={linkTo}>
        {icon}
        <p>{text}</p>
        {children && <ArrowRightIcon />}
      </NavLink>
      {children && <ul>{children}</ul>}
    </li>
  );
};

export default MenuItem;

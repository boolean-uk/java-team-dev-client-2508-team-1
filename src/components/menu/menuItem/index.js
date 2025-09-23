import { NavLink } from 'react-router-dom';
import ArrowRightIcon from '../../../assets/icons/arrowRightIcon';
import useModal from '../../../hooks/useModal';
import EditPostModal from '../../editPostModal';
import EditCommentModal from '../../editCommentModal';
import { usePosts } from '../../../context/posts';
import { useComments } from '../../../context/comments';
import { Snackbar, SnackbarContent } from '@mui/material';
import Portal from '@mui/material/Portal';
import { useState } from 'react';
import CheckCircleIcon from '../../../assets/icons/checkCircleIcon';

const MenuItem = ({ icon, text, children, linkTo = '#nogo', clickable, postText, postId, name, isMenuVisible, setIsMenuVisible, commentText, commentId, onCommentDeleted, onPostDeleted }) => {
  const { openModal, setModal } = useModal();
  const { deletePost } = usePosts();
  const { deleteComment } = useComments();
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  
  
  const showModal = () => {
      setModal('Edit post', <EditPostModal postText={postText} postId={postId} name={name} />);
      setIsMenuVisible(false);
      openModal();
  };

  const showCommentModal = () => {
      setModal('Edit comment', <EditCommentModal postText={commentText} postId={postId} name={name} commentId={commentId} />);
      setIsMenuVisible(false);
      openModal();
  };

  const handleDeletePost = async () => {
    console.log('deletePost function called');
    // Show feedback first so the component stays mounted for the Snackbar
    setSnackbarMessage('Post deleted, wait two seconds');
    setSnackbarOpen(true);
    // Perform the destructive action after the Snackbar displays
    setTimeout(async () => {
      try {
        const success = await deletePost(postId);
        if (success) {
          console.log('Post deleted successfully');
          if (onPostDeleted) onPostDeleted(postId);
        } else {
          console.error('Failed to delete post');
        }
      } catch (error) {
        console.error('Error deleting post:', error);
      } finally {
        setIsMenuVisible(false);
      }
    }, 100);
  };

  const handleDeleteComment = async () => {
    console.log('deleteComment function called');
    
    // If there's a callback provided, use it instead of calling the API directly
    if (onCommentDeleted) {
      // Show feedback first, then call the callback after delay
      setSnackbarMessage('Comment deleted, wait two seconds');
      setSnackbarOpen(true);
      setTimeout(() => {
        onCommentDeleted(commentId);
        setIsMenuVisible(false);
      }, 2100);
      return;
    }
    
    // Only call the API directly if no callback is provided
    setSnackbarMessage('Comment deleted');
    setSnackbarOpen(true);
    setTimeout(async () => {
      try {
        const success = await deleteComment(postId, commentId);
        if (success) {
          console.log('Comment deleted successfully');
        } else {
          console.error('Failed to delete comment');
        }
      } catch (error) {
        console.error('Error deleting comment:', error);
      } finally {
        setIsMenuVisible(false);
      }
    }, 2100);
  };

  const handleReport = () => {
    // Show the snackbar first; delay hiding the menu so the component doesn't unmount before Snackbar renders
  setSnackbarMessage('Reported');
  setSnackbarOpen(true);
    setTimeout(() => {
      setIsMenuVisible(false);
    }, 2100); // slightly longer than autoHideDuration
  };

  const getClickHandler = () => {
    switch (clickable) {
      case "Modal":
        return showModal;
      case "CommentModal":
        return showCommentModal;
      case "Delete":
        return handleDeletePost;
      case "DeleteComment":
        return handleDeleteComment;
      case "Report":
        return handleReport;
      case "ReportComment":
        return handleReport;
      default:
        return undefined;
    }
  };





  if (clickable) {
    return (
      <li>
        <button type="button" onClick={getClickHandler()}>
          {icon}
          <p>{text}</p>
          {children && <ArrowRightIcon />}
        </button>
        {children && <ul>{children}</ul>}
    <Portal container={typeof window !== 'undefined' ? document.body : undefined}>
      <Snackbar open={snackbarOpen} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }} 
    autoHideDuration={2000}
    onClose={() => setSnackbarOpen(false)}
    >
        <SnackbarContent
          sx={{
          backgroundColor: '#000046',
          color: '#fff',
          width: '310px',
          height: '70px',
          padding: '4px 16px',
          borderRadius: '8px',
          boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.25)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '20px',
          }}
          message={
          <span style={{ color: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <CheckCircleIcon style={{ marginRight: '8px', color: '#FFFFFF' }} />
            {snackbarMessage || 'Action completed'}
          </span>
          }
        />
        </Snackbar>
    </Portal>
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
      <Portal container={typeof window !== 'undefined' ? document.body : undefined}>
      <Snackbar open={snackbarOpen} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }} 
    autoHideDuration={2000}
    onClose={() => setSnackbarOpen(false)}
    >
        <SnackbarContent
          sx={{
          backgroundColor: '#000046',
          color: '#fff',
          width: '310px',
          height: '70px',
          padding: '4px 16px',
          borderRadius: '8px',
          boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.25)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '20px',
          }}
          message={
          <span style={{ color: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <CheckCircleIcon style={{ marginRight: '8px', color: '#FFFFFF' }} />
            {snackbarMessage || 'Action completed'}
          </span>
          }
        />
        </Snackbar>
      </Portal>
    </li>

  );
};

export default MenuItem;

import { NavLink } from 'react-router-dom';
import ArrowRightIcon from '../../../assets/icons/arrowRightIcon';
import useModal from '../../../hooks/useModal';
import EditPostModal from '../../editPostModal';
import EditCommentModal from '../../editCommentModal';
import { usePosts } from '../../../context/posts';
import { useComments } from '../../../context/comments';

const MenuItem = ({ icon, text, children, linkTo = '#nogo', clickable, postText, postId, name, isMenuVisible, setIsMenuVisible, commentText, commentId, onCommentDeleted, onPostDeleted }) => {
  const { openModal, setModal, closeModal } = useModal();
  const { deletePost } = usePosts();
  const { deleteComment } = useComments();
  
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
    setIsMenuVisible(false);
    console.log('deletePost function called');
      setModal(`The post is being deleted!`, 
      <>
        <p>The post is being deleted!</p>
      </>
    );
    openModal();

        setTimeout(() => {
    closeModal();
    }, 2500);
    try {
      const success = await deletePost(postId);

    
      if (success) {
        console.log('Post deleted successfully');

      } else {
        console.error('Failed to delete post');
      }
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  const handleDeleteComment = async () => {
    setIsMenuVisible(false);
    console.log('deleteComment function called');
    
    // If there's a callback provided, use it instead of calling the API directly
    if (onCommentDeleted) {
      onCommentDeleted(commentId);
      return;
    }
    
    // Only call the API directly if no callback is provided
    try {
      const success = await deleteComment(postId, commentId);
      if (success) {
        console.log('Comment deleted successfully');
      } else {
        console.error('Failed to delete comment');
      }
    } catch (error) {
      console.error('Error deleting comment:', error);
    }
  };

  const handleReport = () => {
    setIsMenuVisible(false);
    console.log('reportComment function called, and reported');
    setModal(`Reported`, 
        <>
      
          <p>Thank you for reporting this. Our team will review it shortly.</p>
    </>
    );
    setIsMenuVisible(false);
    openModal();

    setTimeout(() => {
    closeModal();
    }, 1500);

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

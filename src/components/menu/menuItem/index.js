import { NavLink } from 'react-router-dom';
import ArrowRightIcon from '../../../assets/icons/arrowRightIcon';
import useModal from '../../../hooks/useModal';
import EditPostModal from '../../editPostModal';
import EditCommentModal from '../../editCommentModal';
import { usePosts } from '../../../context/posts';
import { useComments } from '../../../context/comments';

const MenuItem = ({ icon, text, children, linkTo = '#nogo', clickable, postText, postId, name, isMenuVisible, setIsMenuVisible, commentText, commentId, onCommentDeleted }) => {
  const { openModal, setModal } = useModal();
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
    try {
      const success = await deletePost(postId);
      if (success) {
        console.log('Post deleted successfully');
        // The context will handle removing the post from the state
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
    try {
      const success = await deleteComment(postId, commentId);
      if (success) {
        console.log('Comment deleted successfully');
        
        // Call the callback to update UI dynamically if provided
        if (onCommentDeleted) {
          onCommentDeleted(commentId);
        }
      } else {
        console.error('Failed to delete comment');
      }
    } catch (error) {
      console.error('Error deleting comment:', error);
    }
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
      default:
        return undefined;
    }
  };

  if (clickable) {
    return (
      <li>
        <button type="button" onClick={getClickHandler}>
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

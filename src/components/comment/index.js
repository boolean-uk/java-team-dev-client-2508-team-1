import MenuComment from './dropdown';
import { useComments } from '../../context/comments';
import './style.css';

const Comment = ({ name, content, postId, commentId, onCommentDeleted }) => {
  const { deleteComment } = useComments();

  const initials = name?.match(/\b(\w)/g);

  const handleDeleteComment = async () => {
    const success = await deleteComment(postId, commentId);
    if (success && onCommentDeleted) {
      onCommentDeleted(commentId);
    }
  };

  return (
    <div className="comment">
      <div className="comment__avatar">
        <div className="profile-icon">
          <p>{initials}</p>
        </div>
      </div>
      <div className="comment__bubble">
        <h6 className="comment__author">{name}</h6>
        <p className="comment__content">{content}</p>
      </div>
{/*       <button className="comment__menu" aria-label="Comment options" onClick={showModal} >•••</button>
 */}    <MenuComment 
         commentText={content} 
         postId={postId} 
         commentId={commentId} 
         name={name} 
         onCommentDeleted={onCommentDeleted}
         onDeleteComment={handleDeleteComment}
       />
 
 </div>
  );
};

export default Comment;
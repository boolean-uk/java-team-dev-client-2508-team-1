import useModal from '../../hooks/useModal';
import EditCommentModal from '../editCommentModal';
import MenuPost from '../post/dropdown';
import './style.css';

const Comment = ({ name, content, postId, commentId}) => {
  

  const initials = name?.match(/\b(\w)/g);

  const { openModal, setModal } = useModal();
  const showModal = () => {
    setModal('Edit comment', 
    <EditCommentModal postText={content} postId={postId} name={name} commentId={commentId} />);
    openModal(); 
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
 */}    <MenuPost />
 
 </div>
  );
};

export default Comment;
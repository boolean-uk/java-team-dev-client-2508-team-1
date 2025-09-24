import MenuComment from './dropdown';
import { useComments } from '../../context/comments';
import './style.css';
import UserIcon from '../profile-icon';
import SimpleProfileCircle from '../simpleProfileCircle';

const Comment = ({ id,userId, name, content, postId, commentId, onCommentDeleted }) => {
  const { deleteComment } = useComments();

  const initials = name.match(/\b(\w)/g)?.join('') || 'NA';

  const handleDeleteComment = async () => {
    const success = await deleteComment(postId, commentId);
    if (success && onCommentDeleted) {
      onCommentDeleted(commentId);
    }
  };

  return (
    <div className="comment">
      <div className="comment__avatar">
        {/* <div className="profile-icon"> */}

          <SimpleProfileCircle
        /* menu={false}
        id={userId} */
        initials={initials}
      />
        {/* <p>{initials}</p> */}
{/*         </div> */}
      </div>
      <div className="comment__bubble">
        <h6 className="comment__author">{name}</h6>
        <p className="comment__content">{content}</p>
      </div>
     <MenuComment 
        report={id !== userId}
        del={id === userId}
        edit={id === userId}
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
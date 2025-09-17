import './style.css';

const Comment = ({ name, content }) => {
  const initials = name?.match(/\b(\w)/g);

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
      <button className="comment__menu" aria-label="Comment options">•••</button>
    </div>
  );
};

export default Comment;
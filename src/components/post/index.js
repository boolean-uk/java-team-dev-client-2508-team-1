import useModal from '../../hooks/useModal';
import Card from '../card';
import Comment from '../comment';
import EditPostModal from '../editPostModal';
import ProfileCircle from '../profileCircle';
import CreateComment from '../createComment';
import HeartIcon from '../../assets/icons/heartIcon';
import CommentBubbleIcon from '../../assets/icons/commentBubbleIcon';
import './style.css';

const Post = ({ post }) => {
  const { openModal, setModal } = useModal();

  const authorName = post.user.profile
    ? `${post.user.profile.firstName || 'Unknown'} ${post.user.profile.lastName || 'User'}`
    : 'Unknown User';
  const userInitials = authorName.match(/\b(\w)/g);

  const showModal = () => {
    setModal('Edit post', <EditPostModal />);
    openModal();
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Unknown date';
    const d = new Date(dateString);
    if (isNaN(d.getTime())) return 'Unknown date';
    const months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];
    const day = String(d.getDate()).padStart(2, '0');
    const month = months[d.getMonth()];
    const hours = String(d.getHours()).padStart(2, '0');
    const minutes = String(d.getMinutes()).padStart(2, '0');
    return `${day} ${month} at ${hours}.${minutes}`;
  };

  const comments = Array.isArray(post.comments) ? post.comments : [];

  return (
    <Card>
      <article className="post">
        <header className="post__header">
          <ProfileCircle initials={userInitials} />

          <div className="post__meta">
            <p className="post__author">{authorName}</p>
            <small className="post__date">{formatDate(post.timeCreated)}</small>
          </div>

          <button className="post__menu" aria-label="Post options" onClick={showModal}>
            <span>•••</span>
          </button>
        </header>

        <section className="post__content">
          <p>{post.content}</p>
        </section>

        <section className={`post__actions border-top ${comments.length ? 'border-bottom' : ''}`}>
          <div className="post__actions-left">
            <button className="pill" type="button">
              <HeartIcon />
              <span>Like</span>
            </button>
            <button className="pill" type="button">
              <CommentBubbleIcon />
              <span>Comment</span>
            </button>
          </div>

          <p className="post__likes-hint">{!post.likes && 'Be the first to like this'}</p>
        </section>

        {comments.length > 2 && (
          <div className="post__see-previous">See previous comments</div>
        )}

        <section className="post__comments">
          {comments.map((comment, idx) => (
            <Comment
              key={comment.id || idx}
              name={
                comment.user.profile
                  ? `${comment.user.profile.firstName || 'Unknown'} ${comment.user.profile.lastName || 'User'}`
                  : 'Unknown User'
              }
              content={comment.body}
            />
          ))}
          <CreateComment postId={post.id} />
        </section>
      </article>
    </Card>
  );
};

export default Post;

import { useEffect, useRef, useState } from 'react';
import useModal from '../../hooks/useModal';
import Card from '../card';
import Comment from '../comment';
import EditPostModal from '../editPostModal';
import {ProfileCircle} from '../profileCircle';
import CreateComment from '../createComment';
import HeartIcon from '../../assets/icons/heartIcon';
import HeartIconFilled from '../../assets/icons/heartIconFilled';
import CommentBubbleIcon from '../../assets/icons/commentBubbleIcon';
import './style.css';
import { del, patch, postTo } from '../../service/apiClient';
import useAuth from '../../hooks/useAuth';
import jwtDecode from 'jwt-decode';
import MenuPost from './dropdown';

const Post = ({ post, user }) => {
  const { openModal, setModal } = useModal();
  const commentInputRef = useRef(null);
  const [localComments, setLocalComments] = useState((post.comments || []).reverse());
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(post.likesCount || post.likes || 0);
  const [isAnimating, setIsAnimating] = useState(false);
  const { token } = useAuth();
  const decodedToken = jwtDecode(token || localStorage.getItem('token')) || {};

  const authorName = post.user.profile
    ? `${post.user.profile.firstName || 'Unknown'} ${post.user.profile.lastName || 'User'}`
    : 'Unknown User';
  const userInitials = authorName.match(/\b(\w)/g);

  const showModal = () => {
    setModal('Edit post', <EditPostModal postText={post.content} postId={post.id} name={authorName} />);
    openModal();
  };


  const isLikedInitial = () => {
    if (!user || !Array.isArray(user)) {
      setIsLiked(false);
      return;
    }
    
    const liked = user.some((likedPost) => likedPost.id === post.id);
    setIsLiked(liked);
  };

  useEffect(() => {
    isLikedInitial();
  }, [user, post.id]); // Add dependencies to re-run when user data changes

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

  const comments = Array.isArray(localComments) ? localComments : [];

  const handleCommentClick = () => {
    if (commentInputRef.current) {
      commentInputRef.current.focus();
    }
  };

  const handleCommentAdded = (newComment) => {
    // Add the new comment to the local state
    setLocalComments(prevComments => [...prevComments, newComment]);
  };

  const handleLikeClick = async () => {
    // Trigger animation
    setIsAnimating(true);
    
    // Store current state in case we need to revert
    const previousLikedState = isLiked;
    const previousLikeCount = likeCount;
    
    // Optimistically update UI
    setIsLiked(prev => !prev);
    setLikeCount(prev => previousLikedState ? prev - 1 : prev + 1);
    
    // Reset animation after a short delay
    setTimeout(() => {
      setIsAnimating(false);
    }, 300);

    try {
      await setBackendLikeState(!previousLikedState);
    } catch (error) {
      // Revert optimistic updates on error
      setIsLiked(previousLikedState);
      setLikeCount(previousLikeCount);
      console.error('Failed to update like state:', error);
    }
  };

  const setBackendLikeState = async (currentlyLiked) => {
    try {
      let results = null;
      
      if (currentlyLiked) {
        results = await postTo(`posts/${post.id}/like`);
      } else {
        results = await del(`posts/${post.id}/like`);
      }
      
      // Update user's liked posts
      const person = await patch(`users/${decodedToken.userId}/like`, {post_id: post.id});
      
      console.log('Like state update successful:', results);
      console.log('User like list updated:', person.data.user.posts);
      
    } catch (error) {
      console.error('Error updating like state:', error);
      throw error; // Re-throw to allow error handling in handleLikeClick
    }
  };

  return (
    <Card>
      <article className="post">
        <header className="post__header">
          <ProfileCircle initials={userInitials} />

          <div className="post__meta">
            <p className="post__author">{authorName}</p>
            <small className="post__date">{formatDate(post.timeCreated)}</small>
          {(post.timeCreated === post.timeUpdated) ? null : (<p>Edited</p>)}
          
          </div>
          
          {/* <button className="post__menu" aria-label="Post options" onClick={showModal}> */}
            <MenuPost postText={post.content} postId={post.id} name={authorName} />
            {/* <span>•••</span> */}
          {/* </button> */}
        </header>

        <section className="post__content">
          <p>{post.content}</p>
        </section>

        <section className={`post__actions border-top ${comments.length ? 'border-bottom' : ''}`}>
          <div className="post__actions-left">
            <button 
              className={`pill ${isLiked ? 'pill--liked' : ''} ${isAnimating ? 'pill--animating' : ''}`} 
              type="button"
              onClick={handleLikeClick}
            >
              {isLiked ? <HeartIconFilled /> : <HeartIcon />}
              <span>Like</span>
            </button>
            <button className="pill" type="button" onClick={handleCommentClick}>
              <CommentBubbleIcon />
              <span>Comment</span>
            </button>
          </div>

          <p className="post__likes-hint">
            {likeCount === 0 ? 'Be the first to like this' : `${likeCount} ${likeCount === 1 ? 'like' : 'likes'}`}
          </p>
        </section>

        {comments.length > 2 && (
          <div className="post__see-previous">See previous comments</div>
        )}

        <section className="post__comments">
          {comments.map((comment, idx) => {
            const commentAuthorName = comment.user?.profile
              ? `${comment.user.profile.firstName || 'Unknown'} ${comment.user.profile.lastName || 'User'}`
              : 'Unknown User';
            
            return (
              <Comment
                key={comment.id || idx}
                name={commentAuthorName}
                content={comment.body}
                postId={post.id}
                commentId={comment.id}
              />
            );
          })}
          <CreateComment postId={post.id} ref={commentInputRef} onCommentAdded={handleCommentAdded} />
        </section>
      </article>
    </Card>
  );
};

export default Post;

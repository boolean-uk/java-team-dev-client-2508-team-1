import { useEffect, useRef, useState } from 'react';
import Card from '../card';
import Comment from '../comment';
import ProfileCircle from '../profileCircle';

import CreateComment from '../createComment';
import HeartIcon from '../../assets/icons/heartIcon';
import HeartIconFilled from '../../assets/icons/heartIconFilled';
import CommentBubbleIcon from '../../assets/icons/commentBubbleIcon';
import './style.css';
import { usePosts } from '../../context/posts';

import { del, patch, postTo } from '../../service/apiClient';
import useAuth from '../../hooks/useAuth';
import jwtDecode from 'jwt-decode';
import MenuPost from './dropdown';

const Post = ({ post }) => {
  const { getUserLikedPosts, toggleLike } = usePosts();
  const commentInputRef = useRef(null);
  const [localComments, setLocalComments] = useState((post.comments || []).reverse());
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(post.likesCount || post.likes || 0);
  const [isAnimating, setIsAnimating] = useState(false);

  const authorName = post.user.profile
    ? `${post.user.profile.firstName || 'Unknown'} ${post.user.profile.lastName || 'User'}`
    : 'Unknown User';
  const userInitials = authorName.match(/\b(\w)/g);

  const isLikedInitial = () => {
    const likedPosts = getUserLikedPosts();
    if (!Array.isArray(likedPosts)) {
      setIsLiked(false);
      return;
    }
    
    const liked = likedPosts.some((likedPost) => likedPost.id === post.id);
    setIsLiked(liked);
  };

  useEffect(() => {
    isLikedInitial();
  }, [post.id]); // Remove user dependency since we get it from context

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

  const handleCommentDeleted = (deletedCommentId) => {
    // Remove the deleted comment from the local state
    setLocalComments(prevComments => prevComments.filter(comment => comment.id !== deletedCommentId));
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
      const success = await toggleLike(post.id, !previousLikedState);
      if (!success) {
        // Revert optimistic updates on error
        setIsLiked(previousLikedState);
        setLikeCount(previousLikeCount);
      }
    } catch (error) {
      // Revert optimistic updates on error
      setIsLiked(previousLikedState);
      setLikeCount(previousLikeCount);
      console.error('Failed to update like state:', error);
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
            <MenuPost postText={post.content} postId={post.id} name={authorName} post={post} />
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
                onCommentDeleted={handleCommentDeleted}
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

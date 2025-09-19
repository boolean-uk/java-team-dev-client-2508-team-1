import { useState, useRef, useEffect } from 'react';
import { CascadingMenuPost, PostMenu } from './menu';
import { CascadingMenu } from '../../profileCircle';
import EditCommentModal from '../../editCommentModal';
import useModal from '../../../hooks/useModal';
import EditPostModal from '../../editPostModal';

const MenuPost = ({ menuVisible, postText, postId, name }) => {
  const [isMenuVisible, setIsMenuVisible] = useState(menuVisible || false);
  const menuRef = useRef(null);





  // Lukk meny ved klikk utenfor
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuVisible(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div ref={menuRef} className="edit-icon-wrapper">
   <div className="icon-button" onClick={() => {
    setIsMenuVisible(!isMenuVisible);
   }}>
     <span className="dots">
    <span className="dot">•</span>
    <span className="dot">•</span>
    <span className="dot">•</span>
  </span>
  </div>
  <div className='menu-left'> 
  {isMenuVisible && <CascadingMenuPost postText={postText} postId={postId} name={name} isMenuVisible={isMenuVisible} setIsMenuVisible={setIsMenuVisible} />}
  </div>
</div>


  );
};

export default MenuPost;

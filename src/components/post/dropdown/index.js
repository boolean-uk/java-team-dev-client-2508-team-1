import { useState, useRef, useEffect } from 'react';
import { CascadingMenuPost } from './menu/index';

const MenuPost = ({ edit=false, report=false, del=false, menuVisible, postText, postId, name, onPostDeleted, commentText, commentId, post }) => {
  const [isMenuVisible, setIsMenuVisible] = useState(menuVisible || false);
  const menuRef = useRef(null);

  // Close menu when clicking outside
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
  {isMenuVisible && <CascadingMenuPost editPost={edit} deletePost={del} reportPost={report}  postText={postText} comment postId={postId} name={name} isMenuVisible={isMenuVisible} setIsMenuVisible={setIsMenuVisible} />}
  </div>
</div>


  );
};

export default MenuPost; 

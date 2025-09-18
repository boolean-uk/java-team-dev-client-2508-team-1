import { useState, useRef, useEffect } from 'react';
import { CascadingMenu } from '../../profileCircle';

const EditIconTeacher = ({ initials, menuVisible }) => {
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
   <div className="icon-button" onClick={() => setIsMenuVisible(!isMenuVisible)}>
     <span className="dots">
    <span className="dot">•</span>
    <span className="dot">•</span>
    <span className="dot">•</span>
  </span>
  </div>
  <div className='menu-left'> 
  {isMenuVisible && <CascadingMenu />}
  </div>
</div>


  );
};

export default EditIconTeacher;

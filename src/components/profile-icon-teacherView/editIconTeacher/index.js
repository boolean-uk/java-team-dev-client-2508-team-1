import { useState, useRef, useEffect } from 'react';
import { CascadingMenu } from '../../profileCircle';
import MenuPortal from '../menuPortal';

const EditIconTeacher = ({ id, initials, menuVisible, setRefresh, cohorts}) => {
  const [isMenuVisible, setIsMenuVisible] = useState(menuVisible || false);
  const buttonRef = useRef(null);
  const menuRef = useRef(null);
  // Lukk meny ved klikk utenfor
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        menuRef.current && 
        !menuRef.current.contains(event.target) &&
        !buttonRef.current.contains(event.target)
      ){
        setIsMenuVisible(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const getMenuStyle = () => {
    if (!buttonRef.current) return {};
    const rect = buttonRef.current.getBoundingClientRect();
    const menuWidth = menuRef.current ? menuRef.current.offsetWidth : 200;

    return {
      position: "absolute",
      top: rect.bottom + window.scrollY,
      left: rect.right - menuWidth + window.scrollX - 100,
      zIndex: 9999,
    };
  };

  return (
    <div className="edit-icon-wrapper">
      <div
        ref={buttonRef}
        className="icon-button"
        onClick={() => setIsMenuVisible(!isMenuVisible)}
      >
        <span className="dots">
          <span className="dot">•</span>
          <span className="dot">•</span>
          <span className="dot">•</span>
        </span>
      </div>

      {isMenuVisible && (
        <MenuPortal>
          <div ref={menuRef} style={getMenuStyle()} className="bg-white shadow-lg rounded-lg">
            <CascadingMenu
              id={id}
              setRefresh={setRefresh}
              setIsMenuVisible={setIsMenuVisible}
              cohorts={cohorts || []}
            />
          </div>
        </MenuPortal>
      )}
    </div>
  );
};

export default EditIconTeacher;

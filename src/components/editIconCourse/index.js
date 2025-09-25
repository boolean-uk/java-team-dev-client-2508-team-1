import { useState, useRef, useEffect } from 'react';
import './style.css';
import CascadingMenuCourse from './cascadingMenuCourse';


const EditIconCouse = ({ initials, menuVisible, cohort, setRefresh }) => {
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
        {console.log(cohort, "EditIconCouse")}
  <div className='menu-left'> 
  {isMenuVisible && <CascadingMenuCourse cohort={cohort} setIsMenuVisible={setIsMenuVisible} setRefresh={setRefresh}/>}
  </div>
</div>


  );
};

export default EditIconCouse;

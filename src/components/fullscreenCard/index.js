import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './fullscreenCard.css';
import ProfileData from '../../pages/profile/profile-data';
import useAuth from '../../hooks/useAuth';
import jwtDecode from 'jwt-decode';
import { getUserById } from '../../service/apiClient';
import ProfileCircle from '../../components/profileCircle';
import '../../pages/loading';

const FullScreenCard = () => {
  const [user, setUser] = useState(null);
  const { token } = useAuth();
  
  // Safely decode token with fallback
  let userId;
  try {
    const decodedToken = jwtDecode(token || localStorage.getItem('token'));
    userId = decodedToken?.userId;
  } catch (error) {
    console.error('Invalid token:', error);
    userId = null;
  }
  
  const navigate = useNavigate();
  const { id } = useParams();
  const targetId = id ?? userId;

  useEffect(() => {
    async function fetchUser() {
      try {
        const data = await getUserById(targetId);
        setUser(data);
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    }
    fetchUser();
  }, [targetId]);

  const goToEdit = () => {
    navigate(`/profile/${userId}/edit`);
  };

  if (!user || !user.profile) {
    return <div>
        <div className="">
            <h3>Loading...</h3>
            <div className="loadingscreen-loader">
            <span></span>
            </div>
        </div>
        </div>
  }

  const firstname = user.profile.firstName;
  const lastname = user.profile.lastName;
  const name = firstname + " " + lastname;
  

  return (
    <div className="fullscreen-card">
      <div className="top-bar"> <ProfileCircle initials={name.split(" ").map((n)=>n[0]).join("").toUpperCase()}/> 
        <div> 
          <p className="name-text">{name}</p> 
        </div> 
          <button className="edit" onClick={goToEdit}>Edit Profile</button> 
        </div>
      <section className="post-interactions-container border-top"></section>

      <ProfileData user={user}/>
    </div>
  );
};

export default FullScreenCard;

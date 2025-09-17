import { useEffect, useState } from 'react';
import './fullscreenCard.css';
import ProfileData from '../../pages/profile/profile-data';
import useAuth from '../../hooks/useAuth';
import jwtDecode from 'jwt-decode';
import { getUserById } from '../../service/apiClient';
import ProfileCircle from '../profileCircle';
import '../../pages/loading';

const FullScreenCard = () => {
  const [user, setUser] = useState(null);
  const { token } = useAuth();
  const { userId } = jwtDecode(token);

  useEffect(() => {
    async function fetchUser() {
      try {
        const data = await getUserById(userId);
        setUser(data);
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    }
    fetchUser();
  }, [userId]);

  console.log(user)

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
        <button className="edit">Edit Profile</button> </div>
      <section className="post-interactions-container border-top"></section>

      <ProfileData user={user}/>
      <div className="bottom-buttons">
        <button className="cancel">Cancel</button>
        <br></br><br></br>
        <button className="save">Save</button>
      </div>
    </div>
  );
};

export default FullScreenCard;

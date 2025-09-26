import { useParams, useNavigate } from 'react-router-dom';
import './fullscreenCard.css';
import ProfileData from '../../pages/profile/profile-data';

import '../../pages/loading';
import SimpleProfileCircle from '../simpleProfileCircle';
import { useData } from '../../context/data';
import { useEffect, useState } from 'react';
import { getUserById } from '../../service/apiClient';

const FullScreenCard = () => {

  const { myProfile, userId, teachers } = useData();
  const [user, setUser] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const { id } = useParams();
  const targetId = id ?? userId;
  const isOwnProfile = String(targetId) === String(userId);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await getUserById(targetId);
        setUser(response.profile);
      } catch (error) {
        console.error("Error fetching user:", error);
      } finally {
      setLoading(false); // ferdig med lasting
    }

    };

    if (!isOwnProfile) {
      fetchUser();
    } else {
      setUser(myProfile)
      setLoading(false);
    }
  }, [targetId, userId]);



  const goToEdit = () => {
    navigate(`/profile/${userId}/edit`);
  };

  if (loading) {
    return <div>
        <div className="">
            <h3>Loading...</h3>
            <div className="loadingscreen-loader">
            <span></span>
            </div>
        </div>
        </div>
  }

  const firstname = user.firstName;
  const lastname = user.lastName;
  const name = firstname + " " + lastname;
    const initials = name.split(" ").map((n)=>n[0]).join("").toUpperCase()

  
    const isTeacher = teachers.some(teacher => teacher.id === user.id);
    const roleValue = isTeacher ? 1 : 2;

  console.log(user)
  return (
    <div className="fullscreen-card">
      <div className="top-bar"> 
        <SimpleProfileCircle photo={user.photo} initials={initials}/> 
        {/* <ProfileCircle initials={name.split(" ").map((n)=>n[0]).join("").toUpperCase()}/>  */}
        <div> 
          <p className="name-text">{name}</p> 
        </div> 
        {isOwnProfile && (
          <button className="edit" onClick={goToEdit}>Edit Profile</button>
        )} 
        </div>
      <section className="post-interactions-container border-top"></section>

      <ProfileData user={user} initials={initials} roleValue={roleValue} />
    </div>
  );
};

export default FullScreenCard;

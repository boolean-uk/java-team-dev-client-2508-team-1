import Card from '../card';
import './style.css';
import { NavLink } from 'react-router-dom';
import ProfileIcon from '../../assets/icons/profileIcon';
import SimpleProfileCircle from '../simpleProfileCircle';


const SeeProfile = ({ id, initials, firstname, lastname, role, photo=null }) => {
    return (
        <div className="user-panel">
          <Card>
            <section className="post-details">
              <div className="profile-icon">
                <SimpleProfileCircle 
                photo={photo}
                initials={initials} />
                {/* <p>{initials}</p> */}
              </div>

              <div className="post-user-name">
                <p>{firstname} {lastname}</p>
                <small>{role}</small>
              </div>
            </section>

            <section className="user-panel-options border-top">
              <ul>
                <li>
                  <NavLink to={`/profile/${id}`}>
                    <ProfileIcon /> <p>Profile</p>
                  </NavLink>
                </li>
              </ul>
            </section>
          </Card>
        </div>
    )
 
}

export default SeeProfile;
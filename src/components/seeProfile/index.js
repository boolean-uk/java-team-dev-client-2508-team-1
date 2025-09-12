import Card from '../card';
import './style.css';
import { NavLink } from 'react-router-dom';
import ProfileIcon from '../../assets/icons/profileIcon';

const SeeProfile = ({initials, firstname, lastname, role}) => {

    return (
        <div className="user-panel">
          <Card>
            <section className="post-details">
              <div className="profile-icon">
                <p>{initials}</p>
              </div>

              <div className="post-user-name">
                <p>{firstname} {lastname}</p>
                <small>{role}, Cohort 3</small>
              </div>
            </section>

            <section className="user-panel-options border-top">
              <ul>
                <li>
                  <NavLink to="/">
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
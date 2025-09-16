import { NavLink } from 'react-router-dom';
import CohortIcon from '../../assets/icons/cohortIcon';
import ProfileIcon from '../../assets/icons/profileIcon';
import useAuth from '../../hooks/useAuth';
import './style.css';
import { useState } from 'react';
import ProfileIconFilled from '../../assets/icons/profileIconFilled';
import HomeIconFilled from '../../assets/icons/homeIconFilled';
import HomeIcon from '../../assets/icons/homeIcon';
import CohortIconFill from '../../assets/icons/cohortIcon-fill';

const Navigation = () => {
  const { token } = useAuth();
  const [active, setActive] = useState(1)
  
  if (!token) {
    return null;
  }

  return (
    <nav>
      <ul>
        <li>
          <NavLink to="/" 
          className={() => active === 1 ? "nav-item active" : "nav-item"}
          onClick={() => setActive(1)}>
          {active === 1 ? (<HomeIconFilled />) : (<HomeIcon/>)}
            <p>Home</p>
        </NavLink>
        </li>
        <li>
          <NavLink to="/"
           className={() => active === 2 ? "nav-item active" : "nav-item"}
            onClick={() => setActive(2)}>
              {active === 2 ? (<ProfileIconFilled/>) : (<ProfileIcon colour/>)}
                   <p>Profile</p>
             </NavLink>
        </li>
        <li>
          <NavLink to="/cohorts"
           className={() => active === 3 ? "nav-item active" : "nav-item"}
          onClick={() => setActive(3)}>
            {active === 3 ? (<CohortIconFill/>) : (<CohortIcon />)}
            <p>Cohort</p>
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;

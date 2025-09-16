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
import ExcersicesIconFilled from '../../assets/icons/excersicesIconFilled';
import ExcersicesIcon from '../../assets/icons/excersicesIcon';
import NotesIconFilled from '../../assets/icons/notesIconFilled';
import NotesIcon from '../../assets/icons/notesIcon';
import LogsIconFilled from '../../assets/icons/logsIconFilled';
import LogsIcon from '../../assets/icons/logsIcon';

const Navigation = () => {
  const { token } = useAuth();
  const [active, setActive] = useState(1)
  const [role, setRole] = useState("teacher") // midlertidig
  
  if (!token) {
    setRole("student")  // midlertidig for å unngå kompileringsfeil
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

          <NavLink to="/profile">
            <ProfileIcon />
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
        <li className={role === "student" ? "no-line" : "border-line"}>
          <NavLink to="/"
          className={() => active === 4 ? "nav-item active" : "nav-item"}
          onClick={() => setActive(4)}>
            {active === 4 ? (<ExcersicesIconFilled/>) : (<ExcersicesIcon />)}
            <p>Exercises</p>
          </NavLink>
        </li>

        {role === "teacher" ? (
          <>
          <li>
            <NavLink to="/"
          className={() => active === 5 ? "nav-item active" : "nav-item"}
          onClick={() => setActive(5)}>
            {active === 5 ? (<NotesIconFilled/>) : (<NotesIcon />)}
            <p>Notes</p>
          </NavLink>
          </li>
          
            <li>
            <NavLink to="/"
          className={() => active === 6 ? "nav-item active" : "nav-item"}
          onClick={() => setActive(6)}>
            {active === 6 ? (<LogsIconFilled/>) : (<LogsIcon />)}
            <p>Logs</p>
          </NavLink>
          </li>
          </>
        ) : (<></>) }
      </ul>
    </nav>
  );
};

export default Navigation;

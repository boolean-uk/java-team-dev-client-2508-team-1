import './style.css';

const UserIcon = ({ initials, firstname, lastname, role }) => {
  return (
    <div className="user">
      <div className="profile-circle">
        <div className="profile-icon">
          <p>{initials}</p>
        </div>
      </div>
      <div className="user-info">
        <p className="user-name">{firstname} {lastname}</p>
        <p className="user-role">{role}</p>
      </div>
    </div>
  );
};


export default UserIcon;
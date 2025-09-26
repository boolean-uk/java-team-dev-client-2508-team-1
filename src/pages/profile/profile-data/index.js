import SimpleProfileCircle from '../../../components/simpleProfileCircle';
import './profile-data.css'

const ProfileData = ({ user, initials, roleValue}) => {
  const {email} = user;
  const roleName = roleValue === 1 ? "Student" : "Teacher";
  
  // console.log(user, "user in profile data");
  // const getReadableRole = (role) => {
  //   switch (role) {
  //     case 'ROLE_STUDENT':
  //       return 'Student';
  //     case 'ROLE_TEACHER':
  //       return 'Teacher';
  //     case 'ROLE_ADMIN': 
  //       return 'Administrator'  
  //     default:
  //       return role; 
  //   }
  // };

  return (
    <main className="profile-container">
      <div className="photo-section-edit">
        {user.photo ? 
        <img
          src={user.photo || "https://placeholderimage.org/api/image/150x150?text=User"}
          alt=""
          className="profile-photo-edit"
        />

        :
        <SimpleProfileCircle photo={user.photo} initials={initials} size={400} />
}
        {(user.firstName || user.lastName) && (
          <p className="name-text">{user.firstName} {user.lastName}</p>
        )}
        {user.bio && <p className="bio-text">{user.bio}</p>}
      </div>

      <div className="info-section">
        {(user.firstName || user.lastName) && (
          <div className="info-row">
            <span className="label">Full Name:</span>
            <span className="value">{user.firstName} {user.lastName}</span>
          </div>
        )}

        {email && (
          <div className="info-row">
            <span className="label">Email:</span>
            <span className="value">{email}</span>
          </div>
        )}

        {user.mobile && (
          <div className="info-row">
            <span className="label">Mobile:</span>
            <span className="value">{user.mobile}</span>
          </div>
        )}

        {user.githubUrl && user.githubUrl.trim() !== '' && (
          <div className="info-row">
            <span className="label">Github URL:</span>
            <span className="value">
              <a
                href={user.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
              {user.githubUrl}
              </a>
          </span>
          </div>
        )}


        {user.specialism && (
          <div className="info-row">
            <span className="label">Specialism:</span>
            <span className="value">{user.specialism}</span>
          </div>
        )}

        {roleName && (
          <div className="info-row">
            <span className="label">Role:</span>
            <span className="value">{roleName}</span>
          </div>
        )}
      </div>
    </main>
  );
};

export default ProfileData;

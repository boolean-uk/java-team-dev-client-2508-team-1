import './profile-data.css'

const ProfileData = ({ user }) => {

  const { email } = user;
  const { name: roleName } = user.roles[0];
  const { firstName, lastName, githubUrl, mobile, specialism, bio, photo } = user.profile;

  const getReadableRole = (role) => {
    switch (role) {
      case 'ROLE_STUDENT':
        return 'Student';
      case 'ROLE_TEACHER':
        return 'Teacher';
      case 'ROLE_ADMIN': 
        return 'Administrator'  
      default:
        return role; 
    }
  };

  return (
    <main className="profile-container">
      <div className="photo-section">
        <img
          src={photo || "https://placeholderimage.org/api/image/150x150?text=User"}
          alt=""
          className="profile-photo"
        />
        {(firstName || lastName) && (
          <p className="name-text">{firstName} {lastName}</p>
        )}
        {bio && <p className="bio-text">{bio}</p>}
      </div>

      <div className="info-section">
        {(firstName || lastName) && (
          <div className="info-row">
            <span className="label">Full Name:</span>
            <span className="value">{firstName} {lastName}</span>
          </div>
        )}

        {email && (
          <div className="info-row">
            <span className="label">Email:</span>
            <span className="value">{email}</span>
          </div>
        )}

        {mobile && (
          <div className="info-row">
            <span className="label">Mobile:</span>
            <span className="value">{mobile}</span>
          </div>
        )}

        {githubUrl && githubUrl.trim() !== '' && (
          <div className="info-row">
            <span className="label">Github URL:</span>
            <span className="value">
              <a
                href={githubUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
              {githubUrl}
              </a>
          </span>
          </div>
        )}


        {specialism && (
          <div className="info-row">
            <span className="label">Specialism:</span>
            <span className="value">{specialism}</span>
          </div>
        )}

        {roleName && (
          <div className="info-row">
            <span className="label">Role:</span>
            <span className="value">{getReadableRole(roleName)}</span>
          </div>
        )}
      </div>
    </main>
  );
};

export default ProfileData;

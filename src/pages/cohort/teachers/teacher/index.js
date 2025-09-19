import UserIcon from "../../../../components/profile-icon";

const Teacher = ({ initials, firstName, lastName, role }) => {
    
    return (
    <>
    <div className="user-icon">
        <UserIcon 
          initials={initials}
          firstname={firstName}
          lastname={lastName}
          role={role}
        />
    </div>
    </>
  );
};

export default Teacher;

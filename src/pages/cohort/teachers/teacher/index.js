import UserIcon from "../../../../components/profile-icon";

const Teacher = ({ id, initials, firstName, lastName, role }) => {
    
    return (
    <>
    <div className="user-icon">
        <UserIcon
          id={id} 
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

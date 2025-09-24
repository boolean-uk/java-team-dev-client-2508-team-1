import UserIcon from "../../../../components/profile-icon";

const Teacher = ({ initials, firstName, lastName, role, photo=null }) => {
    
    return (
    <>
    <div className="user-icon">
        <UserIcon
          photo={photo}
      
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

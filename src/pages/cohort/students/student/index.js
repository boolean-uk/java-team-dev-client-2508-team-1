import UserIcon from "../../../../components/profile-icon";

const Student = ({ id, initials, firstName, lastName, role, photo=null }) => {
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

export default Student;

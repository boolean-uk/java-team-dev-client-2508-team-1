import UserIcon from "../../../../components/profile-icon";

const Student = ({ id, initials, firstName, lastName, role }) => {
  console.log("student", id)
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

export default Student;

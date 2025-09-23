import ProfileIconTeacher from "../../../../components/profile-icon-teacherView";

const StudentList = ({ profiles }) => {
  if (!profiles || profiles.length === 0) {
    return <p></p>;
  }

  return (
    <ul className="student-list">
      {profiles.map((student) => (
        <li key={student.id}>
           <div>
            <ProfileIconTeacher id={student.user.id} initials={student.firstName.charAt(0) + student.lastName.charAt(0)} firstname={student.firstName} lastname={student.lastName} role={student.specialism}/>
            </div>
        </li>
      ))}
    </ul>
  );
};

export default StudentList;

import { useEffect, useState } from "react";
import ProfileIconTeacher from "../../../../components/profile-icon-teacherView";
import { get } from "../../../../service/apiClient";

const StudentList = ({ profiles, cohorts }) => {

  if (!profiles || profiles.length === 0) {
    return <p></p>;
  }
  return (
    <ul className="student-list">
      {profiles.map((student) => (
        <li key={student.id}>
           <div>

            <ProfileIconTeacher
            photo={student.photo}
            id={student.user.id} initials={student.firstName.charAt(0) + student.lastName.charAt(0)} firstname={student.firstName} lastname={student.lastName} role={student.specialism} setRefresh={setRefresh} cohorts={cohorts}
/>
            </div>
        </li>
      ))}
    </ul>
  );
};

export default StudentList;

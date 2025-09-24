import { useEffect, useState } from "react";
import ProfileIconTeacher from "../../../../components/profile-icon-teacherView";
import { get } from "../../../../service/apiClient";

const StudentList = ({ profiles, setSelectedProfiles }) => {
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    // ✅ don’t fetch if profiles is empty/null
    if (!profiles || profiles.length === 0) return;

    async function fetchStudents() {
      try {
        const response = await get("profiles");
        const studs = response.data.profiles;

        // only keep the profiles that were passed in
        const filteredStuds = studs.filter((stud) =>
          profiles.some((p) => p.id === stud.id)
        );

        setSelectedProfiles(filteredStuds);
      } catch (error) {
        console.error("Error fetching students:", error);
      }
    }

    fetchStudents();
  }, [refresh, profiles, setSelectedProfiles]);

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
              id={student.user.id}
              initials={
                student.firstName.charAt(0) + student.lastName.charAt(0)
              }
              firstname={student.firstName}
              lastname={student.lastName}
              role={student.specialism}
              setRefresh={setRefresh}
            />
          </div>
        </li>
      ))}
    </ul>
  );
};

export default StudentList;

// import { useEffect, useState } from "react";
// import { get } from "../../../service/apiClient";

import { useNavigate } from "react-router-dom";
import Card from "../../../components/card"
import ProfileIconTeacher from "../../../components/profile-icon-teacherView";

const Students = () => {
   /* const [students, setStudents] = useState(null) 
    
    
    useEffect(() => {
    async function fetchStudents() {
        try {
        const response = await get("students");
        setStudents(response.data.students);
        } catch (error) {
        console.error("Error fetching students:", error);
        }
    }

    fetchStudents(); 
    }, []);

*/
    const navigate = useNavigate()
    
    const handleClick = () => {
        navigate("/")
        // navigate("/students")
        }
    
   const students = [
        { first_name: "Ola", last_name: "Nordmann", specialism: "Software Development" },
        { first_name: "Kari", last_name: "Nordmann", specialism: "Data Analytics" },
        { first_name: "Per", last_name: "Hansen", specialism: "Software Development" },
        { first_name: "Anne", last_name: "Larsen", specialism: "Data Analyticsr" },
        { first_name: "Jonas", last_name: "Berg", specialism: "Software Development" },
        { first_name: "Maria", last_name: "Solberg", specialism: "Software Development" },
        { first_name: "Erik", last_name: "Johansen", specialism: "Front-End Development" },
        { first_name: "Nora", last_name: "Lie", specialism: "Front-End Development" },
        { first_name: "Henrik", last_name: "Strøm", specialism: "Front-End Development" },
        { first_name: "Silje", last_name: "Moe", specialism: "Data Analytics" }
    ];

    return(
        <>
        <Card>
            <h3 className="border-line">Students</h3>
            <section>
                {students !== null ? (
                    <div>
                    <ul>
                        {students.slice(0,10).map((student, index) => (
                            <li key={index} className="student-item">
                                <div>
                                <ProfileIconTeacher initials={student.first_name.charAt(0) + student.last_name.charAt(0)} firstname={student.first_name} lastname={student.last_name} role={student.specialism}/>
                                </div>
                            </li>
                        ))}
                    </ul>
                    
                    <div className="border-line"></div>
                    <button className="student-button"
                    onClick={handleClick}>All students</button>
                    </div>
                ):(
                    <p>No students found.</p>
                )}
            </section>
        </Card>
        </>
    )
}
export default Students
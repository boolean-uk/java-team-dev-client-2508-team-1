import { useEffect, useState } from "react";
import { get } from "../../../service/apiClient";

import { useNavigate } from "react-router-dom";
import Card from "../../../components/card"
import Student from "../../cohort/students/student";
import ProfileCircle from "../../../components/profileCircle";

const Students = () => {
   const [students, setStudents] = useState(null) 
    
    
    useEffect(() => {
    async function fetchStudents() {
        try {
        const response = await get("students");
        setStudents(response.data.profiles);
        } catch (error) {
        console.error("Error fetching students:", error);
        }
    }

    fetchStudents(); 
    }, []);

    const navigate = useNavigate()
    
    const handleClick = () => {
        navigate("/")
        // navigate("/students")
        }

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
                                <Student
                                key={student.id || 0}
                                id ={student.id}
                                initials={`${student.firstName} ${student.lastName}`
                                    .trim()
                                    .split(/\s+/)
                                    .map(word => word[0].toUpperCase())
                                    .join('')}
                                firstName={student.firstName}
                                lastName={student.lastName}
                                />
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
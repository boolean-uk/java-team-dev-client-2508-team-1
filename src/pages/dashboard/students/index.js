import { useEffect, useState } from "react";
import { get } from "../../../service/apiClient";

import { useNavigate } from "react-router-dom";
import Card from "../../../components/card"
import UserIcon from "../../../components/profile-icon";

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
                                <UserIcon 
                                   id = {student.id}
                                   initials={`${student.firstName} ${student.lastName}`
                                       .trim()
                                       .split(/\s+/)
                                       .map(word => word[0].toUpperCase())
                                       .join('')}
                                   firstname={student.firstName}
                                   lastname={student.lastName}
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
                    <div className="">
                    <h3 className="loading-cohorts">Loading...</h3>
                    <div className="loadingscreen-loader">
                    <span></span>
                    </div>
                    </div>
                )}
            </section>
        </Card>
        </>
    )
}
export default Students
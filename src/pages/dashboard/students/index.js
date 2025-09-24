import { useEffect, useState } from "react";
import { get } from "../../../service/apiClient";

import Card from "../../../components/card"

// import UserIcon from "../../../components/profile-icon";

import ProfileIconTeacher from "../../../components/profile-icon-teacherView";

const Students = ({refresh, setRefresh }) => {
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
    }, [refresh]);
    
    return(
        <>
        <Card>
            <h3 className="border-line">Students</h3>
            <section>
                {students !== null ? (
                    <div>
                    <ul className="students-list-teacher-view">
                        {students.map((student, index) => (
                            <li key={index} className="student-item">
                                <div>
                                <ProfileIconTeacher 
                                photo={student.photo}
                                   id={student.id}
                                   initials={`${student.firstName} ${student.lastName}`
                                       .trim()
                                       .split(/\s+/)
                                       .map(word => word[0].toUpperCase())
                                       .join('')}
                                   firstname={student.firstName}
                                   lastname={student.lastName}
                                   role={"Student"}
                                   setRefresh={setRefresh}
                               />
                                </div>
                            </li>
                        ))}
                    </ul>
                    
                    <div className="border-line"></div>
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
import { useEffect, useState } from "react";
import { get } from "../../../service/apiClient";

import Card from "../../../components/card"

// import UserIcon from "../../../components/profile-icon";

import ProfileIconTeacher from "../../../components/profile-icon-teacherView";

const Students = ({ refresh, setRefresh, cohorts }) => {
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

    function getInitials(profile) {
        if (!profile.firstName || !profile.lastName) return "NA";
        const firstNameParts = profile.firstName.trim().split(/\s+/) || ''; // split by any number of spaces
        const lastNameInitial = profile.lastName.trim().charAt(0);
        
        const firstNameInitials = firstNameParts.map(name => name.charAt(0));
        
        return (firstNameInitials.join('') + lastNameInitial).toUpperCase();
    }
    
    return(
        <>
        <Card>
            <h3 className="border-line">Students</h3>
            <section>
                {students !== null ? (
                    <div>
                    <ul className="students-list-teacher-view">
                        {students.map((student, index) => (
                            <li key={index}>
                                <ProfileIconTeacher 
                                photo={student.photo}
                                   id={student.user.id}
                                   initials={getInitials(student)}
                                   firstname={student.firstName}
                                   lastname={student.lastName}
                                   role={"Student"}
                                   setRefresh={setRefresh}
                                   cohorts={cohorts}
                               />
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
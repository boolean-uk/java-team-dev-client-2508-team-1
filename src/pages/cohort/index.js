import Students from "./students";

import Teachers from './teachers';
import Exercises from "./exercises";
import { useUserRoleData } from "../../context/userRole.";
import TeacherCohort from "./teacherCohort";
// import { get, getUserById } from "../../service/apiClient";
// import { useEffect, useState } from "react";
import { useData } from "../../context/data";



const Cohort = () => {
    const {userRole} = useUserRoleData()
    

    const{cohorts, myProfile, myCohort, teachersInMyCohort, studentsInMyCohort} = useData()
    

    return (
        <>
        {userRole === 2 ? ( 
            <>
            <main>
                <Students students={studentsInMyCohort}  course={myCohort.course} cohort={myCohort} myProfile={myProfile}/>
            </main>

            <aside>
                 <Teachers teachers={teachersInMyCohort}  />
                <Exercises />
            </aside>
            </>):(
                <TeacherCohort cohorts={cohorts} />
                )
            }
           
        </>
    )

}

export default Cohort;



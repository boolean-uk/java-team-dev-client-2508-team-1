import Students from "./students";

import Teachers from './teachers';
import Exercises from "./exercises";
import TeacherCohort from "./teacherCohort";
import { useData } from "../../context/data";



const Cohort = () => {
    

    const{cohorts, myProfile, myCohort, teachersInMyCohort, studentsInMyCohort, userRole} = useData()
    

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



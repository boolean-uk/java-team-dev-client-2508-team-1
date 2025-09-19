import Students from "./students";

import Teachers from './teachers';
import Exercises from "./exercises";
import { useUserRoleData } from "../../context/userRole.";
import TeacherCohort from "./teacherCohort";
import jwtDecode from "jwt-decode";
import useAuth from "../../hooks/useAuth";

const Cohort = () => {
    const {userRole, setUserRole} = useUserRoleData()
    const { token } = useAuth();
    const decodedToken = jwtDecode(token || localStorage.getItem('token')) || {};
    setUserRole(decodedToken.roleId)
   


    return (
        <>
        {userRole === 2 ? ( 
            <>
            <main>
                <Students />
            </main>

            <aside>
                 <Teachers/>
                <Exercises />
            </aside>
            </>):(
                <TeacherCohort/>
                )
            }
           
        </>
    )

}

export default Cohort;



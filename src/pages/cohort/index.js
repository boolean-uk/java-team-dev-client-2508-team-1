import Students from "./students";

import Teachers from './teachers';
import Exercises from "./exercises";
import { useUserRoleData } from "../../context/userRole.";
import TeacherCohort from "./teacherCohort";
import jwtDecode from "jwt-decode";
import useAuth from "../../hooks/useAuth";
import { get, getUserById } from "../../service/apiClient";
import { useEffect, useState } from "react";



const Cohort = () => {
    const {userRole, setUserRole} = useUserRoleData()
    const { token } = useAuth();
    
    // Safely decode token with fallback
    let decodedToken = {};
    try {
        decodedToken = jwtDecode(token || localStorage.getItem('token')) || {};
        setUserRole(decodedToken.roleId);
    } catch (error) {
        console.error('Invalid token in Cohort component:', error);
    }
    
    const [studentsLoading, setStudentsLoading] = useState(true);
    const [teachersLoading, setTeachersLoading] = useState(true);
    const [cohortsLoading, setCohortsLoading] = useState(true);

    const [teachers, setTeachers] = useState([]);

    const [students, setStudents] = useState([]);
    const [course, setcourse] = useState([]);
    const [cohort, setCohort] = useState("");
    const [cohorts, setCohorts] = useState([])
    const [refresh, setRefresh] = useState(false)   
    
        useEffect(() => {
            setCohortsLoading(true)
    async function fetchCohorts() {
      try {
        const response = await get("cohorts");
        setCohorts(response.data.cohorts);
      } catch (error) {
        console.error("Error fetching cohorts:", error);
       } finally {
            setCohortsLoading(false)
            }
    }

    fetchCohorts();
  }, [refresh]);


    useEffect(() => {
        setTeachersLoading(true);
        setStudentsLoading(true);
        async function fetchData() {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    console.error('No token found');
                    return;
                }
                
                let userId;
                try {
                    const decodedToken = jwtDecode(token);
                    userId = decodedToken.userId;
                } catch (decodeError) {
                    console.error('Invalid token:', decodeError);
                    return;
                }
                
                const user = await getUserById(userId);
                if (user.profile.cohort === null) {
                    return;
                }
                const data = await get(`cohorts/${user.profile.cohort.id}`);

                // set cohort
                const cohort = data.data.cohort;
                setCohort(cohort);

                // set teachers
                const teachers = data.data.cohort.profiles.filter((userid) => userid?.role?.name === "ROLE_TEACHER");
                setTeachers(teachers || []);


                // students
                const students = data.data.cohort.profiles.filter((profileid) => profileid?.role?.name === "ROLE_STUDENT");
                setStudents(students || []);

                // course
                const course = data.data.cohort.course;
                setcourse(course || "");

            } catch (error) {
                console.error('fetchData() in cohort/teachers/index.js:', error);
            } finally {
                setStudentsLoading(false);
                setTeachersLoading(false); 
            }
        }

        fetchData();
    }, []);

    function getInitials(profile) {
        if (!profile.firstName || !profile.lastName) return "NA";
        const firstNameParts = profile.firstName.trim().split(/\s+/) || ''; // split by any number of spaces
        const lastNameInitial = profile.lastName.trim().charAt(0);
        
        const firstNameInitials = firstNameParts.map(name => name.charAt(0));
        
        return (firstNameInitials.join('') + lastNameInitial).toUpperCase();
    }

    if (studentsLoading || teachersLoading || cohortsLoading) {
        return (
        <div>
            <div className="">
                <h3 className="cohort-teacher-loading">Loading...</h3>
                <div className="loadingscreen-loader">
                <span></span>
                </div>
            </div>
        </div>
        )
    }

    return (
        <>
        {userRole === 2 ? ( 
            <>
            <main>
                <Students students={students} getInitials={getInitials} course={course} cohort={cohort} />
            </main>

            <aside>
                 <Teachers teachers={teachers} getInitials={getInitials} />
                <Exercises />
            </aside>
            </>):(
                <TeacherCohort cohorts={cohorts} setRefresh={setRefresh}/>
                )
            }
           
        </>
    )

}

export default Cohort;



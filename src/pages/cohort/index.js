import Students from "./students";

import Teachers from './teachers';
import Exercises from "./exercises";
import { get, getUserById } from "../../service/apiClient";
import { useEffect, useState } from "react";
import jwtDecode from "jwt-decode";

const Cohort = () => {

    const [studentsLoading, setStudentsLoading] = useState(true);
    const [teachersLoading, setTeachersLoading] = useState(true);

    const [teachers, setTeachers] = useState([]);

    const [students, setStudents] = useState([]);
    const [courses, setCourses] = useState([]);
    const [cohort, setCohort] = useState("");
    

    useEffect(() => {
        setTeachersLoading(true);
        setStudentsLoading(true);
        async function fetchData() {
            try {
                const token = localStorage.getItem('token');
                const { userId } = jwtDecode(token);
                const user = await getUserById(userId);
                const data = await get(`cohorts/${user.cohort.id}`);

                // set cohort
                const cohort = data.data.cohort;
                setCohort(cohort);

                // set teachers
                const teachers = data.data.cohort.profiles.filter((userid) => userid?.role?.name === "ROLE_TEACHER");
                setTeachers(teachers || []);

                // studnets
                const students = data.data.cohort.profiles.filter((profileid) => profileid?.role?.name === "ROLE_STUDENT");
                setStudents(students || []);

                // courses
                const courses = data.data.cohort.cohort_courses;
                setCourses(courses || []);

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

    if (studentsLoading || teachersLoading) {
        return (
        <div>
            <div className="">
                <h3>Loading...</h3>
                <div className="loadingscreen-loader">
                <span></span>
                </div>
            </div>
        </div>
        )
    }

    return (
        <>
            <main>
                <Students students={students} getInitials={getInitials} courses={courses} cohort={cohort} />
            </main>

            <aside>
                 <Teachers teachers={teachers} getInitials={getInitials} />
                <Exercises />
            </aside>
        </>
    )

}

export default Cohort;

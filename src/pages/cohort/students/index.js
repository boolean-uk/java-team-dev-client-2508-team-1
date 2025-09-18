import { useEffect, useState } from "react";
import Card from "../../../components/card";
import Student from "./student";
import './students.css';
import { get, getUserById } from "../../../service/apiClient";
import jwtDecode from "jwt-decode";
import SoftwareLogo from "../../../assets/icons/software-logo";
import FrontEndLogo from "../../../assets/icons/frontEndLogo";
import DataAnalyticsLogo from "../../../assets/icons/dataAnalyticsLogo";
import '../../../components/profileCircle/style.css';
import '../../../components/fullscreenCard/fullscreenCard.css';


function Students() {
    const [students, setStudents] = useState([]);
    const [courses, setCourses] = useState([]);
    const [cohortId, setCohortId] = useState("");
    const [selectedCourseIndex, setSelectedCourseIndex] = useState(0); // to click through courses
    const course = courses[selectedCourseIndex];


    useEffect(() => {
        async function fetchData() {
            try {
                const token = localStorage.getItem('token');
                const { userId } = jwtDecode(token);
                const user = await getUserById(userId);

                setCohortId(user.cohort.id || "");

                const data = await get(`cohorts/${user.cohort.id}`);
                const students = data.data.cohort.profiles.filter((userid) => userid?.role?.name === "ROLE_STUDENT");
                setStudents(students || []);

                const courses = data.data.cohort.cohort_courses;
                setCourses(courses || []);

                setSelectedCourseIndex(0); // reset to first course when data changes


            } catch (error) {
                console.error('fetchStudents() in cohort/students/index.js:', error);
            }
        }
        fetchData();
    }, []);

    function getInitials(student) {
        if (!student.firstName || !student.lastName) return "NA";
        const firstNameParts = student.firstName.trim().split(/\s+/); // split by any number of spaces
        const lastNameInitial = student.lastName.trim().charAt(0);
        
        const firstNameInitials = firstNameParts.map(name => name.charAt(0));
        
        return (firstNameInitials.join('') + lastNameInitial).toUpperCase();
    }

    if (!course) {
        return <div>
            <div className="">
                <h3>Loading...</h3>
                <div className="loadingscreen-loader">
                <span></span>
                </div>
            </div>
        </div>
    }

    // in cohort-course-date: getCohortsForStudent() or something, make it a dropdown to select which subject to render!!!! we do NOT want to scroll through lots of students to view the next subject's students
    return (
    <Card>
      <article className="cohort">
        <section>
          <h3>My cohort</h3>
        </section>

        {course && (
        <div className="cohort-course-date-wrapper border-top">
            <div
                className={`course-icon ${
                course.name === "Software Development"
                    ? "software-icon"
                    : course.name === "Front-End Development"
                    ? "front-icon"
                    : course.name === "Data Analytics"
                    ? "data-icon"
                    : ""
                }`}
            >
                {course.name === "Software Development" && <SoftwareLogo />}
                {course.name === "Front-End Development" && <FrontEndLogo />}
                {course.name === "Data Analytics" && <DataAnalyticsLogo />}
            </div>

            <div className="cohort-title">
                <p>{course.name}, Cohort {cohortId}</p>
            </div>

            <div className="cohort-dates">
                <small>January 2023 - June 2023</small>
            </div>

            <div className="course-nav-buttons">
                <button
                onClick={() =>
                    setSelectedCourseIndex((prev) => Math.max(prev - 1, 0))
                }
                disabled={selectedCourseIndex === 0}
                >
                ◀
                </button>
                <button
                onClick={() =>
                    setSelectedCourseIndex((prev) =>
                    Math.min(prev + 1, courses.length - 1)
                    )
                }
                disabled={selectedCourseIndex === courses.length - 1}
                >
                ▶
                </button>
            </div>
        </div>
        )}

        

        <section className="cohort-students-container border-top">
          {students.map((student) => (
            <Student
              key={student.id || 0}
              initials={getInitials(student)}
              firstName={student.firstName}
              lastName={student.lastName}
            />
          ))}
        </section>
      </article>
    </Card>
  );
}

export default Students;
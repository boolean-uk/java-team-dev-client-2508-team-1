import { useEffect, useState } from "react";
import Card from "../../../components/card";
import Student from "./student";
import './students.css';
import { getMyCohortProfiles, getUserById } from "../../../service/apiClient";
import { SoftwareIcon } from "../../../assets/icons/specialismIcon";
import jwtDecode from "jwt-decode";

function Students() {
    const [students, setStudents] = useState([]);
    const [course, setCourse] = useState("");
    const [cohortId, setCohortId] = useState("");

    useEffect(() => {
        async function fetchStudents() {
            try {
                const data = await getMyCohortProfiles("student");
                setStudents(data);
            } catch (error) {
                console.error('fetchStudents() in cohort/students/index.js:', error);
            }
        }

        async function fetchCourse() {
            try {
                const token = localStorage.getItem("token");
                const { userId } = jwtDecode(token);

                const data = await getUserById(userId);
                setCourse(data.profile.cohort.cohort_courses[0].name);
            } catch (error) {
                console.error('fetchCourse() in cohort/students/index.js:', error);
            }
        }

        async function fetchCohortId() {
            try {
                const token = localStorage.getItem("token");
                const { userId } = jwtDecode(token);
                const data = await getUserById(userId);

                setCohortId(data.profile.cohort.id);
            } catch (error) {
                console.error('fetchCourse() in cohort/students/index.js:', error);
            }
        }

        fetchStudents();
        fetchCourse();
        fetchCohortId();
    }, []);


    // in cohort-course-date: getCohortsForStudent() or something, make it a dropdown to select which subject to render!!!! we do NOT want to scroll through lots of students to view the next subject's students
    return (
        <Card>
            <article className="cohort">
                <section>
                        <h3>My cohort</h3>
                </section>

                <div className="cohort-course-date border-top">
                    <div className="specialism-sircle">
                        {<SoftwareIcon />}
                    </div>
                    <div className="cohort-title">
                        <p>{course}, Cohort {cohortId}</p>
                    </div>
                    <div className="cohort-dates">
                        <small>January 2023 - June 2023</small>
                    </div>
                </div>

                <section className="cohort-students-container border-top">
                    {students.map((student) => (
                        <Student key={student.id} name={student.firstName + " " + student.lastName} />
                    ))}
                </section>
            </article>
            
        </Card>
    )
}

export default Students;
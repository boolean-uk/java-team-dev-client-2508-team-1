import { useEffect, useState } from "react";
import Card from "../../../components/card";
import Student from "./student";
import './students.css';
import { getStudents } from "../../../service/apiClient";

function Students() {
    const [students, setStudents] = useState([]);

    useEffect(() => {
        async function fetchStudents() {
            try {
                const data = await getStudents();
                setStudents(data);
            } catch (error) {
                console.error('fetchStudents() in cohort/students/index.js:', error);
            }
        }

        fetchStudents();
    }, []);


    // in cohort-course-date: getCohortsForStudent() or something, make it a dropdown to select which subject to render!!!! we do NOT want to scroll through lots of students to view the next subject's students
    return (
        <Card>
            <article className="cohort">
                <section>
                        <h3>My cohort</h3>
                </section>

                <div className="cohort-course-date border-top">
                    <p>Software Development, Cohort 4</p>
                    <small>January 2023 - June 2023</small>
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

/* <Student key={student.id} name={student.firstName} /> */

export default Students;
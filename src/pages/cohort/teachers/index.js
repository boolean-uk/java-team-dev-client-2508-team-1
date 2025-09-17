import Card from "../../../components/card";
import './style.css';
import Teacher from "./teacher";
import { getTeachers } from "../../../service/apiClient";
import { useEffect, useState } from "react";

const Teachers = () => {

    const [teachers, setTeachers] = useState([]);

    useEffect(() => {
        async function fetchTeachers() {
            try {
                const data = await getTeachers();
                setTeachers(data);
            } catch (error) {
                console.error('fetchTeachers() in cohort/teachers/index.js:', error);
            }
        }

        fetchTeachers();
    }, []);

    return (
        <Card>
            <article className="cohort">
                <section>
                    <h3>Teachers</h3>
                </section>
                
                <section className="cohort-teachers-container border-top">
                    {teachers.map((teacher) => (
                        <Teacher key={teacher.id} name={teacher.firstName + " " + teacher.lastName} />
                    ))}
                </section>
            </article>
        </Card>
    );
}

export default Teachers;

import Card from "../../../components/card";
import './style.css';
import Teacher from "./teacher";
import { getMyCohortProfiles } from "../../../service/apiClient";
import { useEffect, useState } from "react";

const Teachers = () => {

    const [teachers, setTeachers] = useState([]);

    useEffect(() => {
        async function fetchTeachers() {
            try {
                const data = await getMyCohortProfiles("teacher");
                setTeachers(data);
                console.log("DATA", data)
                console.log(data[0].specialism);
            } catch (error) {
                console.error('fetchTeachers() in cohort/teachers/index.js:', error);
            }
        }

        fetchTeachers();
    }, []);

    function getInitials(teacher) {
        const firstNameParts = teacher.firstName.trim().split(/\s+/); // split by any number of spaces
        const lastNameInitial = teacher.lastName.trim().charAt(0);
        
        const firstNameInitials = firstNameParts.map(name => name.charAt(0));
        
        return (firstNameInitials.join('') + lastNameInitial).toUpperCase();
    }

    return (
        <Card>
            <article className="cohort">
                <section>
                    <h3>Teachers</h3>
                </section>
                
                <section className="cohort-teachers-container border-top">
                    {teachers.map((teacher, index) => (
                        <Teacher 
                            key={teacher.id} 
                            initials={getInitials(teacher)}
                            firstName={teacher.firstName}
                            lastName={teacher.lastName}
                            role={teacher.specialism}
                        />
                    ))}
                </section>
            </article>
        </Card>
    );
}

export default Teachers;

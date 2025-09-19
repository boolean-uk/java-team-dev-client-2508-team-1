import Card from "../../../components/card";
import './style.css';
import Teacher from "./teacher";
import { get, getUserById } from "../../../service/apiClient";
import { useEffect, useState } from "react";
import jwtDecode from "jwt-decode";

const Teachers = () => {

    const [teachers, setTeachers] = useState([]);

    useEffect(() => {
        async function fetchData() {
            try {
                const token = localStorage.getItem('token');
                const { userId } = jwtDecode(token);
                const user = await getUserById(userId);
                const data = await get(`cohorts/${user.cohort.id}`);

                const teachers = data.data.cohort.profiles.filter((userid) => userid?.role?.name === "ROLE_TEACHER");
                setTeachers(teachers || []);
            } catch (error) {
                console.error('fetchTeachers() in cohort/teachers/index.js:', error);
            }
        }

        fetchData();
    }, []);

    function getInitials(teacher) {
        if (!teacher.firstName || !teacher.lastName) return "NA";
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
                            key={teacher.id || 0} 
                            initials={getInitials(teacher) || "NA"}
                            firstName={teacher.firstName || "N/A"}
                            lastName={teacher.lastName || "N/A"}
                            role={teacher.specialism || "N/A"}
                        />
                    ))}
                </section>
            </article>
        </Card>
    );
}

export default Teachers;

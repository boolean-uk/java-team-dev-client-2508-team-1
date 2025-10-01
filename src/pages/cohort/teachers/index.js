import Card from "../../../components/card";
import './style.css';
import Teacher from "./teacher";


const Teachers = ({ teachers }) => {
    console.log(teachers, "teachers in teachers component");

    return (
        <Card>
            <article className="cohort">
                <section>
                    <h3>Teachers</h3>
                </section>
                
                <section className="cohort-teachers-container border-top">
                    {teachers.map((teacher) => (
                        <Teacher 
                            photo={teacher.photo}
                            key={teacher.id || 0} 
                            id = {teacher.user.id}
                            initials={teacher.firstName.charAt(0) + teacher.lastName.charAt(0) || "NA"}
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

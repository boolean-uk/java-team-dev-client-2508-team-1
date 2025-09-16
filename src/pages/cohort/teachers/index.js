import Card from "../../../components/card";
import './style.css';
import Teacher from "./teacher";

const Teachers = () => {

    const teachers = [
        { id: 1, name: 'John Doe' },
        { id: 2, name: 'Jane Smith' }
    ];

    return (
        <Card>
            <article className="cohort">
                <section>
                    <h3>Teachers</h3>
                </section>
                
                <section className="cohort-teachers-container border-top">
                    {teachers.map((teacher) => (
                        <Teacher key={teacher.id} name={teacher.name} />
                    ))}
                </section>
            </article>
        </Card>
    );
}

export default Teachers;

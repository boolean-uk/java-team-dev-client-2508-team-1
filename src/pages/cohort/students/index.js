import Card from "../../../components/card";
import Student from "./student";
import './students.css';

function Students() {
    const students = [
        { id: 1, name: 'Alice Johnson' },
        { id: 2, name: 'Bob Smith' },
        { id: 3, name: 'Charlie Brown' },
        { id: 4, name: 'Diana Prince' },
        { id: 5, name: 'Ethan Hunt' },
        { id: 6, name: 'Fiona Gallagher' },
        { id: 7, name: 'George Martin' },
        { id: 8, name: 'Hannah Baker' },
        { id: 9, name: 'Ian Fleming' },
        { id: 10, name: 'Jane Doe' }
    ];

    /*
    const [students, setStudents] = useState([]);
    useEffect(() => {
        getStudents().then(setStudents);
    }, []);

    // need: backend getStudents: users with role = student
    // add getStudents(endpoint, data, auth = true) to apiClient.js

    // in cohort-course-date: getCohortsForStudent() or something, make it a dropdown to select which subject to render!!!! we do NOT want to scroll through lots of students to view the next subject's students
    */
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
                        <Student key={student.id} icon={student.icon} name={student.name} />
                    ))}
                </section>
            </article>
            
        </Card>
    )
}

export default Students;
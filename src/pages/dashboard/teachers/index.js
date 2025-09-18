// import { useEffect, useState } from "react"
// import { get } from "../../../service/apiClient"
import Card from "../../../components/card"
import ProfileIconTeacher from "../../../components/profile-icon-teacherView"

const TeachersDashboard = () => {
    // const [teachers, setTeachers] = useState(null)

    /* useEffect(() => {
        async function fetchTeachers() {
            try {
                const response = await get("teachers")
                setTeachers(response.data.teachers)
            } catch (error) {
                console.error("Error fetching teachers: ", error)
            }
        }
        fetchTeachers()
    }, [])
*/
    const teachers = [
       { first_name: "Lina", last_name: "Andersen", specialism: "Software Development" },
        { first_name: "Marius", last_name: "Bakke", specialism: "Data Analytics" },
        { first_name: "Sofie", last_name: "Holt", specialism: "Software Development" },
        { first_name: "Tobias", last_name: "Nilsen", specialism: "Data Analytics" },
        { first_name: "Emilie", last_name: "Foss", specialism: "Software Development" },
        { first_name: "Daniel", last_name: "Rød", specialism: "Software Development" },
        { first_name: "Ida", last_name: "Lund", specialism: "Front-End Development" },
        { first_name: "Sebastian", last_name: "Vik", specialism: "Front-End Development" },
        { first_name: "Julie", last_name: "Aas", specialism: "Front-End Development" },
        { first_name: "Kristoffer", last_name: "Hagen", specialism: "Data Analytics" }
    ]

    return (
        <>
        <Card>
            <h3 className="border-line">Teachers</h3>
            <section>
                <ul>
                    {teachers.slice(0,10).map((teacher, index) => (
                        <li key={index}>
                            <div>
                               <ProfileIconTeacher initials={teacher.first_name.charAt(0) + teacher.last_name.charAt(0)} firstname={teacher.first_name} lastname={teacher.last_name} role={teacher.specialism}/> 
                            </div>
                        </li>
                    ))}
                </ul>
            </section>
        </Card>
        </>
    )
}

export default TeachersDashboard
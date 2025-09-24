import { useEffect, useState } from "react"
import { get } from "../../../service/apiClient"
import Card from "../../../components/card"
import UserIcon from "../../../components/profile-icon"

const TeachersDashboard = () => {
    const [teachers, setTeachers] = useState(null)

    useEffect(() => {
        async function fetchTeachers() {
            try {
                const response = await get("teachers")
                setTeachers(Array.isArray(response.data.profiles) ? response.data.profiles : [])
            } catch (error) {
                console.error("Error fetching teachers: ", error)
            }
        }
        fetchTeachers()
    }, [])

    return (
        <>
        <Card>
            <h3 className="border-line">Teachers</h3>
            <section>
                {teachers !== null ? (
                <ul className="students-list-teacher-view">
                    {teachers?.map((teacher, index) => (
                        <li key={index}>
                            <div>
                               <UserIcon 
                                   photo={teacher.photo}
                                   id={teacher.id}
                                   initials={`${teacher.firstName} ${teacher.lastName}`
                                       .trim()
                                       .split(/\s+/)
                                       .map(word => word[0].toUpperCase())
                                       .join('')}
                                   firstname={teacher.firstName}
                                   lastname={teacher.lastName}
                                   role = {"Teacher"}
                               />
                            </div>
                        </li>
                    ))}
                </ul>
                ) : (
                <div className="">
                <h3 className="loading-cohorts">Loading...</h3>
                <div className="loadingscreen-loader">
                <span></span>
                </div>
                </div>
            )}
            </section>
        </Card>
        </>
    )
}

export default TeachersDashboard

import Card from "../../../components/card"
import UserIcon from "../../../components/profile-icon"

const TeachersDashboard = ({teachers}) => {
   
    return (
        <>
        <Card>
            <h3 className="border-line">Teachers</h3>
            <section>
                {teachers.length > 0 ? (
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
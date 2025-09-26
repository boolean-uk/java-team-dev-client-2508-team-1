

import Card from "../../../components/card"

// import UserIcon from "../../../components/profile-icon";

import ProfileIconTeacher from "../../../components/profile-icon-teacherView";

const Students = ({students}) => {

   
  

    function getInitials(profile) {
        if (!profile.firstName || !profile.lastName) return "NA";
        const firstNameParts = profile.firstName.trim().split(/\s+/) || ''; // split by any number of spaces
        const lastNameInitial = profile.lastName.trim().charAt(0);
        
        const firstNameInitials = firstNameParts.map(name => name.charAt(0));
        
        return (firstNameInitials.join('') + lastNameInitial).toUpperCase();
    }
    
    return(
        <>
        <Card>
            <h3 className="border-line">Students</h3>
            <section>
                {students !== null ? (
                    <div>
                    <ul className="students-list-teacher-view">
                        {students.map((student, index) => (
                            <li key={index} className="student-item">
                                <div>
                                <ProfileIconTeacher 
                                photo={student.photo}
                                   id={student.id}
                                   initials={getInitials(student)}
                                   firstname={student.firstName}
                                   lastname={student.lastName}
                                   role={"Student"}
                                
                               />
                                </div>
                            </li>
                        ))}
                    </ul>
                    
                    <div className="border-line"></div>
                    </div>
                ):(
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
export default Students
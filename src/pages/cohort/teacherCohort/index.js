import { useEffect, useState } from "react"
// import SearchIcon from "../../../assets/icons/searchIcon"
// import EditIconCohortTeacher from "../../../components/editIconCohortTeacher"
// import TextInput from "../../../components/form/textInput"
import CohortsList from "./cohortsList"
import './style.css';
import StudentList from "./studentList"
import EditIconCouse from "../../../components/editIconCourse"
import CourseIcon from "../../../components/courseIcon"
import { useNavigate } from "react-router-dom"
import SearchTeacher from "./searchTeacher";


const TeacherCohort = ({cohorts, setRefresh}) => {
    // const [searchVal, setSearchVal] = useState('');
    const [selectedProfiles, setSelectedProfiles] = useState([]);
    const[selectedCohort, setSelectedCohort] = useState(null);
    const navigate = useNavigate()

    // const onChange = (e) => {
    //     setSearchVal(e.target.value);
    // };

    useEffect(() => {}, [selectedProfiles]);
        
    return (
        <>
        {cohorts.length > 0 ? ( <div className="cohort-card">
            <div className="cohort-card-header">
                <div className="header-titles">
                    <h3>Cohorts</h3>
                    <h3>Students</h3>
                </div>

                <div className="search-bar-in-cohorts">
                <SearchTeacher />
                </div>
            </div>


            <div className="sections-wrapper">
                <section className="cohorts-section">
                    <div className="add-cohort">
                        <div className="add-cohort-button">
                            <button onClick={() => navigate("/cohorts/new")}>Add cohort</button>
                        </div>
                    </div>                    
                
                    <hr className="divider" />


                    <div className="cohort-list">     
                        <CohortsList cohorts={cohorts} setSelectedCohort={setSelectedCohort} onSelect={(profiles) => setSelectedProfiles(profiles)} />
                    </div>
                </section>    

                <section className="students-section">
                    <div className="students">
                        <div className="selected-course">
                            {selectedCohort !== null ? (
                                <>

                                <CourseIcon courseName={selectedCohort.course.name} cohort={selectedCohort.id} startDate={selectedCohort.startDate} endDate={selectedCohort.endDate}/>

                                </>
                            ): (<><p>Select a course</p></>)}
                            
                        </div>

                        <div className="actions">
                        <div className="add-student-button">
                            <button onClick={() => navigate("/cohorts/add")}>Add student</button>
                        </div>
                        <div className="edit-icon-course">
                    {console.log(selectedCohort)}
                            <EditIconCouse setRefresh={setRefresh} cohort={selectedCohort ? selectedCohort.id : 1}/>

                        </div>
                        </div>
                    </div>
                    <hr className="divider"/>

                    
                        <StudentList profiles={selectedProfiles} setRefresh={setRefresh} cohorts={cohorts} />
                </section>
            </div>
        </div>):(
            <div>
        <div className="">
            <h3 className="cohort-teacher-loading">Loading...</h3>
            <div className="loadingscreen-loader">
            <span></span>
            </div>
        </div>
        </div>
        )}
       
    </>
    )
}

export default TeacherCohort

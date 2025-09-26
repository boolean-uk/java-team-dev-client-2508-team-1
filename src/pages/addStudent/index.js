import ExitIcon from "../../assets/icons/exitIcon";
import "./style.css";
import SearchBar from "./searchBar";
import {useState } from "react";
import {  patch } from "../../service/apiClient";
import ArrowDownIcon from "../../assets/icons/arrowDownIcon";
import StudentsMenu from "./studentsMenu";
import CoursesMenu from "./coursesMenu";
import { useNavigate } from "react-router-dom";
import CohortsMenu from "./cohortsMenu";
import { Snackbar, SnackbarContent } from '@mui/material';
import CheckCircleIcon from "../../assets/icons/checkCircleIcon";
import { useData } from "../../context/data";
import useAuth from "../../hooks/useAuth";

    

const AddStudent = () => {

   

    const {students, courses} = useData()
    const{setRefresh} = useAuth()
    const [cohorts, setCohorts] = useState([])
    const [isOpenCourses, setIsOpenCourses] = useState(false);
    const [isOpenStudents, setIsOpenStudents] = useState(false);
    const [isOpenCohorts, setIsOpenCohorts] = useState(false)
    const [snackbarOpen, setSnackbarOpen] = useState(false);

    const [selectedStudent, setSelectedStudent] = useState(null)
    const [selectedCourse, setSelectedCourse] = useState(null)
    const [selectedCohort, setSelectedCohort] = useState(null)
    const navigate = useNavigate()



    

    const handleSelectStudent = (student) => {
        setIsOpenStudents(false); 
        setSelectedStudent(student)
  };


  const handleSelectCourse = (course) => {
    setIsOpenCourses(false)
    setSelectedCourse(course)
    setCohorts(course.cohorts)
  }

   const handleSelectCohort = (cohort) => {
    setIsOpenCohorts(false)
    setSelectedCohort(cohort)
  }

    const handleAdd = () => {
      async function addStudentToCohort() {
        try {
            const response = await patch(`cohorts/teacher/${selectedCohort.id}`, {profileId: parseInt(selectedStudent.id)});
            setRefresh(prev => !prev)
            console.log(response)
        } catch (error) {
            console.error("Error adding student to cohort:", error);
        }
    } addStudentToCohort()
    setSnackbarOpen(true);

    setTimeout(()=> {
        navigate(-1)
    }, 4000)
  }
  return (
    <>
      <div className="add-student-card">
        <div className="add-cohort-header">
          <h2 className="add-title">Add student to cohort</h2>
          <div className="exit-icon-wrapper">
            <button className="exit-button" onClick={() => navigate(-1)} >
              <ExitIcon />
            </button>
          </div>
        </div>
        <p className="add-under-title">Add a student to an existing cohort</p>
        <hr className="line" />


        <SearchBar
        selectedStudent={selectedStudent}
        setSelectedStudent={setSelectedStudent}
        />

        <div className="dropdown-section">
            <p className="paragraph"> Or</p>

        <div className="add-student-students-button">
            <button  onClick={() => setIsOpenStudents(true)}>
                {selectedStudent !== null ? (<span className="add-student-button-title-selected">{selectedStudent.firstName}  {selectedStudent.lastName}</span>) : ( 
                <span className="add-student-button-title">Student*</span>
)}
                <ArrowDownIcon/>
            </button> 
        </div>

        {isOpenStudents && (<StudentsMenu students={students} handleSelectStudent={handleSelectStudent} />)}

        <p className="paragraph">Add to </p>
        <div className="select-course-button">
            <label className="the-label">Course*</label>
                <button  onClick={() => setIsOpenCourses(true)}>
                    {selectedCourse !== null ? (<span className="select-course-title-selected">{selectedCourse.name}</span>
                    ):( <span className="select-course-title">Select a course</span>)}
                    
                    <ArrowDownIcon/>
                </button> 
        </div>

        {isOpenCourses && (<CoursesMenu courses={courses} onSelect={handleSelectCourse}/>)}

        <div className="select-cohort-button">
            <label className="the-label">Cohort*</label>
             <button  onClick={() => setIsOpenCohorts(true)}>
                    {selectedCohort !== null ? (<span className="select-cohort-title-selected">Cohort {selectedCohort.id}</span>
                    ):( <span className="select-cohort-title">Select a cohort</span>)}
    
                    <ArrowDownIcon/>
                </button> 
        </div>

        {isOpenCohorts && (<CohortsMenu cohorts={cohorts} onSelect={handleSelectCohort}/>)}

        <label className="required-label">*Required</label>

        
        </div>

        <div className="buttons-at-bottom"> 
            <button className="offwhite" onClick={() => navigate(-1)}> Cancel </button>
            <button className="blue" onClick={handleAdd}>Add to cohort</button>
                                
            <Snackbar open={snackbarOpen} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }} 
  autoHideDuration={3000}
>
            <SnackbarContent
                sx={{
                backgroundColor: '#000046',
                color: '#fff',
                width: '310px',
                height: '70px',
                padding: '4px 16px',
                borderRadius: '8px',
                boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.25)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '20px',
                }}
                message={
                <span style={{ color: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <CheckCircleIcon style={{ marginRight: '8px', color: '#FFFFFF' }} />
                    Student added to cohort
                </span>
                }
            />
            </Snackbar>


        </div>
        
        <hr className="line"></hr>
        <div className="bottom">
        <p className="paragraph">Or</p>
        <button className="offwhite-button" onClick={() => navigate("/cohorts/newStudent")}>Add new student</button>
        </div>

      </div>
    </>
  );
};

export default AddStudent;

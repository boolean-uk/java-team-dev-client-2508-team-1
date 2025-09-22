import ExitIcon from "../../assets/icons/exitIcon";
import "./style.css";
import SearchBar from "./searchBar";
import { useEffect, useState } from "react";
import { get } from "../../service/apiClient";
import ArrowDownIcon from "../../assets/icons/arrowDownIcon";
import StudentsMenu from "./studentsMenu";
import CoursesMenu from "./coursesMenu";
import { useNavigate } from "react-router-dom";
import CohortsMenu from "./cohortsMenu";
    

const AddStudent = () => {
    const [students, setStudents] = useState([])
    const [courses, setCourses] = useState([])
    const [cohorts, setCohorts] = useState([])
    const [isOpenCourses, setIsOpenCourses] = useState(false);
    const [isOpenStudents, setIsOpenStudents] = useState(false);
    const [isOpenCohorts, setIsOpenCohorts] = useState(false)
    const [selectedStudent, setSelectedStudent] = useState(null)
    const [selectedCourse, setSelectedCourse] = useState(null)
    const [selectedCohort, setSelectedCohort] = useState(null)
    const navigate = useNavigate()


    useEffect(() => {
    async function fetchStudents() {
        try {
            const response = await get("students");
            setStudents(response.data.profiles);
        } catch (error) {
            console.error("Error fetching students:", error);
        }
    }
    
    async function fetchCourses() {
        try {
            const response = await get("courses");
            setCourses(response.data.courses);
        } catch (error) {
            console.error("Error fetching courses:", error);
        }
    }

    async function fetchCohorts() {
         try {
            const response = await get("cohorts");
            setCohorts(response.data.cohorts);
            console.log("cohorts: " + response)
        } catch (error) {
            console.error("Error fetching courses:", error);
        }
    }
    fetchStudents(); 
    fetchCourses()
    fetchCohorts()
    }, []);

    const handleSelectStudent = (student) => {
        console.log("Selected student:", student);
        setIsOpenStudents(false); 
        setSelectedStudent(student)
        addStudentToCohort(selectedStudent,selectedCourse)
  };

  const addStudentToCohort = () => {

  }

  const handleSelectCourse = (course) => {
    console.log("selected course" + course)
    setIsOpenCourses(false)
    setSelectedCourse(course)
  }

   const handleSelectCohort = (cohort) => {
    console.log("selected course" + cohort)
    setIsOpenCohorts(false)
    setSelectedCohort(cohort)
  }
  return (
    <>
      <div className="add-student-card">
        <div className="add-cohort-header">
          <h2 className="add-title">Add student to cohort</h2>
          <div className="exit-icon-wrapper">
            <button className="exit-button" onClick={() => navigate("/cohorts")} >
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
                    ):( <span className="select-course-title">Software Development</span>)}
                    
                    <ArrowDownIcon/>
                </button> 
        </div>

        {isOpenCourses && (<CoursesMenu courses={courses} onSelect={handleSelectCourse}/>)}

        <div className="select-cohort-button">
            <label className="the-label">Cohort*</label>
             <button  onClick={() => setIsOpenCohorts(true)}>
                    {selectedCohort !== null ? (<span className="select-cohort-title-selected">Cohort {selectedCohort.id}</span>
                    ):( <span className="select-cohort-title">Cohort 1</span>)}
    
                    <ArrowDownIcon/>
                </button> 
        </div>

        {isOpenCohorts && (<CohortsMenu cohorts={cohorts} onSelect={handleSelectCohort}/>)}

        <label className="required-label">*Required</label>

        
        </div>

        <div className="buttons-at-bottom"> 
            <button className="offwhite"> Cancel </button>
            <button className="blue">Add to cohort</button>
        </div>
        
        <hr className="line"></hr>
        <div className="bottom">
        <p className="last-line">Or</p>
        <button className="offwhite">Add new student</button>
        </div>

      </div>
    </>
  );
};

export default AddStudent;

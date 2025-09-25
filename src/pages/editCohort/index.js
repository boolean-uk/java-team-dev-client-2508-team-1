import { useNavigate, useParams } from "react-router-dom"
import ExitIcon from "../../assets/icons/exitIcon"
import "./style.css"
import StepperCohort from "./steps"
import StepOneCohort from "./stepOne"
import { useEffect, useState} from "react"
import { get } from "../../service/apiClient"
import StepTwoCohort from "./stepTwo"
import StepThreeCohort from "./stepThree"


const EditCohort = () =>{
    const [students, setStudents] = useState([])
    const [courses, setCourses] = useState([])

    const [cohortName, setCohortName] = useState("")
    const[startDate, setStartDate] = useState("")
    const[endDate, setEndDate] = useState("")
    const [selectedCourse, setSelectedCourse] = useState("")
    const [cohort, setCohort] = useState(null)


    const [selectedStudents, setSelectedStudents] = useState([]);

    const {id} = useParams()



  useEffect(() => {
    async function fetchCohortById() {

      try {
        const response = await get(`cohorts/${id}`);
        setCohort(response.data.cohort);
        console.log("Cohort: " , response)
      } catch (error) {
        console.error("Error fetching cohort by ID:", error);
      }

    }
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
    fetchStudents(); 
    fetchCourses();
    fetchCohortById();
  }, []);


    // TODO
    // Prelaod informasjon fra cohorten
    
  console.log(cohort)
  
  useEffect(()=>{

    if(cohort){
      setCohortName(cohort.name)
      setSelectedStudents(cohort.profiles) 
      setSelectedCourse(cohort.course)
      setStartDate(cohort.startDate) 
      setEndDate(cohort.endDate) 

      console.log(selectedCourse)
    }



  },[cohort])


    return (
        <>
            <StepperCohort 
            header={<CohortHeader/>}  
            cohortName={cohortName}
            setCohortName={setCohortName}
            startDate={startDate}
            setStartDate={setStartDate}
            endDate={endDate}
            setEndDate={setEndDate}
            courses={courses}
            selectedCourse={selectedCourse}
            selectedStudents={selectedStudents}
            setSelectedCourse={setSelectedCourse}
            setSelectedStudents={setSelectedStudents}
            cohortId = {id}>
                <StepOneCohort 
                    cohortName={cohortName}
                    setCohortName={setCohortName}
                    startDate={startDate}
                    setStartDate={setStartDate}
                    endDate={endDate}
                    setEndDate={setEndDate}
                    courses={courses}
                    selectedCourse={selectedCourse}
                    setSelectedCourse={setSelectedCourse}
                 />
                <StepTwoCohort
                    students={students}
                    selectedStudents={selectedStudents}
                    setSelectedStudents={setSelectedStudents}
                />
                <StepThreeCohort
                    students={students}
                    selectedStudents={selectedStudents}
                    setSelectedStudents={setSelectedStudents}
                    selectedCourse={selectedCourse}
                    cohortName={cohortName}
                    startDate={startDate}
                    endDate={endDate}/>
            </StepperCohort>
        </>
    )
}


const CohortHeader = () => {
    const navigate = useNavigate()
    return (
      <>
            <div className="add-cohort-header">
            <h2 className="add-title">Edit cohort</h2>
            <div className="exit-icon-wrapper">
                <button className="exit-button" onClick={() =>  navigate(-1)}>
                    <ExitIcon/>
                </button>
            </div>
            </div>
            <p className="add-under-title">Update the info for this cohort</p>
            <hr className="line"></hr>
   </>
    )
}
export default EditCohort

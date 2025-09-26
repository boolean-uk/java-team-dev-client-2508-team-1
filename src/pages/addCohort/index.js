import { useNavigate } from "react-router-dom"
import ExitIcon from "../../assets/icons/exitIcon"
import "./style.css"
import StepperCohort from "./steps"
import StepOneCohort from "./stepOne"
import {  useState } from "react"
import StepTwoCohort from "./stepTwo"
import StepThreeCohort from "./stepThree"
import { useData } from "../../context/data"


const AddCohort = () =>{

    const {students, courses} = useData()

    const [cohortName, setCohortName] = useState("")
    const[startDate, setStartDate] = useState("")
    const[endDate, setEndDate] = useState("")
    const [selectedCourse, setSelectedCourse] = useState("")
    const [selectedStudents, setSelectedStudents] = useState([]);


    return (
        <>
            <StepperCohort 
                header={<CohortHeader/>}  
                cohortName={cohortName}
                setCohortName={setCohortName}
                startDa={startDate}
                setStartDate={setStartDate}
                endDa={endDate}
                setEndDate={setEndDate}
                courses={courses}
                selectedCourse={selectedCourse}
                setSelectedCourse={setSelectedCourse}
                selectedStudents={selectedStudents}>
    
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
            <h2 className="add-title">Add cohort</h2>
            <div className="exit-icon-wrapper">
                <button className="exit-button" onClick={() =>  navigate(-1)}>
                    <ExitIcon/>
                </button>
            </div>
            </div>
            <p className="add-under-title">Create a new cohort</p>
            <hr className="line"></hr>
   </>
    )
}
export default AddCohort
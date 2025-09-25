
import ArrowDownIcon from "../../../assets/icons/arrowDownIcon"
import CoursesMenu from "../../addStudent/coursesMenu"
import { useState } from "react"




const StepOneCohort = ( {setCohortName, setStartDate, setEndDate, cohortName, startDate, endDate, courses, setSelectedCourse, selectedCourse}) => {
    const [courseIsOpen, setCourseIsOpen] = useState(false)



    const handleChangeCohortName = (event) => {
        setCohortName(event.target.value)
    }

    const handleSelectCourse = (course) => {
        console.log("selected course" + course)
        setCourseIsOpen(false)
        setSelectedCourse(course)
  }

  const handleStartDate = (event) => {
    setStartDate(event.target.value)
  }

  const handleEndDate = (event) => {
    setEndDate(event.target.value)
  }


    return (
        <>
        <div className="dropdown-section">
            <div>
                <label className="the-label">Cohort name*</label>
                    <input
                        className="cohort-name-input"  
                        type="text"
                        onChange={handleChangeCohortName}
                        value={cohortName}>
                    </input>
            </div>
            
            <div className="select-course-button">
                <label className="the-label">Course*</label>
                <button onClick={() => setCourseIsOpen(true)}>
                    {selectedCourse !== null ? (<span className="select-course-title-selected">{selectedCourse.name}</span>
                    ):( <span className="select-course-title">Select a course</span>)}
                    <ArrowDownIcon/>
                </button>
            </div>

            {courseIsOpen && (<CoursesMenu courses={courses} onSelect={handleSelectCourse}/>)}

            
            <div>
                <label className="the-label">Start Date*</label>
                <input
                    className="cohort-start-date-input"
                    type="date"
                    onChange={handleStartDate}
                    value={startDate}>
                </input>
            </div>
            <div>
                <label className="the-label">End Date*</label>
                <input
                    className="cohort-start-date-input"
                    type="date"
                    onChange={handleEndDate}
                    value={endDate}>
                </input>
            </div>

            <label className="required-label">*Required</label>

        </div>

</>
    )
}

export default StepOneCohort
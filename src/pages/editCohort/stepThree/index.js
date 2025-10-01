import { useState } from "react";
import ArrowDownIcon from "../../../assets/icons/arrowDownIcon";
import MultipleStudentsMenu from "../stepTwo/multipleStudentsMenu";
import SearchBarMultiple from "../stepTwo/SearchBarMultiple";
import CourseIcon from "../../../components/courseIcon";

const StepThreeCohort = ({cohortName, selectedCourse, students, selectedStudents, setSelectedStudents, endDate, startDate}) => {
 const [isOpenStudents, setIsOpenStudents] = useState(false);
const [isOpenSearchBar, setIsOpenSearchBar] = useState(false);



const handleSelectStudent = (student) => {
    

  setSelectedStudents((prevSelected) => {
    const alreadySelected = prevSelected.find((s) => s.id === student.id);
    if (alreadySelected) {
      // Fjern student hvis allerede valgt
      return prevSelected.filter((s) => s.id !== student.id);
    } else {
      // Legg til student
      return [...prevSelected, student];
    }
  })

  setTimeout(()=> {
        setIsOpenSearchBar(false)
    }, 500)
  
};
    
    return (
        <>
        <div className="dropdown-section">
            <SearchBarMultiple
            students={students}
            handleSelectStudent={handleSelectStudent} 
            selectedStudents={selectedStudents}
            isOpenSearchBar={isOpenSearchBar}
            setIsOpenSearchBar={setIsOpenSearchBar}/>

        <p className="paragraph"> Or select students: </p>

        <div className="add-student-students-button">
        <button onClick={() => setIsOpenStudents(prev => !prev)}>                
            <span className="select-course-title">Students</span>            
                <ArrowDownIcon/>
            </button> 
        </div>

        {isOpenStudents && (<MultipleStudentsMenu selectedStudents={selectedStudents} students={students} handleSelectStudent={handleSelectStudent} />)}
        </div>

        
        <div className="cohort-details-group">
            <hr className="line"></hr>
                <h2>Cohort details</h2>
                    <hr className="line"></hr>
                    
                    <CourseIcon courseName={selectedCourse.name} cohort={cohortName} startDate={startDate} endDate={endDate}/>
                                <hr className="line"></hr>

           <div>
                <MultipleStudentsMenu selectedStudents={selectedStudents} students={selectedStudents} handleSelectStudent={handleSelectStudent} />
            </div>
        </div>

        </>
    )
}

export default StepThreeCohort

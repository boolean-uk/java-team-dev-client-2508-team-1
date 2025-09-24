
import { useState } from "react";
import ArrowDownIcon from "../../../assets/icons/arrowDownIcon";
import MultipleStudentsMenu from "./multipleStudentsMenu";
import SearchBarMultiple from "./SearchBarMultiple";

const StepTwoCohort = ({students, selectedStudents, setSelectedStudents}) => {

const [isOpenStudents, setIsOpenStudents] = useState(false);


const handleSelectStudent = (student) => {
    
  console.log("Klikket på student:", student);

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
  
  console.log(selectedStudents);
};
    
    return (
        <>
        <div className="dropdown-section">
            <SearchBarMultiple
            students={students}
            handleSelectStudent={handleSelectStudent} 
            selectedStudents={selectedStudents}/>

        <div className="dropdown-section">
        <p className="paragraph"> Or select students: </p>

        <div className="add-student-students-button">
            <button  onClick={() => setIsOpenStudents(true)}>
                {selectedStudents !== null ? (<span className="add-student-button-title-selected">{selectedStudents.firstName}  {selectedStudents.lastName}</span>) : ( 
                <span className="add-student-button-title">Student*</span>
)}
                <ArrowDownIcon/>
            </button> 
        </div>

        {isOpenStudents && (<MultipleStudentsMenu selectedStudents={selectedStudents} students={students} handleSelectStudent={handleSelectStudent} />)}
        </div>

        </div>

        </>
    )
}

export default StepTwoCohort

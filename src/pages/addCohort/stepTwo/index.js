import { useState } from "react";
import ArrowDownIcon from "../../../assets/icons/arrowDownIcon";
import MultipleStudentsMenu from "./multipleStudentsMenu";
import SearchBarMultiple from "./SearchBarMultiple";

const StepTwoCohort = ({students, selectedStudents, setSelectedStudents}) => {

const [isOpenStudents, setIsOpenStudents] = useState(false);
const [isOpenSearchBar, setIsOpenSearchBar] = useState(false);



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



        </>
    )
}

export default StepTwoCohort
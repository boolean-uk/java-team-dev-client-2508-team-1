
import Menu from "../../menu"
import MenuItem from "../../menu/menuItem"
import AddCohortIcon from "../../../assets/icons/addCohortIcon"
import EditCohortIcon from "../../../assets/icons/editCohortIcon"
import DeleteIcon from "../../../assets/icons/deleteIcon"
import AddStudentIcon from "../../../assets/icons/addStudentIcon"
import { useState } from "react"
import { useSelectedCohortId } from "../../../context/selectedCohort"

const CascadingMenuCourse = ({ id, setIsMenuVisible, cohort }) => {

    const [clicked, setClicked] = useState(false);
    const {cohortId} = useSelectedCohortId();

    return (
        
        <Menu className="course-menu">
            <MenuItem icon={<AddCohortIcon />} text="Add student to cohort" linkTo="/cohorts/add" />
            <MenuItem icon={<AddStudentIcon />} linkTo="newStudent" text = "Add new student"/>
            <MenuItem icon={<EditCohortIcon/>} text="Edit cohort" linkTo={`${cohort}/edit`}/>
            {clicked ? 
            <MenuItem 
                icon={<DeleteIcon />} 
                text="Confirm deletion" 
                selectedCohortId = {cohortId} 
                clickable="DeleteCohort" 
                style={{color: 'red'}} 
                
                setIsMenuVisible={setIsMenuVisible}
            />
            :
            <MenuItem icon={<DeleteIcon />} 
                text="Delete Cohort" 
                clickable="Clicked" 
                clicked={clicked} 
                setClicked={setClicked} 
                
                setIsMenuVisible={setIsMenuVisible}
            />
            }
        </Menu>
    )
}

export default CascadingMenuCourse

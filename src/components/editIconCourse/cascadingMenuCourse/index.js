
import Menu from "../../menu"
import MenuItem from "../../menu/menuItem"
import AddCohortIcon from "../../../assets/icons/addCohortIcon"
import EditCohortIcon from "../../../assets/icons/editCohortIcon"
import DeleteIcon from "../../../assets/icons/deleteIcon"
import AddStudentIcon from "../../../assets/icons/addStudentIcon"

const CascadingMenuCourse = () => {
    return (
        <>
        <Menu className="course-menu">
            <MenuItem icon={<AddCohortIcon />} text="Add student to cohort" />
            <MenuItem icon={<AddStudentIcon />} text = "Add new student"/>
            <MenuItem icon={<EditCohortIcon/>} text="Edit cohort"/>
            <MenuItem icon={<DeleteIcon/>} text="Delete cohort"/>
        </Menu>
        </>
    )
}

export default CascadingMenuCourse
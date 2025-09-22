
import Menu from "../../menu"
import MenuItem from "../../menu/menuItem"
import DeleteIcon from "../../../assets/icons/deleteIcon"
import ProfileCircle from "../../profileCircle"
import NotesIcon from "../../../assets/icons/notesIcon"
import CohortIcon from "../../../assets/icons/cohortIcon"

const CascadingMenuSearch = () => {
    return (
        <>
        <Menu className="course-menu">
            <MenuItem icon={<ProfileCircle />} text="Profile" />
            <MenuItem icon={<NotesIcon />} text = "Add note"/>
            <MenuItem icon={<CohortIcon/>} text="Edit cohort"/>
            <MenuItem icon={<DeleteIcon/>} text="Delete student"/>
        </Menu>
        </>
    )
}

export default CascadingMenuSearch
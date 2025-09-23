
import Menu from "../../menu"
import MenuItem from "../../menu/menuItem"
import DeleteIcon from "../../../assets/icons/deleteIcon"
import NotesIcon from "../../../assets/icons/notesIcon"
import CohortIcon from "../../../assets/icons/cohortIcon"
import ProfileIcon from "../../../assets/icons/profileIcon"

const CascadingMenuSearch = () => {
    return (
        <>
        <Menu className="cascading-search-menu">
            <MenuItem icon={<ProfileIcon />} text="Profile" />
            <MenuItem icon={<NotesIcon />} text = "Add note"/>
            <MenuItem icon={<CohortIcon/>} text="Move to cohort"/>
            <MenuItem icon={<DeleteIcon/>} text="Delete student"/>
        </Menu>
        </>
    )
}

export default CascadingMenuSearch
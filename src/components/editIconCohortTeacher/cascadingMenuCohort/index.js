
import Menu from "../../menu"
import MenuItem from "../../menu/menuItem"
import AddCohortIcon from "../../../assets/icons/addCohortIcon"
import EditCohortIcon from "../../../assets/icons/editCohortIcon"
import DeleteIcon from "../../../assets/icons/deleteIcon"

const CascadingMenuCohort = () => {
    
    return (
        <>
        <Menu className="cohort-menu">
            <MenuItem icon={<AddCohortIcon />} text="Add cohort" />
            <MenuItem icon={<EditCohortIcon/>} text="Edit cohort"/>
            <MenuItem icon={<DeleteIcon/>} text="Delete cohort"/>
        </Menu>
        </>
    )
}

export default CascadingMenuCohort
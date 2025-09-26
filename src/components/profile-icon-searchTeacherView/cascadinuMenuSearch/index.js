
import Menu from "../../menu"
import MenuItem from "../../menu/menuItem"
import DeleteIcon from "../../../assets/icons/deleteIcon"
import NotesIcon from "../../../assets/icons/notesIcon"
import CohortIcon from "../../../assets/icons/cohortIcon"
import ProfileIcon from "../../../assets/icons/profileIcon"
import { useState } from "react"

const CascadingMenuSearch = ({ id, setIsMenuVisible }) => {

    const [clicked, setClicked] = useState(false);

    return (
        <>
        <Menu className="cascading-search-menu">
            <MenuItem icon={<ProfileIcon />} text="Profile" />
            <MenuItem icon={<NotesIcon />} text = "Add note"/>
            <MenuItem icon={<CohortIcon/>} text="Move to cohort"/>
            {clicked ? 
            <MenuItem 
                icon={<DeleteIcon />} 
                text="Confirm deletion" 
                cohortId = {id} 
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
        </>
    )
}

export default CascadingMenuSearch
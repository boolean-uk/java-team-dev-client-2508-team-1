
import Menu from "../../menu"
import MenuItem from "../../menu/menuItem"
import AddCohortIcon from "../../../assets/icons/addCohortIcon"
import EditCohortIcon from "../../../assets/icons/editCohortIcon"
import DeleteIcon from "../../../assets/icons/deleteIcon"
import AddStudentIcon from "../../../assets/icons/addStudentIcon"

const CascadingMenuCourse = ({ id, setIsMenuVisible, setRefresh, cohort }) => {

    const [clicked, setClicked] = useState(false);
    const {cohortId} = useSelectedCohortId();

    return (
        <>
        <Menu className="course-menu">
            <MenuItem icon={<AddCohortIcon />} text="Add student to cohort" linkTo="/cohorts/add" />
            <MenuItem icon={<AddStudentIcon />} linkTo="newStudent" text = "Add new student"/>
            <MenuItem icon={<EditCohortIcon/>} text="Edit cohort"/>
            <MenuItem icon={<DeleteIcon/>} text="Delete cohort"/>
        </Menu>
        </>
    )
}

export default CascadingMenuCourse;
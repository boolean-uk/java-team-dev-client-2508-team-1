import DataAnalyticsLogo from "../../assets/icons/dataAnalyticsLogo"
import FrontEndLogo from "../../assets/icons/frontEndLogo"
import SoftwareLogo from "../../assets/icons/software-logo"
import './style.css'

const CourseIcon = ({courseName, cohort, startDate, endDate}) => {
    return(
        <>
        <div className="course">
             <div className={`course-icon ${
                    courseName === "Software Development"
                      ? "software-icon"
                      : courseName === "Front-End Development"
                      ? "front-icon"
                      : courseName === "Data Analytics"
                      ? "data-icon"
                      : ""
                  }`}
                >
                  {courseName === "Software Development" && <SoftwareLogo />}
                  {courseName === "Front-End Development" && <FrontEndLogo />}
                  {courseName === "Data Analytics" && <DataAnalyticsLogo />}
                </div>

                <div className="course-info">
                  <p className="course-title"> {courseName}, Cohort {cohort}</p>
                  <p className="dates"> {startDate} - {endDate}</p>
                </div>
        </div>
        </>
    )
}

export default CourseIcon
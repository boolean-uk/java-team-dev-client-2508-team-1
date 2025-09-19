
import SoftwareLogo from "../../../../assets/icons/software-logo";
import FrontEndLogo from "../../../../assets/icons/frontEndLogo";
import DataAnalyticsLogo from "../../../../assets/icons/dataAnalyticsLogo";
import './style.css';
import { useState } from "react";


const CohortsList= ({ onSelect, setSelectedCohort , cohorts}) => {
  const [selectedCohortId, setSelectedCohortId] = useState(null);


    const handleClick = (cohort) => {
        setSelectedCohortId(cohort.id);
        console.log(cohort)
        setSelectedCohort(cohort)
        if (onSelect) {
          onSelect(cohort.profiles); 
        }
      };


 return (
    <ul>
      {cohorts.map((cohort) =>
        cohort.cohort_courses.map((course) => (
          <li
            key={`${cohort.id}-${course.id}`}
            className={`cohort-course-row ${selectedCohortId === cohort.id ? 'selected' : ''}`}
            onClick={() => handleClick(cohort)}
          >

                <div
                  className={`course-icon ${
                    course.name === "Software Development"
                      ? "software-icon"
                      : course.name === "Front-End Development"
                      ? "front-icon"
                      : course.name === "Data Analytics"
                      ? "data-icon"
                      : ""
                  }`}
                >
                  {course.name === "Software Development" && <SoftwareLogo />}
                  {course.name === "Front-End Development" && <FrontEndLogo />}
                  {course.name === "Data Analytics" && <DataAnalyticsLogo />}
                </div>
                <div className="cohort-info">
                  <div className="course-name">{course.name}</div>
                  <div className="cohort-name-course">Cohort {cohort.id}</div>
                </div>
              </li>
            ))
          )}
        </ul>
  );
};

export default CohortsList;




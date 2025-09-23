
import SoftwareLogo from "../../../../assets/icons/software-logo";
import FrontEndLogo from "../../../../assets/icons/frontEndLogo";
import DataAnalyticsLogo from "../../../../assets/icons/dataAnalyticsLogo";
import './style.css';
import { useState } from "react";


const CohortsList= ({ onSelect, setSelectedCohort , cohorts}) => {
  const [selectedCohortId, setSelectedCohortId] = useState(null);


    const handleClick = (cohort) => {
        setSelectedCohortId(cohort.id);
        setSelectedCohort(cohort)
        if (onSelect) {
          onSelect(cohort.profiles); 
        }
      };


 return (
    <ul>
      {cohorts.map((cohort) => (
          <li
            key={`${cohort.id}-${cohort.course.id}`}
            className={`cohort-course-row ${selectedCohortId === cohort.id ? 'selected' : ''}`}
            onClick={() => handleClick(cohort)}
          >
                <div
                  className={`course-icon ${
                    cohort.course.name === "Software Development"
                      ? "software-icon"
                      : cohort.course.name === "Front-End Development"
                      ? "front-icon"
                      : cohort.course.name === "Data Analytics"
                      ? "data-icon"
                      : ""
                  }`}
                >
                  {cohort.course.name === "Software Development" && <SoftwareLogo />}
                  {cohort.course.name === "Front-End Development" && <FrontEndLogo />}
                  {cohort.course.name === "Data Analytics" && <DataAnalyticsLogo />}
                </div>
                <div className="cohort-info">
                  <div className="course-name">{cohort.course.name}</div>
                  <div className="cohort-name-course">Cohort {cohort.id}</div>
                </div>
              </li>
            ))
          }
        </ul>
  );
};

export default CohortsList;




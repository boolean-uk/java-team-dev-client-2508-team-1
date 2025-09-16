import { useEffect, useState } from "react"
import Card from "../../../components/card"
import { get } from "../../../service/apiClient"
import SoftwareLogo from "../../../assets/icons/software-logo"
import FrontEndLogo from "../../../assets/icons/frontEndLogo"
import DataAnalyticsLogo from "../../../assets/icons/dataAnalyticsLogo"

const Cohorts = () => {
    const [cohorts, setCohorts] = useState(null) 

    
    useEffect(() => {
    async function fetchCohorts() {
        try {
        const response = await get("cohorts");
        setCohorts(response.data.cohorts);
        } catch (error) {
        console.error("Error fetching cohorts:", error);
        }
    }

    fetchCohorts(); 
    }, []);

    


    return (
        <>
        <Card>
   <h3 className="border-line">Cohorts</h3>
<section>
  {cohorts !== null ? (
    <ul>
      {cohorts.map((cohort, index) => (
        <li key={index} className="cohort-item">
          <div className="cohort-header">
            <div className="cohort-info">
              <ul className="course-list">
                {cohort.cohort_courses.map((course, j) => (
                  <li key={j} className="course-row">
                    <div className={`course-icon ${
                        course.name === "Software Development" ? "software-icon" :
                        course.name === "Front-End Development" ? "front-icon" :
                        course.name === "Data Analytics" ? "data-icon" : ""
                    }`}>
                        {course.name === "Software Development" && <SoftwareLogo />}
                        {course.name === "Front-End Development" && <FrontEndLogo />}
                        {course.name === "Data Analytics" && <DataAnalyticsLogo />}
                    </div>
                    <span className="course-name">{course.name}</span>
                    </li>
                ))}
              </ul>
              <p className="cohort-name">Cohort {cohort.id}</p>
            </div>
          </div>
        </li>
      ))}
    </ul>
  ) : (
    <p>No cohorts found.</p>
  )}
</section>


            
            


        </Card>
        </>
    )
}

export default Cohorts
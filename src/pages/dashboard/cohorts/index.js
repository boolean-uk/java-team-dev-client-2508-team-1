import { useEffect, useState } from "react"
import Card from "../../../components/card"
import { get } from "../../../service/apiClient"
import SoftwareLogo from "../../../assets/icons/software-logo"
import FrontEndLogo from "../../../assets/icons/frontEndLogo"
import DataAnalyticsLogo from "../../../assets/icons/dataAnalyticsLogo"
import './style.css';

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
        {cohorts.map((cohort, index) => {
          return (
            <li key={index} className="dashboard-cohort-item">
              <div className="cohort-header">
               
                  <div className={`course-icon ${
                    cohort.course.name === "Software Development" ? "software-icon" :
                    cohort.course.name === "Front-End Development" ? "front-icon" :
                    cohort.course.name === "Data Analytics" ? "data-icon" : ""
                  }`}>
                    {cohort.course.name === "Software Development" && <SoftwareLogo />}
                    {cohort.course.name === "Front-End Development" && <FrontEndLogo />}
                    {cohort.course.name === "Data Analytics" && <DataAnalyticsLogo />}
                  </div>
                  <div className="course-text">
                  <span className="dashboard-course-name">{cohort.course.name}</span>
                  <p className="dashboard-cohort-name">Cohort {cohort.id}</p>
                </div>
                </div>
            </li>
          );
        })}
      </ul>
      ) : (
       <div>
        <div className="">
            <h3 className="loading-cohorts">Loading...</h3>
            <div className="loadingscreen-loader">
            <span></span>
            </div>
        </div>
        </div>
      )}
    </section>
            </Card>
            </>
        )
    }

export default Cohorts
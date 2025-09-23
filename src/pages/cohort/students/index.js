import Card from "../../../components/card";
import Student from "./student";
import './students.css';
import SoftwareLogo from "../../../assets/icons/software-logo";
import FrontEndLogo from "../../../assets/icons/frontEndLogo";
import DataAnalyticsLogo from "../../../assets/icons/dataAnalyticsLogo";
import '../../../components/profileCircle/style.css';
import '../../../components/fullscreenCard/fullscreenCard.css';
// import { useState } from "react";


function Students({ students, getInitials, course, cohort }) {

    return (
    <Card>
      <article className="cohort">
        <section>
          <h3>My cohort</h3>
        </section>

        {course && (
        <div className="cohort-course-date-wrapper border-top">
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

            <div className="cohort-title">
                <p>{course.name}, Cohort {cohort.id}</p>
            </div>

            <div className="cohort-dates">
                <p>{`${cohort.course.startDate} - ${cohort.course.endDate}`}</p>
            </div>
        </div>
        )}

        <section className="cohort-students-container border-top">
          {students.map((student) => (
            <Student
              key={student.id || 0}
              id ={student.id}
              initials={getInitials(student)}
              firstName={student.firstName}
              lastName={student.lastName}
            />
          ))}
        </section>
      </article>
    </Card>
  );
}

export default Students;
const CohortsMenu = ({cohorts, onSelect}) => {
    return (
        <>
        
        <div
        className="search-results-popup"
        style={{
            position: "relative",
            top: "100%",
            left: 0,
            width: "100%",
            zIndex: 20,
        }}
        >
        {cohorts.length > 0 ? (
          <ul className="dropdown-menu">
            {cohorts.map((cohort) => (
                <li
                key={cohort.id}
                className="dropdown-item"
                onClick={() => onSelect(cohort)}>
                    <div className="course-name-menu">
                        Cohort {cohort.id}
                    </div>
                </li>
            ))}

          </ul>
        ) : (
            <p className="no-course">Please pick a course</p>
        )}
        </div>
        </>
    )
}


export default CohortsMenu
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
        <div>
        <div className="">
            <h3 className="add-student-loading">Loading...</h3>
            <div className="loadingscreen-loader">
            <span></span>
            </div>
        </div>
        </div>
        )}
        </div>
        </>
    )
}


export default CohortsMenu
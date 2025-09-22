const CoursesMenu = ({courses, onSelect}) => {
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
        {courses.length > 0 ? (
          <ul className="dropdown-menu">
            {courses.map((course) => (
                <li
                key={course.id}
                className="dropdown-item"
                onClick={() => onSelect(course)}>
                    <div className="course-name-menu">
                        {course.name}
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

export default CoursesMenu
import SearchResultsStudents from "../searchResults"

const StudentsMenu = ({students, handleSelectStudent}) => {
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
        {students.length > 0 ? (
            <SearchResultsStudents
            students={students}
            onSelect={handleSelectStudent}
            />
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
        </div></>
    )
        
   
}

export default StudentsMenu

import MultipleStudentsSearch from "./searchMultiple";

const MultipleStudentsMenu = ({ students, handleSelectStudent, selectedStudents }) => {
  return (
   <>
 
      {students.length > 0 ? (
          <section>
         <div className="s">
        <MultipleStudentsSearch
          students={students}
          handleSelectStudent ={handleSelectStudent }
          selectedStudents={selectedStudents}
        />
        </div>
        </section>
      ) : (
        <div>
          <h3 className="add-student-loading">Loading...</h3>
          <div className="loadingscreen-loader">
            <span></span>
          </div>
        </div>
      )}
      </>
  );
  
};

export default MultipleStudentsMenu;



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
          <p className="selected-students">No students selected</p>
        </div>
      )}
      </>
  );
  
};

export default MultipleStudentsMenu;

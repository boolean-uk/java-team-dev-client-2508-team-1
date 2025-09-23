


const SearchResultsStudents = ({ students, onSelect }) => {

    
    const styleGuideColors = [
    "#28C846", 
    "#A0E6AA", 
    "#46DCD2", 
    "#82E6E6", 
    "#5ABEDC", 
    "#46C8FA", 
    "#46A0FA", 
    "#666EDC"  
    ];
   
    const getColorFromInitials = (initials) => {
    let hash = 0;
    for (let i = 0; i < initials.length; i++) {
        hash = initials.charCodeAt(i) + ((hash << 5) - hash);
    }

    const index = Math.abs(hash) % styleGuideColors.length;
    return styleGuideColors[index];
    };

  
  return (
    <ul className="dropdown-menu">
      {students.map((student) => (
        <li
          key={student.id}
          className="dropdown-item"
          onClick={() => onSelect(student)}
        >
            <div className="user">
                <div className="profile-circle">
                <div className="profile-icon" style={{background: getColorFromInitials(student.firstName.charAt(0) + student.lastName.charAt(0))}}>
                    <p>{student.firstName.charAt(0) + student.lastName.charAt(0)}</p>
                </div>
            </div>
            <div className="user-info">
                <p className = "user-name">{student.firstName} {student.lastName}</p> 
            </div>
            </div>
        </li>
      ))}
    </ul>
  );
};

export default SearchResultsStudents;

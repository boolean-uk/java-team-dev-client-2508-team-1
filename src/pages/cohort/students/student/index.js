const Student = ({ icon, name }) => {
    
    return (
    <>
    <div className="student-details">
      <div className="edit-icon">
        <p>{icon}</p>
      </div>
      <div>
        <p>{name}</p>
      </div>
      <div>
        <button onClick={() => console.log('View Profile')}>
          ...
        </button>
      </div>
    </div>
    </>
  );
};

export default Student;

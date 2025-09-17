import ProfileCircle from "../../../../components/profileCircle";

const Teacher = ({ name }) => {
    
    return (
    <>
    <div className="teacher-details">
      <div>
        {<ProfileCircle initials={name.split(" ").map((n)=>n[0]).join("").toUpperCase()}/>}
      </div>
      <div>
        <p>{name}</p>
      </div>
    </div>
    </>
  );
};

export default Teacher;

import EditIconTeacher from './editIconTeacher';
import './style.css';


const ProfileIconTeacher = ({ id, initials, firstname, lastname, role, setRefresh, setSnackBarMessage, cohorts }) => {

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

        
        
    const backgroundColor = getColorFromInitials(initials);



    return (
            <div className="user">

                <div className="profile-circle">
                <div className="profile-icon" style={{background: backgroundColor}}>
                    <p>{initials}</p>
                </div>
            </div>
            <div className="user-info">
                <p className = "user-name">{firstname} {lastname}</p> 
                <p className = "user-role" >{role}</p>
            </div>
            <EditIconTeacher id={id} setRefresh={setRefresh} setSnackBarMessage={setSnackBarMessage} cohorts={cohorts} />
           </div>
    )   
}

export default ProfileIconTeacher;
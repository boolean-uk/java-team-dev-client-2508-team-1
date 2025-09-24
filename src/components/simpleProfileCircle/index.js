import './style.css';

const SimpleProfileCircle = ({ initials, size = 56, photo }) => {
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
        if (!initials || typeof initials !== 'string') return styleGuideColors[0];
        
        let hash = 0;
        for (let i = 0; i < initials.length; i++) {
            hash = initials.charCodeAt(i) + ((hash << 5) - hash);
        }

        const index = Math.abs(hash) % styleGuideColors.length;
        return styleGuideColors[index];
    };

    const backgroundColor = getColorFromInitials(initials);

    // If photo is provided, show image instead of initials
    
    if (photo) {
        return (
            <div 
                className="simple-profile-circle simple-profile-circle--image" 
                style={{
                    width: size,
                    height: size,
                }}
            >
                <img 
                    src={photo} 
                    alt="Profile" 
                    className="simple-profile-circle__image"
                />
            </div>
        );
    }

    // Default behavior - show initials with colored background
    return (
        <div 
            className="simple-profile-circle" 
            style={{
                backgroundColor,
                width: size,
                height: size,
                fontSize: size > 40 ? '14px' : '12px'
            }}
        >
            <p>{initials}</p>
        </div>
    );
};

export default SimpleProfileCircle;
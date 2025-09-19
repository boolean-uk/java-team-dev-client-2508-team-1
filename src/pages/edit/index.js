import { useEffect, useState } from "react";
import "./edit.css";
import { getUserById, updateUserProfile } from "../../service/apiClient";
import useAuth from "../../hooks/useAuth";
import jwtDecode from "jwt-decode";
import TextInput from "../../components/form/textInput";
import {ProfileCircle} from "../../components/profileCircle";
import NumberInput from "../../components/form/numberInput";
import { validatePassword, validateEmail } from '../register'


const EditPage = () => {
    const [formData, setFormData] = useState([]);
    const { token } = useAuth();
    const { userId } = jwtDecode(token) 
    const [formValues, setFormValues] = useState({
        photo: "",
        firstName: "",
        lastName: "",
        username: "",
        githubUsername: "",
        email: "",
        mobile: "",
        password: "",
        bio: "",
    });
    const [showPasswordFields, setShowPasswordFields] = useState(false);
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");


    useEffect(() => {
        async function fetchUser() {
          try {
            const data = await getUserById(userId);
            setFormData(data);
      
            const profile = data.profile || {};
            setFormValues({
              firstName: profile.firstName || "",
              lastName: profile.lastName || "",
              username: profile.username || "",
              githubUsername: profile.githubUrl || "",
              email: data.email || "",
              mobile: profile.mobile || "",
              password: "",
              bio: profile.bio || "",
            });
          } catch (error) {
            console.error("Error in EditPage", error);
          }
        }
        fetchUser();
    }, [userId]);
      

    if (!formData || !formData.profile) {
        return <div>
        <div className="">
            <h3>Loading...</h3>
            <div className="loadingscreen-loader">
            <span></span>
            </div>
        </div>
        </div>
    }

    const firstName = formData.profile.firstName;
    const lastName = formData.profile.lastName;
    const name = `${firstName} ${lastName}`;

    const getReadableRole = (role) => {
        switch (role) {
          case 'ROLE_STUDENT':
            return 'Student';
          case 'ROLE_TEACHER':
            return 'Teacher';
          case 'ROLE_ADMIN': 
            return 'Administrator'  
          default:
            return role; 
        }
    };
    
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormValues((prev) => ({
        ...prev,
        [name]: value,
      }));
    };

    const togglePasswordFields = () => {
      setShowPasswordFields((prev) => !prev);
    };

    const handleSave = async (e) => {
      e.preventDefault();
    
      if (!validateEmail(formValues.email)) {
        return;
      }

      if (showPasswordFields) {
        const isValidFormat = validatePassword(newPassword);
        if (!isValidFormat) return; 
    
        if (newPassword !== confirmPassword) {
          alert("The passwords do not match.");
          return;
        }
      }
    
      const updatedValues = {
        ...formValues,
        password: showPasswordFields ? newPassword : "",
      };
    
      try {
        await updateUserProfile(userId, updatedValues);
        alert("Profile is updated!");
      } catch (error) {
        console.error("Error by update:", error);
        alert("Something went wrong by the update.");
      }
    };
  
    return (
        <>
          <main>
            <h2>Profile</h2>
            <form className="edit-profile-form">
              <div className="top-bar">
                <ProfileCircle initials={name.split(" ").map((n) => n[0]).join("").toUpperCase()} /><p className="name-text">{name}</p>
              </div>
              <section className="post-interactions-container border-top"></section>
      
              <div className="row">
                <section className="section half">
                  <h2>Basic Info</h2>
                  <div className="photo-placeholder">AW</div>
                  <TextInput 
                    name="firstName" 
                    label="First Name" 
                    value={formValues.firstName || ""} 
                    onChange={handleChange} 
                    />
                  <TextInput 
                    name="lastName" 
                    label="Last Name" 
                    value={formValues.lastName || ""} 
                    onChange={handleChange}
                    />
                  <TextInput   
                    name="username" 
                    label="Username" 
                    value={formValues.username || ""} 
                    onChange={handleChange}
                    />
                  <TextInput 
                  name="githubUsername" 
                  label="Github Username" 
                  value={formValues.githubUsername || ""} 
                  onChange={handleChange}
                  /> 
                </section>
      
                <section className="section half">
                  <h2>Training Info</h2>
                  <TextInput
                    name="role"
                    label="Role"
                    readOnly={true}
                    value={formData.profile.role.name ? getReadableRole(formData.profile.role.name) : ""}
                  />
                  <TextInput
                    name="specialism"
                    label="Specialism"
                    readOnly={true}
                    value={formData?.cohort?.cohort_courses?.[0]?.name || ""}
                  />
                  <TextInput 
                    name="cohort" 
                    label="Cohort" 
                    readOnly={true} 
                    value={formData?.cohort?.id || ""} 
                    />
                  <TextInput 
                    name="startDate" 
                    label="Start Date" 
                    readOnly={true} 
                    value={formData?.profile?.startDate || ""} 
                    />
                  <TextInput 
                    name="endDate" 
                    label="End Date" 
                    readOnly={true} 
                    value={formData?.profile?.endDate || ""} 
                    />
                </section>
              </div>
      
              <div className="row">
                <section className="section half">
                  <h2>Contact Info</h2>
                  <TextInput 
                    name="email" 
                    label="Email" 
                    value={formValues.email || ""} 
                    onChange={handleChange} 
                    />
                  <NumberInput
                    onChange={handleChange}
                    value={formValues.mobile}
                    name="mobile"
                    label={'Mobile*'}
                    placeholder={'Enter mobile number'}
                    required
                    />
                  {!showPasswordFields ? (
                    <button type="button" className="change-password-button" onClick={togglePasswordFields}>
                      Change password
                    </button>
                  ) : (
                    <>
                    <TextInput
                      name="newPassword"
                      label="New password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                    />
                    <TextInput
                      name="confirmPassword"
                      label="Confirm"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    </>
                  )}
                </section>
      
                <section className="section half">
                  <h2>Bio</h2>
                  <textarea
                    className="bio-area"
                    name="bio"
                    value={formValues.bio || ""}
                    onChange={handleChange}
                    placeholder="Tell us about yourself, your professional and educational highlights to date..."
                    maxLength={300}
                  ></textarea>
                  <div className="char-count">{formValues.bio.length}/300</div>
                </section>
              </div>
      
              <div className="bottom-buttons">
                <button className="cancel">Cancel</button>
                <button className="save" onClick={handleSave}>Save</button>
              </div>
            </form>
          </main>
        </>
    );    
};

export default EditPage;

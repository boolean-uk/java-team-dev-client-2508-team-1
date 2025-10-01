import { useEffect,  useState } from "react";
import { Snackbar, SnackbarContent } from "@mui/material";
import CheckCircleIcon from "../../assets/icons/checkCircleIcon";

import "./edit.css";
import Popup from "reactjs-popup";
import imageCompression from "browser-image-compression";
import { getUserById, updateUserProfile, refreshToken } from "../../service/apiClient";
import useAuth from "../../hooks/useAuth";
import jwtDecode from "jwt-decode";
import TextInput from "../../components/form/textInput";
import Card from "../../components/card";
import { validatePassword, validateEmail } from '../register';
import LockIcon from '../../assets/icons/lockIcon'
import SimpleProfileCircle from "../../components/simpleProfileCircle";


const EditPage = () => {
  const [formData, setFormData] = useState(null);
  const { token } = useAuth();

    const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    actionLabel: null,
    onAction: null,
    type: "success",
    autoHideDuration: 3000,
  });  
  // const lastValuesBeforeDiscardRef = useRef(null);
  // const navigate = useNavigate();

  function showSnackbar({ message, actionLabel = null, onAction = null, type = "success", autoHideDuration = 3000 }) {
    setSnackbar({
      open: true,
      message,
      actionLabel,
      onAction,
      type,
      autoHideDuration,
    });
  }

  let userId;
  try {
    const decodedToken = jwtDecode(token || localStorage.getItem('token'));
    userId = decodedToken?.userId;
  } catch (error) {
    console.error('Invalid token:', error);
    userId = null;
  }

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
          photo: profile.photo || "",
          firstName: profile.firstName || "",
          lastName: profile.lastName || "",
          username: profile.username || "",
          githubUsername: profile.githubUrl || "",
          email: data.email || "",
          mobile: profile.mobile || "",
          password: data.password || "",
          bio: profile.bio || "",
        });
      } catch (error) {
        console.error("Error in EditPage", error);
      }
    }
    if (userId) fetchUser();
  }, [userId]);

  if (!formData || !formData.profile) {
    return (
      <div>
        <h3>Loading...</h3>
        <div className="loadingscreen-loader"><span></span></div>
      </div>
    );
  }

  const firstName = formData.profile.firstName;
  const lastName = formData.profile.lastName;
  const name = `${firstName} ${lastName}`;
  const initials = name.split(" ").map(n => n[0]).join("").toUpperCase();

  const getReadableRole = (role) => {
    switch (role) {
      case 'ROLE_STUDENT': return 'Student';
      case 'ROLE_TEACHER': return 'Teacher';
      case 'ROLE_ADMIN': return 'Administrator';
      default: return role;
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const togglePasswordFields = () => setShowPasswordFields(prev => !prev);

  const handleFileCompressionAndSet = async (file, closePopup) => {
    if (!file) return;
    if (!file.type.startsWith('image/')) { alert('Not an image'); return; }

    const options = { maxSizeMB: 0.5, maxWidthOrHeight: 1024, useWebWorker: true, initialQuality: 0.8 };

    try {
      const compressedFile = await imageCompression(file, options);
      if (compressedFile.size > 2 * 1024 * 1024) {
        alert('Bildet er fortsatt for stort etter komprimering. Velg et mindre bilde.');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        const dataUrl = reader.result;
        setFormValues(prev => ({ ...prev, photo: dataUrl }));
        if (typeof closePopup === 'function') closePopup();
      };
      reader.readAsDataURL(compressedFile);
    } catch (err) {
      console.error('Compression error', err);
      alert('Kunne ikke komprimere bildet');
    }
  };

  const resetFormToSaved = () => {
    if (!formData) return;
    const profile = formData.profile || {};
    setFormValues({
      photo: profile.photo || "", 
      firstName: profile.firstName || "",
      lastName: profile.lastName || "",
      username: profile.username || "",
      githubUsername: profile.githubUrl || "",
      email: formData.email || "",
      mobile: profile.mobile || "",
      password: "",
      bio: profile.bio || "",
    });
    setNewPassword("");
    setConfirmPassword("");
    setShowPasswordFields(false);

      showSnackbar({

      message: "Changes discarded",
      actionLabel: "Edit",
      onAction: () => { const el = document.querySelector("input, textarea, select"); if (el) el.focus(); },
      type: "success",
      autoHideDuration: 3000,
    });
  
    
  };

  const handleSave = async (e) => {
    e.preventDefault();

    if (!validateEmail(formValues.email)) return;

    if (showPasswordFields) {
      const isValidFormat = validatePassword(newPassword);
      if (!isValidFormat) return;
      if (newPassword !== confirmPassword) {
        alert("The passwords do not match.");
        return;
      }
    };

    const updatedValues = { ...formValues, password: showPasswordFields ? newPassword : "" };

    try {
      const refreshed = await updateUserProfile(userId, updatedValues);
      setFormData(refreshed);
        showSnackbar({

        message: "Profile saved",
        actionLabel: "Edit",
        onAction: () => { const el = document.querySelector("input, textarea, select"); if (el) el.focus(); },
        type: "success",
      });

      const refreshedProfile = refreshed.profile || {};
      
      // Update localStorage with new photo
      if (refreshedProfile.photo) {
        localStorage.setItem('userPhoto', refreshedProfile.photo);
      }

      // Refresh the token to get updated user information
      try {
        const refreshResponse = await refreshToken();
        if (refreshResponse.token) {
          localStorage.setItem('token', refreshResponse.token);
        }
      } catch (tokenError) {
        console.error('Token refresh failed:', tokenError);
      }
      
      setFormValues({
        photo: refreshedProfile.photo || "", 
        firstName: refreshedProfile.firstName || "",
        lastName: refreshedProfile.lastName || "",
        username: refreshedProfile.username || "",
        githubUsername: refreshedProfile.githubUrl || "",
        email: refreshed.email || "",
        mobile: refreshedProfile.mobile || "",
        bio: refreshedProfile.bio || "",
      });
    } catch (error) {
      console.error("Error by update:", error);
      alert("Something went wrong by the update.");
    }
  };

  return (
    <>
      <main>
        <h2>Profile</h2>
        <form className="edit-profile-form" onSubmit={handleSave}>
          <div className="top-bar">
            <SimpleProfileCircle
              photo={localStorage.getItem("userPhoto")}
              initials={initials}
            />
            <p className="name-text">{name}</p>
          </div>
          <section className="post-interactions-container border-top"></section>


          <div className="row">
            <section className="section half">
              <h2>Basic Info</h2>

              <div className="photo-row">
                
                  {(formValues.photo || formData.profile.photo) ? (
                  <>
                  <div className="photo-wrapper">
                  <img
                    src={formValues.photo || formData.profile.photo || <SimpleProfileCircle />}
                    className="profile-photo"
                  /></div>
                </>
                ) : (
                    <SimpleProfileCircle initials={initials} />
                  )}
                

                <div className="photo-actions">
                  <Popup
                    trigger={
                      <button type="button" className="addHeadshot">
                        {formValues.photo || formData.profile.photo ? "Replace headshot" : "Add headshot"}
                      </button>
                    }
                    modal
                  >
                  {close => (
                    <Card>
                      <div className="welcome-form-popup">
                        <h3 className="welcome-form-popup-wrapper">
                          {formValues.photo || formData.profile.photo ? "Replace Photo" : "Upload Photo"}
                        </h3>
                          <p className="text-blue1">Choose a file to upload your headshot</p>

                          <div className="welcome-form-popup-buttons">
                            <button className="offwhite" onClick={() => close()}>Cancel</button>

                            <input
                              id="edit-popup-file"
                              type="file"
                              accept="image/*"
                              style={{ display: "none" }}
                              onChange={(e) => handleFileCompressionAndSet(e.target.files?.[0], close)}
                            />
                          
                            <label htmlFor="edit-popup-file" className="upload-label">Upload photo</label>
                          </div>
                      </div>
                    </Card>
                  )}
                </Popup>
              </div>
            </div>
                  <br></br><br></br>
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
              <br></br>
              <TextInput 
                name="role" 
                label="Role" 
                readOnly value={formData.profile.role.name ? getReadableRole(formData.profile.role.name) : ""} 
                icon={<LockIcon />}
                iconRight={true}
              />
              <TextInput 
                name="specialism" 
                label="Specialism" 
                readOnly value={formData?.profile?.cohort?.course?.name || ""} 
                icon={<LockIcon />}
                iconRight={true}
              />
              {formData?.profile?.role?.name !== "ROLE_TEACHER" && (
                <>
                <TextInput 
                  name="cohort" 
                  label="Cohort" 
                  readOnly value={"Cohort " + formData?.profile?.cohort?.id || ""} 
                  icon={<LockIcon />}
                  iconRight={true}
                />
                <TextInput 
                  name="startDate" 
                  label="Start Date" 
                  readOnly value={formData?.profile?.cohort?.course?.startDate || ""} 
                  icon={<LockIcon />}
                  iconRight={true}
                />
                <TextInput 
                  name="endDate" 
                  label="End Date" 
                  readOnly value={formData?.profile?.cohort?.course?.endDate || ""} 
                  icon={<LockIcon />}
                  iconRight={true}
                />
                </>
              )}
              {formData?.profile?.role?.name === "ROLE_TEACHER" && (
                <TextInput 
                  name="jobTitle"
                  label="Job title" 
                  readOnly value={formData?.profile?.cohort?.course?.name + " Instructor" || ""} 
                  icon={<LockIcon />}
                />
              )}
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
              <TextInput 
                name="mobile" 
                label="Mobile" 
                value={formValues.mobile || ""} 
                onChange={handleChange} 
              />
              {!showPasswordFields ? (
                <button 
                  type="button" 
                  className="change-password-button" 
                  onClick={togglePasswordFields}>
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
                    label="Confirm password" 
                    value={confirmPassword} 
                    onChange={(e) => setConfirmPassword(e.target.value)} 
                  />
                </>
              )}
            </section>

            <section className="section half">
                  <h2>Bio</h2>
                  <br></br>
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
            <button type="button" className="cancel" onClick={resetFormToSaved}>Cancel</button>
            <button type="submit" className="save">Save</button>
          </div>
            <Snackbar

            open={snackbar.open}
            autoHideDuration={snackbar.autoHideDuration}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
          >
            <SnackbarContent
                sx={{
                backgroundColor: '#000046',
                color: '#fff',
                width: '310px',
                height: '70px',
                padding: '4px 16px',
                borderRadius: '8px',
                boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.25)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '20px',
                }}
                message={
                <span style={{ color: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <CheckCircleIcon style={{ marginRight: '8px', color: '#FFFFFF' }} />
                    {snackbar.message}  
                </span>
                }
            />
          </Snackbar>
        </form>
      </main>
    </>
  );
};

export default EditPage;






import { useEffect, useState } from "react";
import "./edit.css";
import Popup from "reactjs-popup";
import imageCompression from "browser-image-compression";
import { getUserById, updateUserProfile } from "../../service/apiClient";
import useAuth from "../../hooks/useAuth";
import jwtDecode from "jwt-decode";
import TextInput from "../../components/form/textInput";
import ProfileCircle from "../../components/profileCircle";
import Card from "../../components/card";
import { validatePassword, validateEmail } from '../register';

const EditPage = () => {
  const [formData, setFormData] = useState(null);
  const { token } = useAuth();

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
          password: "",
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
    alert("The changes are discarded")
    setNewPassword("");
    setConfirmPassword("");
    setShowPasswordFields(false);
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
    }

    const updatedValues = { ...formValues, password: showPasswordFields ? newPassword : "" };

    try {
      await updateUserProfile(userId, updatedValues);
      alert("Profile is updated!");
      const refreshed = await getUserById(userId);
      setFormData(refreshed);
      setFormValues(prev => ({ ...prev, photo: refreshed.profile.photo || prev.photo }));
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
            <ProfileCircle initials={name.split(" ").map(n => n[0]).join("").toUpperCase()} />
            <p className="name-text">{name}</p>
          </div>
          <section className="post-interactions-container border-top"></section>


          <div className="row">
            <section className="section half">
              <h2>Basic Info</h2>

              <div className="photo-row">
                <div className="photo-wrapper">
                  <img
                    src={formValues.photo || formData.profile.photo || ""}
                    className="profile-photo"
                  />
                </div>

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
            <br></br>

              <TextInput name="firstName" label="First Name" value={formValues.firstName || ""} onChange={handleChange} />
              <TextInput name="lastName" label="Last Name" value={formValues.lastName || ""} onChange={handleChange} />
              <TextInput name="username" label="Username" value={formValues.username || ""} onChange={handleChange} />
              <TextInput name="githubUsername" label="Github Username" value={formValues.githubUsername || ""} onChange={handleChange} />
            </section>

            <section className="section half">
              <h2>Training Info</h2>
              <TextInput name="role" label="Role" readOnly value={formData.profile.role.name ? getReadableRole(formData.profile.role.name) : ""} />
              <TextInput name="specialism" label="Specialism" readOnly value={formData?.cohort?.cohort_courses?.[0]?.name || ""} />
              <TextInput name="cohort" label="Cohort" readOnly value={formData?.cohort?.id || ""} />
              <TextInput name="startDate" label="Start Date" readOnly value={formData?.profile?.startDate || ""} />
              <TextInput name="endDate" label="End Date" readOnly value={formData?.profile?.endDate || ""} />
            </section>
          </div>

          <div className="row">
            <section className="section half">
              <h2>Contact Info</h2>
              <TextInput name="email" label="Email" value={formValues.email || ""} onChange={handleChange} />
              <TextInput name="mobile" label="Mobile" value={formValues.mobile || ""} onChange={handleChange} />
              {!showPasswordFields ? (
                <button type="button" className="change-password-button" onClick={togglePasswordFields}>Change password</button>
              ) : (
                <>
                  <TextInput name="newPassword" label="New password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
                  <TextInput name="confirmPassword" label="Confirm password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
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
            <button type="button" className="cancel" onClick={resetFormToSaved}>
              Cancel
            </button>

            <button type="submit" className="save">
              Save
            </button>
          </div>
        </form>
      </main>
    </>
  );
};

export default EditPage;

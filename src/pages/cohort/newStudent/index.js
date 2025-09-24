import { useState } from 'react';
import NewStudentStepOne from './newStudentStepOne';
import NewStudentStepTwo from './newStudentStepTwo';
import NewStudentStepFour from './newStudentStepFour';
import './style.css';
import NewStudentStepThree from './newStudentStepThree';
import Stepper from '../../../components/stepper';
import useAuth from '../../../hooks/useAuth';
import { useFormData } from '../../../context/form';

const NewStudent = () => {
  const { onCreateNewStudent } = useAuth();
  const { formData } = useFormData();

  const [profile, setProfile] = useState({
    first_name: '',
    last_name: '',
    username: '',
    github_username: '',
    email: '', 
    mobile: '',
    password: '',
    bio: '',
    role: 'ROLE_STUDENT',
    specialism: '',
    cohort: '',
    start_date: '',
    end_date: '',
    photo: ''
  });

  const onChange = (event) => {
    const { name, value } = event.target;
    
    setProfile({
      ...profile,
      [name]: value
    });
    console.log("Profile: ", profile);

  };

  const onComplete = () => {
    onCreateNewStudent(
      profile.first_name,
      profile.last_name,
      profile.username,
      profile.github_username,
      profile.email,
      profile.mobile,
      profile.password,
      profile.bio,
      profile.role,
      profile.specialism,
      profile.cohort,
      profile.start_date,
      profile.end_date,
      profile.photo
    );
  };


  const handleFileChange = (event, close) => {
		
    const file = event.target.files[0];
        if (file) {
          const url = URL.createObjectURL(file)
          setProfile(prevProfile => ({
            ...prevProfile,
            photo: url
          }));
          close()
      }
    }

  return (
    <main className="welcome">
      <Stepper data={profile} header={<WelcomeHeader />} onComplete={onComplete}>
        <NewStudentStepOne data={profile} setData={onChange} handleFileChange={handleFileChange}/>
        <NewStudentStepTwo data={profile} setData={onChange} formData={formData}/>
        <NewStudentStepThree data={profile} setData={onChange} setProfile={setProfile} />
        <NewStudentStepFour data={profile} setData={onChange} />
      </Stepper>
    </main>
  );
};

const WelcomeHeader = () => {
  return (
    <div className="welcome-cardheader">
      <h2>Add new student</h2>
      <p className="text-blue1">Create a new student profile</p>
    </div>
  );
};

export default NewStudent;

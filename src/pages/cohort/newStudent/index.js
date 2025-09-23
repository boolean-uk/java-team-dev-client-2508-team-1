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
    // userId: '',
    first_name: '',
    last_name: '',
    username: '',
    github_username: '',
    email: '', 
    mobile: '',
    password: '',
    bio: '',
    role: 'ROLE_STUDENT',
    specialism: 'Software Development',
    cohort: 1,
    start_date: '2025-09-14',
    end_date: '2025-10-15',
    photo: ''
  });

  const onChange = (event) => {
    const { name, value } = event.target;

    setProfile({
      ...profile,
      [name]: value
    });
  };

  const onComplete = () => {
    onCreateNewStudent(
      // profile.userId,
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
      <div className="welcome-titleblock">
        <h1 className="h2">Welcome to Cohort Manager</h1>
        <p className="text-blue1">Create your profile to get started</p>
      </div>

      <Stepper data={profile} header={<WelcomeHeader />} onComplete={onComplete}>
        <NewStudentStepOne data={profile} setData={onChange} handleFileChange={handleFileChange}/>
        <NewStudentStepTwo data={profile} setData={onChange} formData={formData}/>
        <NewStudentStepThree data={profile} setData={onChange} />
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

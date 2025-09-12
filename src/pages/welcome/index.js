import { useState } from 'react';
import Stepper from '../../components/stepper';
import useAuth from '../../hooks/useAuth';
import StepOne from './stepOne';
import StepTwo from './stepTwo';
import StepFour from './stepFour';
import './style.css';
import { useFormData } from '../../context/form';
import StepThree from './stepThree';

const Welcome = () => {
  const { onCreateProfile } = useAuth();
  const { formData } = useFormData();

  const [profile, setProfile] = useState({
    first_name: '',
    last_name: '',
    username: '',
    github_username: '',
    mobile: '',
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
    onCreateProfile(
      profile.first_name,
      profile.last_name,
      profile.username,
      profile.mobile,
      profile.github_username,
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
    console.log("profile:" + profile.photo)
      }
    }




  return (
    <main className="welcome">
      <div className="welcome-titleblock">
        <h1 className="h2">Welcome to Cohort Manager</h1>
        <p className="text-blue1">Create your profile to get started</p>
      </div>

      <Stepper data={profile} header={<WelcomeHeader />} onComplete={onComplete}>
        <StepOne data={profile} setData={onChange} handleFileChange={handleFileChange}/>
        <StepTwo data={profile} setData={onChange} formData={formData}/>
        <StepThree data={profile} setData={onChange} />
        <StepFour data={profile} setData={onChange} />
      </Stepper>
    </main>
  );
};

const WelcomeHeader = () => {
  return (
    <div className="welcome-cardheader">
      <h2>Create profile</h2>
      <p className="text-blue1">Tell us about yourself to create your profile</p>
    </div>
  );
};

export default Welcome;

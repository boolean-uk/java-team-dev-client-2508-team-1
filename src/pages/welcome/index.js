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
    firstName: '',
    lastName: '',
    username: '',
    githubUsername: '',
    mobile: '',
    bio: '',
    role: '',
    specialism: '',
    cohort: '',
    startDate: '',
    endDate: '',
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
      profile.firstName,
      profile.lastName,
      profile.username,
      profile.mobile,
      profile.githubUsername,
      profile.bio,
      profile.role,
      profile.specialism,
      profile.cohort,
      profile.startDate,
      profile.endDate,
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

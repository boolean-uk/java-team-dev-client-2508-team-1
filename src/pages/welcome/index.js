import { useState } from 'react';
import Stepper from '../../components/stepper';
import useAuth from '../../hooks/useAuth';
import StepOne from './stepOne';
import StepTwo from './stepTwo';
import StepFour from './stepFour';
import './style.css';
import { useFormData } from '../../context/form';
import StepThree from './stepThree';
import imageCompression from 'browser-image-compression';

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
  };

  const onComplete = () => {
    onCreateProfile(
      profile.first_name,
      profile.last_name,
      profile.username,
      profile.github_username,
      profile.mobile,
      profile.bio,
      profile.role,
      profile.specialism,
      profile.cohort,
      profile.start_date,
      profile.end_date,
      profile.photo
    );
  };
		
  const handleFileChange = async (event, close) => {
    const file = event.target.files[0];
    if (!file) return;
  
    if (!file.type.startsWith('image/')) {
      alert('Not an image');
      return;
    }
  
    const options = {
      maxSizeMB: 0.5,          
      maxWidthOrHeight: 1024,  
      useWebWorker: true,      
      initialQuality: 0.8      
    };
  
    try {
      const compressedFile = await imageCompression(file, options);
  
      if (compressedFile.size > 2 * 1024 * 1024) {
        alert('Bildet er fortsatt for stort etter komprimering. Velg et mindre bilde.');
        return;
      }
  
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfile(prev => ({ ...prev, photo: reader.result }));
        if (typeof close === 'function') close();
      };
      reader.readAsDataURL(compressedFile);

    } catch (err) {
      console.error('Compression error', err);
      alert('Kunne ikke komprimere bildet. Prøv et annet bilde.');
    }
  };

  return (
    <main className="welcome">
      <div className="welcome-titleblock">
        <h1 className="h2">Welcome to Cohort Manager</h1>
        <p className="text-blue1">Create your profile to get started</p>
      </div>

      <Stepper data={profile} header={<WelcomeHeader />} onComplete={onComplete}>
        <StepOne data={profile} setData={onChange} handleFileChange={handleFileChange}/>
        <StepTwo data={profile} setData={onChange} formData={formData}/>
        <StepThree data={profile} setData={onChange} setProfile={setProfile}/>
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

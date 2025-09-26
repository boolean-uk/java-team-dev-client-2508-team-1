import Steps from './steps';
import Card from '../card';
import Button from '../button';
import './style.css';
import { useState } from 'react';
import CheckCircleIcon from '../../assets/icons/checkCircleIcon';
import { Snackbar, SnackbarContent } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Stepper = ({ header, children, onComplete, data,message }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const navigate = useNavigate()

  const onBackClick = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const onNextClick = () => {
    if (currentStep === children.length - 1) {
      onComplete();

      setSnackbarOpen(true)
      if(snackbarOpen) {
      setTimeout(() => {
        navigate('/cohorts');
      }, 2000);
    }
      return;
    }

    setCurrentStep(currentStep + 1);
  };

  const validateName = (data) => {
    if(!data) {
      alert("OBSS!!! Please write first name and last name")
      return false
    } else {
      return true
    }
  }

  const validateUsername = (data) => {
    if(data.username.length < 7) {
      alert("Username is too short. Input must be at least 7 characters long")
      return false
    } else {
      return true
    }
  }

   const validateMobile = (data) => {
    if(data.length < 8) {
      alert("Mobile number is too short. Input must be at least 8 characters long")
      return false
    } else {
      return true
    }
  }

  return (
    <Card>
      {header}
      <div className="steps-container">
        <Steps maxSteps={children.length} currentStep={currentStep} />
      </div>

      {children[currentStep]}

      <div className="stepper-buttons">
        <Button text="Back" classes="offwhite" onClick={onBackClick} />
        {currentStep === 0 ? 
        (<Button
          text={currentStep === children.length - 1 ? 'Submit' : 'Next'}
          classes="blue"
          onClick={() => {
              if (validateName(data.first_name) && validateName(data.last_name) &&validateUsername(data)) {
                onNextClick();
              }
            }}
        />) : 
        currentStep === 1 ? 
        (<Button
          text={currentStep === children.length - 1 ? 'Submit' : 'Next'}
          classes="blue"
          onClick={() => {
              if (validateMobile(data.mobile)) {
                onNextClick();
              }
            }}
        />) : 
        (
        <><Button
          text={currentStep === children.length - 1 ? 'Submit' : 'Next'}
          classes="blue"
          onClick={onNextClick}/>
          
           <Snackbar open={snackbarOpen} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }} 
            autoHideDuration={3000}
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
                    {message}
                </span>
                }
            />
            </Snackbar>
         </> ) }
      </div>
    </Card>
  );
};

export default Stepper;
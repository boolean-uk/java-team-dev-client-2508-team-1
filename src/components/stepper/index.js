import Steps from './steps';
import Card from '../card';
import Button from '../button';
import './style.css';
import { useState } from 'react';

const Stepper = ({ header, children, onComplete, data }) => {
  const [currentStep, setCurrentStep] = useState(0);

  const onBackClick = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const onNextClick = () => {
    if (currentStep === children.length - 1) {
      onComplete();
      return;
    }

    setCurrentStep(currentStep + 1);
  };

  const validateName = (data) => {
    if(!data) {
      alert("OBSS!!! Please write first_name and last_name")
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
        (<Button
          text={currentStep === children.length - 1 ? 'Submit' : 'Next'}
          classes="blue"
          onClick={onNextClick}
        />) }
      </div>
    </Card>
  );
};

export default Stepper;
import { useState } from "react";


const StepperCohort = ({ header, children, onComplete, data }) => {
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


  return (
    <div className="add-cohort-card">
      {header}

      {children[currentStep]}
        <div className="buttons-at-bottom">
            <button className="offwhite" onClick={onBackClick}>Cancel</button>
            <button className="blue"  onClick={onNextClick}>Next</button>
        </div>
    </div>
  );
};

export default StepperCohort;
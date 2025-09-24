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

  const onSkipClick  = () => {
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
        <div>
        {currentStep === 0 ? 
        (<div className="buttons-at-bottom">
        <button className="offwhite" onClick={onBackClick}>Cancel</button>
        <button className="blue" onClick={onNextClick}>Next</button>
          </div>
        ) : 
        currentStep === 1 ? (
        <div className="three-buttons">
                <button className="offwhite" onClick={onBackClick}>Back</button>
                <button className="offwhite" onClick={onSkipClick}>Skip</button>
            <div>
                <button className="blue" onClick={onNextClick}>Add students</button>
            </div>
          </div>
        ) : (
           <div className="buttons-at-bottom">
        <button className="offwhite" onClick={onBackClick}>Back</button>
        <button className="blue" onClick={onNextClick}>Add cohort</button>
          </div>
        )
         }
        </div>
    </div>
  );
};

export default StepperCohort;
import {  Snackbar, SnackbarContent } from "@mui/material";
import { useState } from "react";
import CheckCircleIcon from "../../../assets/icons/checkCircleIcon";
import { patch, post } from "../../../service/apiClient";
import { useNavigate } from "react-router-dom";


const StepperCohort = ({ header, children, cohortName, startDa, endDa, selectedCourse, selectedStudents, setSelectedCourse,setEndDate,setStartDate,setCohortName }) => {
    const [currentStep, setCurrentStep] = useState(0);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const navigate = useNavigate()
    


  const onBackClick = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const onNextClick = () => {
    setCurrentStep(currentStep + 1);
   
  };

  const onSkipClick  = () => {
    setCurrentStep(currentStep + 1);
  };

  const onCancel = () => {
    setSelectedCourse("")
    setEndDate("")
    setStartDate("")
    setCohortName("")
    navigate(-1)


  }

  const onComplete = () =>{
    async function addNewCohort() {
        try {
            const response = await post("cohorts", 
                {
                    name: cohortName,
                    courseId: selectedCourse.id,
                    startDate: startDa,
                    endDate: endDa
                 });
            console.log(response)

            const studentIds = selectedStudents.map(student => student.id);
            const response2 = await patch(`cohorts/${response.id}`, 
                {
                    name: cohortName,
                    courseId: selectedCourse.id,
                    startDate: startDa,
                    endDate: endDa,
                    profileIds: studentIds
                 });
            console.log(response2)
        } catch (error) {
            console.error("Error adding new cohort:", error);
        }
    } addNewCohort()

    setSnackbarOpen(true)
     setTimeout(()=> {
        navigate("/cohorts")
    }, 3000)
  }

  return (
    <div className="add-cohort-card">
      {header}

      {children[currentStep]}
        <div>
        {currentStep === 0 ? 
        (<div className="buttons-at-bottom">
        <button className="offwhite" onClick={onCancel}>Cancel</button>
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
        <button className="blue" onClick={onComplete}>Add cohort</button>

          <Snackbar open={snackbarOpen} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }} 
  autoHideDuration={2000}
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
                   New cohort created
                </span>
                }
            />
            </Snackbar>

          </div>
        )
         }
        </div>
    </div>
  );
};

export default StepperCohort;
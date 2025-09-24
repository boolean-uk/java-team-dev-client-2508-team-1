import Form from '../../../../components/form';

const NewStudentStepFour = ({ data, setData }) => {
  return (
    
    <>
     <div className="welcome-formheader">
        <h3 className='bio-heading'>Bio</h3>
      </div>
      <Form className="welcome-form">
        <div className="welcome-form-inputs">
          <textarea 
          name="bio" 
          value={data.bio} 
          onChange={setData} 
          placeholder='Tell us about yourself, your professional and educational highlights to date...' 
          maxLength={300}></textarea>
         <div 
         className={`welcome-counter ${data.bio.length === 300 ? 'limit-reached' : ''}`}>
          {data.bio.length}/{300} 
      </div>
        </div>
      </Form>
    </>
  );
};

export default NewStudentStepFour

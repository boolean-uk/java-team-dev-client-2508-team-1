
import Form from '../../../../components/form';
import TextInput from '../../../../components/form/textInput';


const StepOne = ({ data, setData, handleFileChange }) => {


  return (
    <>
      <div className="welcome-formheader">
        <h3>Basic info</h3>
      </div>
      <Form className="welcome-form">

        <div className="welcome-form-inputs">
          <TextInput
            onChange={setData}
            value={data.first_name}
            name="first_name"
            label={'First Name*'}
            placeholder={'First Name'}
            required
          />
          <TextInput 
            onChange={setData} 
            value={data.last_name} 
            name="last_name" 
            label={'Last Name*'} 
            placeholder={'Last Name'}
            required 
          />
           <TextInput
            onChange={setData}
            value={data.username}
            name="username"
            label={'Username*'}
            placeholder={'Username'}
            required
          />
          <TextInput
            onChange={setData}
            value={data.github_username}
            name="github_username"
            label={'GitHub Username'}
            placeholder={'GitHub Username'}
          />
          <p className="text-blue1">*Required</p>
        </div>
      </Form>
    </>
  );
};

export default StepOne;

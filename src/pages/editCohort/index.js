import TextInput from "../../components/form/textInput";
import './style.css';

import Form from '../../components/form';
const EditCohort = () =>{


  return(<>


      <Form className="welcome-form">

        <div className="welcome-form-inputs">
          <TextInput
            name="first_name"
            label={'First Name*'}
            placeholder={'First Name'}
            required
          />
          <TextInput 
          name="last_name" 
          label={'Last Name*'} 
          placeholder={'Last Name'}
          required />
           <TextInput
            name="username"
            label={'Username*'}
            placeholder={'Username'}
            required
          />
          <TextInput
            name="github_username"
            label={'GitHub Username'}
            placeholder={'GitHub Username'}
          />
          <p className="text-blue1">*Required</p>
        </div>
        </Form>

  </>)

}

export default EditCohort;


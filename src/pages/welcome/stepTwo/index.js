
import Form from '../../../components/form';
import NumberInput from '../../../components/form/numberInput';
import TextInput from '../../../components/form/textInput';

const StepTwo = ({ data, setData }) => {
  return (
    <>
      <div className="welcome-formheader">
        <h3>Basic info</h3>
      </div>
      <Form className="welcome-form">
        <div className="welcome-form-inputs">
           <TextInput
            onChange={setData}
            value={data.username}
            name="username"
            label={'Username*'}
            placeholder={'Enter username'}
            required
          />
          <TextInput
            onChange={setData}
            value={data.githubUsername}
            name="githubUsername"
            label={'GitHub Username'}
            placeholder={'Enter GitHub username'}
          />
           <NumberInput
            onChange={setData}
            value={data.mobile}
            name="mobile"
            label={'Mobile*'}
            placeholder={'Enter mobile number'}
            required
          />
          <p className="text-blue1">*Required</p>
        </div>
      </Form>
    </>
  );
};

export default StepTwo;


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
            value={data.email}
            name="email"
            label={'Email*'}
            placeholder={'Email'}
            required
          />
           <NumberInput
            onChange={setData}
            value={data.mobile}
            name="mobile"
            label={'Mobile*'}
            placeholder={'Enter mobile number'}
            required
          />
            <TextInput
            onChange={setData}
            value={data.password}
            name="password"
            label={'Password*'}
            placeholder={'Password'}
            required
            type={"password"}
          />

          <p className="text-blue1">*Required</p>
        </div>
      </Form>
    </>
  );
};

export default StepTwo;

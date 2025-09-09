
import Form from '../../../components/form';
import NumberInput from '../../../components/form/numberInput';
import TextInput from '../../../components/form/textInput';

const StepTwo = ({ data, setData, formData }) => {
  return (
    <>
      <div className="welcome-formheader">
        <h3>Basic info</h3>
      </div>
      <Form className="welcome-form">
        <div className="welcome-form-inputs">
            <TextInput
            value={formData.email}
            name="email"
            label={'Email*'}
            placeholder={formData.email}
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
              value={formData.password}
              placeholder={formData.password}
              name="password"
              label={'Password *'}
              type={'password'}
            />
          {console.log(formData.password)}

          <p className="text-blue1">*Required</p>
        </div>
      </Form>
    </>
  );
};

export default StepTwo;
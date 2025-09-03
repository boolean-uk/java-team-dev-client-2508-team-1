import { useState } from 'react';
import Button from '../../components/button';
import TextInput from '../../components/form/textInput';
import useAuth from '../../hooks/useAuth';
import CredentialsCard from '../../components/credentials';
import './register.css';

const Register = () => {
  const { onRegister } = useAuth();
  const [formData, setFormData] = useState({ email: '', password: '' });

  const onChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateEmail = (email) => {
    const mailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (email.match(mailFormat)) {
      return true; // return true if email is in valid format
    } 
    else {
      alert("You have entered an invalid email address"); // generic error message for now, needs refactoring
      return false;
    }

    console.log(onRegister)
  }  

  const validatePassword = (password) => {
    const passwordFormat = /^(?=.*?[A-Z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
    if (password.match(passwordFormat)) {
      return true; 
    } 
    else {
      alert("Your password is not in the right format"); // generic error message for now, needs refactoring
      return false;
    }
  } 

  return (
    <div className="bg-blue register credentialpage">
      <CredentialsCard
        title="Register"
        socialLinksTitle="Or sign up with"
        altButtonTitle="Already a user?"
        altButtonLink="/login"
        altButtonText="Log in"
      >
        <div className="register-form">
          <form>
            <TextInput
              value={formData.email}
              onChange={onChange}
              type="email"
              name="email"
              label={'Email *'}
              required
            />
            <TextInput
              value={formData.password}
              onChange={onChange}
              name="password"
              label={'Password *'}
              type={'password'}
              required
            />
          </form>
          <Button
            text="Sign up"
            onClick={() => {
              console.log(formData);
              if (validateEmail(formData.email) && validatePassword(formData.password)) {
                onRegister(formData.email, formData.password);
              }
            }}
            classes="green width-full"
          />
        </div>
      </CredentialsCard>
    </div>
  );
};

export default Register;

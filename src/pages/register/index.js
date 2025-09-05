import { useState } from 'react';
import Button from '../../components/button';
import TextInput from '../../components/form/textInput';
import useAuth from '../../hooks/useAuth';
import CredentialsCard from '../../components/credentials';
import './register.css';
import ReactPasswordChecklist from 'react-password-checklist';

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
      return true; 
    } 
    else {
      alert("You have entered an invalid email address");
      return false;
    }

  }  

  const validatePassword = (password) => {
    const passwordFormat = /^(?=.*?[A-Z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
    if (password.match(passwordFormat)) {
      return true; 
    } 
    else {
      alert("Your password is not in the right format"); 
      return false;
    }
  } 
  
  const checkEmailExists = async (email) => {
    try {
      const response = await fetch('/api/check-email', { 
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await response.json();
      return data.exists; 
    }
    catch (error) {
      return true; 
    }
  };

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
            <ReactPasswordChecklist
              rules={["minLength", "specialChar", "number", "capital"]}
              minLength={8}
              value = {formData.password}
              messages={{
                minLength: "Password must be at least 8 characters.",
                specialChar: "Password must contain at least one special character.",
                number: "Password must contain at least one digit.",
                capital: "Password must contain at least one uppercase letter."
              }} />
          </form>
          <Button
            text="Sign up"
            onClick={() => {
              if (validateEmail(formData.email) && validatePassword(formData.password)) {
                const exists = checkEmailExists(formData.email);
                if (exists) {
                  alert('Email is already registered.');
                  return;
                }
                onRegister(formData.email, formData.password);
              }}}
            classes="green width-full"
          />
        </div>
      </CredentialsCard>
    </div>
  );
};

export default Register;

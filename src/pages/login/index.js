import { useState } from 'react';
import Button from '../../components/button';
import TextInput from '../../components/form/textInput';
import useAuth from '../../hooks/useAuth';
import CredentialsCard from '../../components/credentials';
import './login.css';
import { useUserRoleData } from '../../context/userRole.';
import { get } from '../../service/apiClient';
// eslint-disable-next-line camelcase
import jwt_decode from 'jwt-decode';

const Login = () => {
  const { onLogin} = useAuth();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const {setUserRole} = useUserRoleData()

  const onChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className="bg-blue login credentialpage">
      <CredentialsCard
        title="Login"
        socialLinksTitle="Or log in with"
        altButtonTitle="Need an account?"
        altButtonLink="/register"
        altButtonText="Sign up"
      >
        <div className="login-form">
          <form>
            <TextInput value={formData.email} onChange={onChange} name="email" label={'Email *'} />
            <TextInput
              value={formData.password}
              onChange={onChange}
              name="password"
              label={'Password *'}
              type={'password'}
            />
          </form>
          <Button
            text="Log in"
            onClick={async () => {
              try {
              await onLogin(formData.email, formData.password);
              const { userId } = jwt_decode(localStorage.getItem('token'));
              const role = await get(`users/${userId}`)
              setUserRole(role.data.user.profile.role.id)
              }  
              catch (err) {
                if (err.status === 401) {
                  alert("Email or password is wrong");
                }
              }
            }}
            classes="green width-full"
          />
        </div>
      </CredentialsCard>
    </div>
  );
};

export default Login;

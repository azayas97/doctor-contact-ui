import React, { ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';

import {
  LoginForm,
  LoginFormFields
} from '../../../__generated__/graphql';

import DCSButton from '../../../components/commons/dcs-button';
import DCSField from '../../commons/dcs-field';

import AxiosClientBuilder from '../../../utils/axios-client-builder';
import { useFieldsReducer } from '../../hooks/useFormFields';

interface LoginFormProps {
  data: LoginForm;
}

type LoginResponse = {
  success: boolean;
  code: number;
  message: string;
  data: {
    data: {
      email: string;
      token: string;
      expiresIn: number;
    },
    id: string;
  }
}

type LoginRequest = {
  email: string;
  password: string;
}

const LoginFormComponent: React.FC<LoginFormProps> = ({
  data: {
    header,
    subHeader,
    fields
  }
}) => {
  const [state, dispatch] = useFieldsReducer(fields);
  const navigate = useNavigate();

  const handler = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: 'field_changed',
      id: e.target.id as keyof LoginFormFields,
      value: e.target.value
    });
  };

  const loginHandler = async () => {
    const payload: LoginRequest = {
      email: state.email.value || '',
      password: state.password.value || '',
    }

    try {
      const response = await new AxiosClientBuilder<LoginResponse>()
        .method('POST')
        .baseUrl('http://localhost:8000')
        .path('/api/v1/auth/login')
        .payload(payload)
        .useCredentials()
        .build();
        
      if (response.data.code === 200) {        
        localStorage.setItem('user_id', response.data.data.id);

        navigate('/dashboard');
      }
    } catch (err) {
      console.log('form error', err);
    }
  }

  return (
    <div className='login-form-container'>
      <h1>{header}</h1>
      <p>{subHeader}</p>
      <div className='login-form-fields'>
        <DCSField data={state.email} onChange={handler}/>
        <DCSField data={state.password} onChange={handler}/>
      </div>
      <div className='login-form-submit'>
        <DCSButton data={fields.button} onClick={loginHandler}/>
      </div>
    </div>
  )
}

export default LoginFormComponent;

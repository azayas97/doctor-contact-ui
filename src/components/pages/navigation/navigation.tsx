import React from 'react';

import { useNavigate } from 'react-router';

import AxiosClientBuilder from '../../../utils/axios-client-builder';

import './navigation.scss';

type LogoutResponse = {
  success: boolean;
  code: number;
  message: string;
}

const Navigation: React.FC = () => {
  const navigate = useNavigate();
  
  const logoutHandler = async () => {
    try {
      const response = await new AxiosClientBuilder<LogoutResponse>()
        .method('POST')
        .baseUrl('http://localhost:8000')
        .path('/api/v1/auth/logout')
        .useCredentials()
        .build();
        
      if (response.data.code === 200) {        
        localStorage.removeItem('user_id');

        navigate('/');
      }
    } catch (err) {
      console.log('logout error', err);
    }
  }

  return (
    <nav className='navigation-container'>
      <span className='navigation-link'>
        <strong>Doctor Contacts</strong>
      </span>
      <span onClick={logoutHandler} className='navigation-link'>
        <p>Logout</p>
      </span>
    </nav>
  );
}

export default Navigation;

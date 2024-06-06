import React from 'react';
import { gql, useQuery } from '@apollo/client';

import { Query } from '../../../__generated__/graphql';
import { DCSFieldFragment } from '../../commons/dcs-field/dcs-field';
import { DCSButtonFragment } from '../../commons/dcs-button/dcs-button';
import LoginFormComponent from './form';

import './login.scss';

const loginQuery = gql`
  query LoginFormQuery {
    loginFormQuery {
      __typename
      header
      subHeader
      fields {
        __typename
        email {
          ...DCSFieldFragment
        }
        password {
          ...DCSFieldFragment
        }
        button {
          ...DCSButtonFragment
        }
      }
    }
  }

  ${DCSButtonFragment}
  ${DCSFieldFragment}
`;


const LoginPage: React.FC = () => {
  const { loading, data, error } = useQuery<Query>(loginQuery);
  
  if (error) console.log('loginError', error);

  if (!data || !data.loginFormQuery || loading) return null;

  return (
    <div className='login-background'>
      <LoginFormComponent data={data.loginFormQuery} />
    </div>
  );
};

export default LoginPage;

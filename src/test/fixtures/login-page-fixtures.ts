import { gql } from "@apollo/client";
import { MockedResponse } from "@apollo/client/testing";

import {
  DcsButtonType,
  DcsFieldType,
  Query
} from '../../__generated__/graphql';
import { DCSFieldFragment } from "../../components/commons/dcs-field/dcs-field";
import { DCSButtonFragment } from "../../components/commons/dcs-button/dcs-button";

const QUERY = gql`
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

export const LoginPageApiCallSuccessful = {
  success: true,
  code: 200,
  message: '',
  data: {
    data: {
      email: 'user@email.com',
      token: 'token',
      expiresIn: 50000,
    },
    id: '1',
  }
}

export const LoginPageResponse: MockedResponse<Query> = {
  request: {
    query: QUERY
  },
  result: {
    data: {
      loginFormQuery: {
          __typename: 'LoginForm',
        header: 'Welcome to Doctor Contact Playground!',
        subHeader: 'This is just a demo of the doctor contact repos from my Github profile',
        fields: {
          __typename: 'LoginFormFields',
          email: {
            __typename: 'DCSField',
            id: 'email',
            label: 'Email',
            placeholder: 'example@email.com',
            type: DcsFieldType.Text,
            disabled: false,
            value: null,
          },
          password: {
            __typename: 'DCSField',
            id: 'password',
            label: 'Password',
            type: DcsFieldType.Password,
            disabled: false,
            value: null,
            placeholder: '',
          },
          button: {
            __typename: 'DCSButton',
            type: DcsButtonType.Primary,
            message: 'Login',
            disabled: false
          }
        }
      }
    }
  }
}
import React from 'react';

import { BrowserRouter } from 'react-router-dom';
import { MockedProvider } from '@apollo/client/testing'

import LoginPage from '../../../components/pages/login/login-page';
import {
  LoginPageResponse,
  LoginPageApiCallSuccessful
} from '../../fixtures/login-page-fixtures';

describe('<LoginPage />', () => {
  it('mounts', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(
      <MockedProvider mocks={[LoginPageResponse]}>
        <BrowserRouter>
          <LoginPage />
        </BrowserRouter>
      </MockedProvider>
    );
  });

  it('Works properly', () => {
    cy.mount(
      <MockedProvider mocks={[LoginPageResponse]}>
        <BrowserRouter>
          <LoginPage />
        </BrowserRouter>
      </MockedProvider>
    );

    cy.get('input[id=email]').type('user@email.com');
    cy.get('input[id=password]').type('password123');

    cy.intercept('POST', '/api/v1/auth/login', {
      statusCode: 200,
      body: LoginPageApiCallSuccessful
    });

    cy.get('button').click();
  })
});

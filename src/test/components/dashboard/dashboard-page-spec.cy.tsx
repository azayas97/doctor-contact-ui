import React from 'react';

import { BrowserRouter } from 'react-router-dom';
import { MockedProvider } from '@apollo/client/testing'

import Dashboard from '../../../components/pages/dashboard/dashboard-page';
import { DashboardPageResponse } from '../../fixtures/dashboard-page-fixtures';

describe('<Dashboard />', () => {
  beforeEach(() => {
    window.localStorage.setItem('user_id', '1');
  });

  it('renders', () => {
    cy.mount(
      <MockedProvider mocks={[DashboardPageResponse]}>
        <BrowserRouter>
          <Dashboard />
        </BrowserRouter>
      </MockedProvider>
    );
  });

  it('Happy path', () => {
    cy.mount(
      <MockedProvider mocks={[DashboardPageResponse]}>
        <BrowserRouter>
          <Dashboard />
        </BrowserRouter>
      </MockedProvider>
    );
    
    cy.wait(2000);
    cy.get('div[data-testid=card-C1]').find('img[alt="edit-icon"]').click();
    cy.wait(1000);
    cy.get('img[alt="close-icon"]').click();
    cy.get('div[data-testid=card-C1]').find('img[alt="edit-icon"]').click();
    cy.wait(1000);
  });
});

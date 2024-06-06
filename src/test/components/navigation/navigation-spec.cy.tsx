import React from 'react';

import { BrowserRouter } from 'react-router-dom';
import Navigation from '../../../components/pages/navigation/navigation';

describe('<Navigation />', () => {
  beforeEach(() => {
    window.localStorage.setItem('user_id', '1');
  });

  it('mounts', () => {
    cy.mount(
      <BrowserRouter>
        <Navigation />
      </BrowserRouter>
    );
  });

  it('Works properly', () => {
    cy.mount(
      <BrowserRouter>
        <Navigation />
      </BrowserRouter>
    );

    cy.intercept('POST', '/api/v1/auth/logout', {
      statusCode: 200,
    });
    cy.get('span[class="navigation-link"]').find('strong').click();
    cy.get('span[class="navigation-link"]').find('p').click();
  });
});

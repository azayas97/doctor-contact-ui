import React from 'react';

import { MockedProvider } from '@apollo/client/testing';
import { expect } from 'chai';
import sinon from 'sinon';

import DoctorSideSheetWrapper from '../../../../components/pages/sidesheets/doctors/doctor-sidesheet-wrapper';
import {
  doctorSideSheetWrapperCreateResponse, doctorSideSheetWrapperCreateResponseErrorResponse, doctorSideSheetWrapperMutationErrorResponse, doctorSideSheetWrapperMutationSuccessfulResponse
} from '../../../fixtures/doctor-sidesheet-wrapper-fixtures';

describe('<DoctorSideSheetWrapper />', () => {
  
  it('renders', () => {
    window.localStorage.setItem('user_id', '1');

    const onClose = sinon.stub();
    const onSuccess = sinon.stub();
    cy.mount(
      <MockedProvider mocks={[doctorSideSheetWrapperCreateResponse]}>
        <DoctorSideSheetWrapper onClose={onClose} onSuccess={onSuccess} data={{
          visible: true
        }} />
      </MockedProvider>
    );
  });

  it('Happy path', () => {
    window.localStorage.setItem('user_id', '1');

    const onClose = cy.stub()
    const onSuccess = cy.stub()
    
    cy.mount(
      <MockedProvider mocks={[
        doctorSideSheetWrapperCreateResponse,
        doctorSideSheetWrapperMutationSuccessfulResponse
      ]}>
        <DoctorSideSheetWrapper
          onClose={onClose}
          onSuccess={onSuccess}
          data={{
            visible: true
          }}
        />
      </MockedProvider>
    );

    cy.get('input[id=doctorName]').type('Antonio Contreras');
    cy.get('input[id=clinic]').type('Antonio\'s Clinic');
    cy.get('input[id=department]').type('Oncology');
    cy.get('input[id=phone]').type('+526625555555');
    cy.get('button').contains('Submit').click();

    cy.wait(2000);
    cy.then(() => {
      expect(onClose.called).equal(true);
      expect(onSuccess.called).equal(true);
    });
  });

  it('Error path', () => {
    window.localStorage.setItem('user_id', '2');

    const onClose = cy.stub()
    const onSuccess = cy.stub()
    
    cy.mount(
      <MockedProvider mocks={[
        doctorSideSheetWrapperCreateResponseErrorResponse,
        doctorSideSheetWrapperMutationErrorResponse
      ]}>
        <DoctorSideSheetWrapper
          onClose={onClose}
          onSuccess={onSuccess}
          data={{
            visible: true
          }}
        />
      </MockedProvider>
    );

    cy.get('input[id=doctorName]').type('Antonio Contreras');
    cy.get('input[id=clinic]').type('Antonio\'s Clinic');
    cy.get('input[id=department]').type('Oncology');
    cy.get('input[id=phone]').type('+526625555555');
    cy.get('button').contains('Submit').click();

    cy.wait(2000);
    cy.then(() => {
      expect(onClose.called).equal(false);
      expect(onSuccess.called).equal(false);
    });
  });
});


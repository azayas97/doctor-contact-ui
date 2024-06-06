import React from 'react';

import { gql, useQuery } from '@apollo/client';

import { DCSButtonFragment } from '../../../commons/dcs-button/dcs-button';
import { DCSFieldFragment } from '../../../commons/dcs-field/dcs-field';
import ErrorBanner from '../../../commons/error-banner';

import { Query } from '../../../../__generated__/graphql';
import DoctorSidesheetForm from './form';

import './doctor-sidesheet.scss';
import { DCSLoadingSpinner } from '../../../commons/dcs-loading';

const fieldsFragment = `
  fragment DoctorSideSheetFieldsFragment on DoctorSideSheetFields {
    doctorName {
      ...DCSFieldFragment
    }
    department {
      ...DCSFieldFragment
    }
    clinic {
      ...DCSFieldFragment
    }
    phone {
      ...DCSFieldFragment
    }
  }

  ${DCSFieldFragment}
`;

const query = gql`
  query DoctorDataQuery($doctorId: String, $userId: String!) {
    doctorSideSheetQuery(doctorId: $doctorId, userId: $userId) {
      __typename
      header
      subHeader
      fields {
        ...DoctorSideSheetFieldsFragment
      }
      submit {
        ...DCSButtonFragment
      }
    }
  }

  ${fieldsFragment}
  ${DCSButtonFragment}
`;

type DoctorSideSheetProps = {
  doctorId?: string;
  onClose: () => void;
  onSuccess: () => void;
}

const DoctorSideSheet: React.FC<DoctorSideSheetProps> = ({
  doctorId,
  onSuccess,
  onClose
}) => {
  const context = (!doctorId) ? 'create-doctor' : 'edit-doctor';
  const variables = {
    doctorId,
    userId: localStorage.getItem('user_id')
  };

  const { loading, data, error } = useQuery<Query>(query, {
    variables,
    fetchPolicy: 'no-cache',
  });

  if (error) {
    const errorMessage = 'Failed to fetch the sidesheet data, try again later.';
    console.error('Error: %s', error.message);
    return <ErrorBanner description={errorMessage} />;
  }

  if (!data || !data.doctorSideSheetQuery || loading) {
    return <DCSLoadingSpinner />;
  }

  return (
    <DoctorSidesheetForm
      data={data.doctorSideSheetQuery}
      onSuccess={onSuccess}
      context={context}
      onParentSheetClose={onClose}
      doctorId={doctorId} />
  );
};

export default DoctorSideSheet;

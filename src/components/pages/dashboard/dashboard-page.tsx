import React from 'react';

import {
  gql,
  useQuery
} from '@apollo/client';

import { Query } from '../../../__generated__/graphql';

import DashboardComponent from './dashboard-component';
import ErrorBanner from '../../commons/error-banner';
import Navigation from '../navigation/navigation';
import { DCSButtonFragment } from '../../commons/dcs-button/dcs-button';
import { DCSLoadingSpinner } from '../../commons/dcs-loading';
import { DCSPopupFragment } from '../../commons/dcs-popup/dcs-popup';
import { DCSCardFragment } from '../../commons/dcs-card/dcs-card';

const dashboardQuery = gql`
  query DashboardQuery($userId: String!) {
    dashboardQuery(userId: $userId) {
      __typename
      header
      doctors {
        ...DCSCardFragment
      }
      actionButton {
        ...DCSButtonFragment
      }
      removePopup {
        ...DCSPopupFragment
      }
    }
  }

  ${DCSCardFragment}
  ${DCSButtonFragment}
  ${DCSPopupFragment}
`;

const Dashboard: React.FC = () => {
  const variables = {
    userId: localStorage.getItem('user_id')
  };

  const { loading, data, error, refetch } = useQuery<Query>(dashboardQuery, {
    variables
  });

  const onSuccess = () => {
    refetch(variables);
  }

  if (error) {
    const errorMessage = 'Failed to fetch the dashboard data, try again later.';
    console.error('Error: %s', error.message);
    return <ErrorBanner description={errorMessage} />;
  }

  if (!data || !data.dashboardQuery || loading) return <DCSLoadingSpinner />;

  return (
    <div className='container'>
      <Navigation />
      <DashboardComponent data={data.dashboardQuery} onSuccess={onSuccess} />
    </div>
  );
}

export default Dashboard;

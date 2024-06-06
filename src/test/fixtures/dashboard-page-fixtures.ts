import { gql } from '@apollo/client';

import { DCSButtonFragment } from '../../components/commons/dcs-button/dcs-button';
import { DCSCardFragment } from '../../components/commons/dcs-card/dcs-card';
import { DCSPopupFragment } from '../../components/commons/dcs-popup/dcs-popup';
import { MockedResponse } from '@apollo/client/testing';
import { DcsButtonType, Query } from '../../__generated__/graphql';

const QUERY = gql`
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

export const DashboardPageResponse: MockedResponse<Query> = {
  request: {
    query: QUERY,
    variables: {
      userId: '1'
    }
  },
  delay: 2000,
  result: {
    data: {
      dashboardQuery: {
        __typename: 'Dashboard',
        header: 'Doctors list',
        actionButton: {
          __typename: 'DCSButton',
          type: DcsButtonType.Primary,
          message: 'Add new doctor',
          disabled: false,
        },
        removePopup: {
          __typename: 'DCSPopup',
          header: 'Delete doctor',
          body: 'Are you sure you want to delete this doctor?',
          primary: {
            __typename: 'DCSButton',
            type: DcsButtonType.Primary,
            disabled: false,
            message: 'Delete'
          },
          secondary: {
            __typename: 'DCSButton',
            type: DcsButtonType.Secondary,
            disabled: false,
            message: 'Cancel'
          }
        },
        doctors: [
          {
            __typename: 'DCSCard',
            id: '1',
            name: 'Antonio Contreras',
            workplace: 'Hermosillo Clinic - Oftalmology',
            phoneNumber: '+526625555555',
            phoneNumberLabel: 'Phone number: '
          },
          {
            __typename: 'DCSCard',
            id: '2',
            name: 'Antonio Zayas',
            workplace: 'Hermosillo Clinic - Orthopedics',
            phoneNumber: '+526625555555',
            phoneNumberLabel: 'Phone number: '
          },
          {
            __typename: 'DCSCard',
            id: '3',
            name: 'Karla Valdez',
            workplace: 'Hermosillo Clinic - Oncology',
            phoneNumber: '+526625555555',
            phoneNumberLabel: 'Phone number: '
          },
          {
            __typename: 'DCSCard',
            id: '4',
            name: 'Antonio JC',
            workplace: 'Hermosillo Clinic - General medicine',
            phoneNumber: '+526625555555',
            phoneNumberLabel: 'Phone number: '
          }
        ]
      }
    }
  }
}
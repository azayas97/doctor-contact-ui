import { gql } from '@apollo/client';

import { DCSFieldFragment } from '../../components/commons/dcs-field/dcs-field';
import { DCSButtonFragment } from '../../components/commons/dcs-button/dcs-button';
import { MockedResponse } from '@apollo/client/testing';
import { DcsButtonType, DcsFieldType, DcsResultCardType, Mutation, Query } from '../../__generated__/graphql';

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

const QUERY = gql`
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

const createMutation = gql`
  mutation DoctorMutation($request: CreateDoctorMutationRequest!, $userId: String!) {
    createDoctorMutation(request: $request, userId: $userId) {
      __typename
      resultCard {
        __typename
        text
        type
      }
    }
  }
`;

export const doctorSideSheetWrapperMutationSuccessfulResponse: MockedResponse<Mutation> = {
  request: {
    query: createMutation,
    variables: {
      request: {
        name: 'Antonio Contreras',
        department: 'Oncology',
        clinic: 'Antonio\'s Clinic',
        phone: '+526625555555',
      },
      userId: '1',
    },
  },
  delay: 2000,
  result: {
    data: {
      __typename: 'Mutation',
      createDoctorMutation: {
        __typename: 'MutationResponse',
        resultCard: {
          __typename: 'DCSResultCard',
          type: DcsResultCardType.Success,
          text: 'Doctor created successfully.',
        }
      }
    }
  }
}

export const doctorSideSheetWrapperMutationErrorResponse: MockedResponse<Mutation> = {
  request: {
    query: createMutation,
    variables: {
      request: {
        name: 'Antonio Contreras',
        department: 'Oncology',
        clinic: 'Antonio\'s Clinic',
        phone: '+526625555555',
      },
      userId: '2',
    },
  },
  delay: 2000,
  result: {
    data: {
      __typename: 'Mutation',
      createDoctorMutation: {
        __typename: 'MutationResponse',
        resultCard: {
          __typename: 'DCSResultCard',
          type: DcsResultCardType.Error,
          text: 'An error has occurred.',
        }
      }
    }
  }
}

export const doctorSideSheetWrapperCreateResponse: MockedResponse<Query> = {
  request: {
    query: QUERY,
    variables: {
      doctorId: undefined,
      userId: '1',
    }
  },
  result: {
    data: {
      doctorSideSheetQuery: {
        __typename: 'DoctorSideSheet',
        header: 'Create doctor',
        subHeader: null,
        fields: {
          __typename: 'DoctorSideSheetFields',
          doctorName: {
            __typename: 'DCSField',
            id: 'doctorName',
            placeholder: null,
            value: null,
            type: DcsFieldType.Text,
            disabled: false,
            label: 'Doctor\'s name',
          },
          department: {
            __typename: 'DCSField',
            id: 'department',
            placeholder: null,
            value: null,
            type: DcsFieldType.Text,
            disabled: false,
            label: 'Department',
          },
          clinic: {
            __typename: 'DCSField',
            id: 'clinic',
            placeholder: null,
            value: null,
            type: DcsFieldType.Text,
            disabled: false,
            label: 'Clinic',
          },
          phone: {
            __typename: 'DCSField',
            id: 'phone',
            placeholder: null,
            value: null,
            type: DcsFieldType.Text,
            disabled: false,
            label: 'Phone number',
          },
        },
        submit: {
          __typename: 'DCSButton',
          type: DcsButtonType.Primary,
          message: 'Submit',
          disabled: false,
        }
      }
    }
  }
};

export const doctorSideSheetWrapperCreateResponseErrorResponse: MockedResponse<Query> = {
  request: {
    query: QUERY,
    variables: {
      doctorId: undefined,
      userId: '2',
    },
  },
  result: doctorSideSheetWrapperCreateResponse.result
}

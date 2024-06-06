import React, { ChangeEvent } from 'react';

import {
  gql,
  useMutation
} from '@apollo/client';

import {
  CreateDoctorMutationRequest,
  DcsResultCardType,
  DoctorSideSheet,
  DoctorSideSheetFields,
  Mutation,
  UpdateDoctorMutationRequest
} from '../../../../__generated__/graphql';
import DcsField from '../../../commons/dcs-field';
import { useFieldsReducer } from '../../../hooks/useFormFields';
import DcsButton from '../../../commons/dcs-button';
import { DCSLoadingSpinner } from '../../../commons/dcs-loading/dcs-loading';

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

const updateMutation = gql`
  mutation DoctorMutation($request: UpdateDoctorMutationRequest!, $userId: String!) {
    updateDoctorMutation(request: $request, userId: $userId) {
      __typename
      resultCard {
        __typename
        text
        type
      }
    }
  }
`;

type DoctorSideSheetProps = {
  data: DoctorSideSheet,
  onSuccess: () => void;
  onParentSheetClose: () => void
  context: string;
  doctorId?: string;
}

const DoctorSidesheetForm: React.FC<DoctorSideSheetProps> = ({
  data: {
    header,
    subHeader,
    fields,
    submit
  },
  onSuccess,
  onParentSheetClose,
  context,
  doctorId
}) => {  
  const [state, dispatch] = useFieldsReducer(fields);
  const [mutate, {loading}] = useMutation<Mutation>((context === 'create-doctor') ? createMutation : updateMutation);

  const handler = (e: ChangeEvent<HTMLInputElement>) => {    
    dispatch({
      type: 'field_changed',
      id: e.target.id as keyof DoctorSideSheetFields,
      value: e.target.value
    });
  };

  const onSubmit = async () => {
    if (context === 'create-doctor') {
      const request: CreateDoctorMutationRequest = {
        phone: state.phone.value || '',
        clinic: state.clinic.value || '',
        department: state.department.value || '',
        name: state.doctorName.value || '',
      }
      const {data, errors} = await mutate({
        variables: {
          request,
          userId: localStorage.getItem('user_id')
        }
      });
  
      if (errors ||
        data?.createDoctorMutation?.resultCard.type === DcsResultCardType.Error
      ) {
        console.error(
          data?.createDoctorMutation?.resultCard.text
        );
      } else {
        onParentSheetClose();
        onSuccess();
      }
    } else {
      const request: UpdateDoctorMutationRequest = {
        id: doctorId || '',
        phone: state.phone.value || '',
        clinic: state.clinic.value || '',
        department: state.department.value || '',
        name: state.doctorName.value || '',
      }
      const {data, errors} = await mutate({
        variables: {
          request,
          userId: localStorage.getItem('user_id')
        }
      });
  
      if (errors ||
        data?.updateDoctorMutation?.resultCard.type === DcsResultCardType.Error
      ) {
        console.error(
          data?.updateDoctorMutation?.resultCard.text
        );
      } else {
        console.log(data);
        onParentSheetClose();
        onSuccess();
      }
    }
    
  }
  
  return (
    <div className='doctor-sidesheet-container'>
      <h1>{header}</h1>
      {
        subHeader && <h3>{subHeader}</h3>
      }
      <section className='doctor-sidesheet-fields'>
        <DcsField data={state.doctorName} onChange={handler} />
        <DcsField data={state.clinic} onChange={handler} />
        <DcsField data={state.department} onChange={handler} />
        <DcsField data={state.phone} onChange={handler} />
      </section>
      <section className='doctor-sidesheet-submit'>
        {!loading ? <DcsButton data={submit} onClick={onSubmit} /> : <DCSLoadingSpinner />}
      </section>
    </div>
  );
};

export default React.memo(DoctorSidesheetForm);

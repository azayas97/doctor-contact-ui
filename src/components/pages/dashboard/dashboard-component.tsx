import React from 'react';

import {
  gql,
  useMutation
} from '@apollo/client';

import {
  Dashboard,
  DcsResultCardType,
  Mutation
} from '../../../__generated__/graphql';
import DcsResultCard from '../../commons/dcs-card';
import DcsButton from '../../commons/dcs-button';
import DCSPopup from '../../commons/dcs-popup';
import { DCSActionLoadingSpinner } from '../../commons/dcs-loading/dcs-loading';
import DoctorSideSheetWrapper from '../sidesheets/doctors/doctor-sidesheet-wrapper';

import './dashboard.scss';

const mutation = gql`
mutation DoctorMutation($request: RemoveDoctorMutationRequest!, $userId: String!) {
  removeDoctorMutation(request: $request, userId: $userId) {
    __typename
    resultCard {
      __typename
      text
      type
    }
  }
}
`;

type DashboardComponentProps = {
  data: Dashboard;
  onSuccess: () => void;
}

type SideSheetState = {
  doctorId?: string;
  visible: boolean;
}

type RemovePopupState = {
  doctorId?: string;
  visible: boolean;
}

const DashboardComponent: React.FC<DashboardComponentProps> = ({
  data: {
    header,
    doctors,
    actionButton,
    removePopup
  },
  onSuccess
}) => {
  const [sideSheetState, setSideSheetState] = React.useState<SideSheetState>({
    visible: false
  });
  const [popupState, setPopupState] = React.useState<RemovePopupState>({
    visible: false
  });

  const [mutate, {loading}] = useMutation<Mutation>(mutation);

  const onOpenSideSheet = (doctorId?: string) => {
    setSideSheetState({
      doctorId,
      visible: true
    });
  };

  const onCloseSideSheet = () => {
    setSideSheetState({
      doctorId: undefined,
      visible: false
    });
  }

  const onClosePopup = () => {
    setPopupState({
      visible: false
    });
  }
  
  const onOpenPopup = (doctorId: string) => {
    setPopupState({
      visible: true,
      doctorId
    });
  }

  const onDoctorRemove = async () => {
    const {data, errors} = await mutate({
      variables: {
        request: {
          doctorId: popupState.doctorId
        },
        userId: localStorage.getItem('user_id')
      }
    });

    if (errors ||
      data?.removeDoctorMutation?.resultCard.type === DcsResultCardType.Error
    ) {
      console.error(
        data?.removeDoctorMutation?.resultCard.text
      );
    } else {
      onClosePopup();
      onSuccess();
    }
  }

  return (
    <React.Fragment>
      {loading && <DCSActionLoadingSpinner />}
      <DCSPopup
        data={removePopup}
        onPrimaryClick={onDoctorRemove}
        onSecondaryClick={onClosePopup}
        visible={popupState.visible} />
      <DoctorSideSheetWrapper
        onClose={onCloseSideSheet}
        onSuccess={onSuccess}
        data={sideSheetState} />
      <main className='dashboard-container'>
        <h1>{header}</h1>
        <section className='dashboard-doctor-list'>
        {
          doctors && doctors.map((doctor, index) =>
            <DcsResultCard
              data={doctor}
              key={index}
              onRemove={() => onOpenPopup(doctor.id)}
              onEdit={() => onOpenSideSheet(doctor.id)}/>)
        }
        </section>
        <section className='button-container'>
          <DcsButton data={actionButton} onClick={() => onOpenSideSheet()} />
        </section>
      </main>
    </React.Fragment>
  );
}

export default React.memo(DashboardComponent);

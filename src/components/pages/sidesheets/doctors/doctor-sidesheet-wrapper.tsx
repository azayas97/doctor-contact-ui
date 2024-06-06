import React from 'react';

import DCSSideSheet from '../../../commons/dcs-sidesheet';
import DoctorSideSheet from './doctor-sidesheet';

type Props = {
  onClose: () => void;
  onSuccess: () => void;
  data: {
    visible: boolean;
    doctorId?: string;
  };
}

const DoctorSideSheetWrapper: React.FC<Props> = ({
  data: {
    visible,
    doctorId
  },
  onClose,
  onSuccess
}) => {
  
  return (
    <DCSSideSheet
      onClose={onClose}
      visible={visible}>
      {
        visible && <DoctorSideSheet
          onClose={onClose}
          doctorId={doctorId}
          onSuccess={onSuccess} />
      }
    </DCSSideSheet>
  );
};

export default DoctorSideSheetWrapper

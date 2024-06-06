import React from 'react';

import closeIcon from '../../../assets/close-icon.svg';

import './dcs-sidesheet.scss';

type DCSSideSheetProps = {
  visible: boolean;
  children: React.ReactNode;
  onClose: () => void;
}

const DCSSideSheet: React.FC<DCSSideSheetProps> = ({
  children,
  visible,
  onClose
}) => {
  const className = 'sidesheet-container'.concat((!visible) ? ' sidesheet-container-hidden' : '');

  return (
    <div className={className}>
      <span onClick={onClose} className='sidesheet-close-button-span'>
        <img src={closeIcon} alt='close-icon' className='sidesheet-close-button' />
      </span>
      {children}
    </div>
  );
}

export default DCSSideSheet;

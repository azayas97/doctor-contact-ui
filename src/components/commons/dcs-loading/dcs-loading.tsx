import React from 'react';

import './dcs-loading.scss';

const DCSLoadingSpinner: React.FC = () => {
  return (
    <div className='dcs-loader-container'>
      <span className='dcs-loader' />
    </div>
  );
}

const DCSActionLoadingSpinner: React.FC = () => {
  return (
    <div className='dcs-loader-action-container'>
      <span className='dcs-loader' />
    </div>
  );
}

export {
  DCSLoadingSpinner,
  DCSActionLoadingSpinner
};

import React from 'react';

import './error-banner.scss';

type ErrorBannerProps = {
  description: string;
}

const ErrorBanner: React.FC<ErrorBannerProps> = ({
  description
}) => {
  const title = 'Something went wrong!';

  return (
    <div className='error-banner-container'>
      <h1>{title}</h1>
      <p>{description}</p>
    </div>
  );
};

export default ErrorBanner;

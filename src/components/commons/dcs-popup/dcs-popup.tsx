import React from 'react';

import { DcsPopup } from '../../../__generated__/graphql';
import DcsButton from '../dcs-button';

import './dcs-popup.scss';

type DCSPopupProps = {
  data: DcsPopup;
  visible: boolean;
  onPrimaryClick: () => void;
  onSecondaryClick: () => void;
}

const DCSPopup: React.FC<DCSPopupProps> = ({
  data: {
    header,
    body,
    primary,
    secondary
  },
  visible,
  onPrimaryClick,
  onSecondaryClick,
}) => {
  const className = 'dcs-popup-container'.concat((visible) ? ' dcs-popup-container-visible' : '');

  return (
    <div className={className}>
      <div className='dcs-popup'>
        <h1>{header}</h1>
        <p>{body}</p>
        <section className='dcs-popup-buttons'>
          <DcsButton data={secondary} onClick={onSecondaryClick} />
          <DcsButton data={primary} onClick={onPrimaryClick} />
        </section>
      </div>
    </div>
  );
};

export const DCSPopupFragment = `
  fragment DCSPopupFragment on DCSPopup {
    __typename
    header
    body
    primary {
      ...DCSButtonFragment
    }
    secondary {
      ...DCSButtonFragment
    }
  }
`;

export default React.memo(DCSPopup);

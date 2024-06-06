import React from 'react';

import {
  DcsButton,
  DcsButtonType
} from '../../../__generated__/graphql';
import { getClassNames } from '../../../utils/class-name-handler';

import './dcs-button.scss';

type DCSButtonProps = {
  data: DcsButton,
  onClick: React.MouseEventHandler<HTMLButtonElement>
}

const DCSButton: React.FC<DCSButtonProps> = ({
  onClick,
  data: {
    disabled,
    message,
    type
  }
}) => {
  const baseClassName = 'dcs-button';

  const classes = getClassNames(
    baseClassName,
    disabled && `${baseClassName}-disabled`,
    type === DcsButtonType.Primary && `${baseClassName}-primary`,
    type === DcsButtonType.Secondary && `${baseClassName}-secondary`
  );
  
  return (
    <button className={classes} onClick={onClick}>
      {message}
    </button>
  );
};

export const DCSButtonFragment = `
  fragment DCSButtonFragment on DCSButton {
    __typename
    type
    message
    disabled
  }
`;

export default React.memo(DCSButton);

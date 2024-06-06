import React from 'react';

import { DcsField } from '../../../__generated__/graphql';
import { getClassNames } from '../../../utils/class-name-handler';

import './dcs-field.scss'

type DCSFieldProps = {
  data: DcsField,
  onChange: React.ChangeEventHandler<HTMLInputElement>
}

const DCSField: React.FC<DCSFieldProps> = ({
  data: {
    id,
    type,
    value,
    placeholder,
    disabled,
    label
  },
  onChange
}) => {
  const baseClassName = 'dcs-field';

  const classes = getClassNames(
    baseClassName,
    disabled && `${baseClassName}-disabled`,
  );

  return (
    <section className='dcs-field-container'>
      <label>{label}</label>
      <input className={classes} type={type} id={id} value={value || ''} placeholder={placeholder || ''} onChange={onChange} />
    </section>
  )
}

export const DCSFieldFragment = `
  fragment DCSFieldFragment on DCSField {
    __typename
    id
    label
    placeholder
    type
    disabled
    value
  }
`;

export default React.memo(DCSField);

import React from 'react';

import { DcsCard } from '../../../__generated__/graphql';
import removeIcon from '../../../assets/delete-icon.svg';
import editIcon from '../../../assets/edit-icon.svg';

import './dcs-card.scss'
import { gql } from '@apollo/client';

type DCSCardProps = {
  data: DcsCard,
  onRemove: () => void;
  onEdit: () => void;
}

const DCSCard: React.FC<DCSCardProps> = ({
  data: {
    id,
    name,
    phoneNumber,
    phoneNumberLabel,
    workplace
  },
  onRemove,
  onEdit
}) => {
  return (
    <div className='card-container' key={id} data-testid={`card-C${id}`}>
      <section className='card-name-section'>
        <span className='card-profile'/>
        <section className='card-name'>
          <h3>{name}</h3>
          <p>{workplace}</p>
        </section>
      </section>
      <span className='card-contact'>
        <strong>{phoneNumberLabel}</strong>
        <p>{phoneNumber}</p>
      </span>
      <section className='card-actions'>
        <span onClick={onRemove}>
          <img src={removeIcon} alt='remove-icon' />
        </span>
        <span onClick={onEdit}>
          <img src={editIcon} alt='edit-icon' />
        </span>
      </section>
    </div>
  );
}

export const DCSCardFragment = gql`
  fragment DCSCardFragment on DCSCard {
    __typename
    id
    name
    workplace
    phoneNumber
    phoneNumberLabel
  }
`;

export default React.memo(DCSCard);

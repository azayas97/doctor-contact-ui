import React from 'react';

import { DcsField } from '../../__generated__/graphql';

type Action<T> = {
  id: keyof T;
  value: string;
  type: 'field_changed'
}

const useFieldsReducer = <T>(fields: T) => {
  const reducer = (state: T, action: Action<T>) => {
    switch (action.type) {
      case 'field_changed': {
        return {
          ...state,
          [action.id]: {
            ...state[action.id] as DcsField,
            value: action.value
          }
        }
      }
      default:
        return state;
    }
  }

  return React.useReducer(reducer, fields);
}

export {
  useFieldsReducer
};

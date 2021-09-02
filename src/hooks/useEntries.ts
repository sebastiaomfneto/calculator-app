import { Reducer, useReducer } from 'react';

import { calculateExpression } from '../helpers';

type State = {
  entries: string;
  result: string;
};

type Action =
  | { type: 'ADD_ENTRY'; payload: string }
  | { type: 'CALCULATE_RESULT' }
  | { type: 'RESET' };

export const ADD_ENTRY = 'ADD_ENTRY';
export const CALCULATE_RESULT = 'CALCULATE_RESULT';
export const RESET = 'RESET';

const reducer: Reducer<State, Action> = (
  prevState: State,
  action: Action
): State => {
  switch (action.type) {
    case ADD_ENTRY:
      return {
        entries: prevState.entries.concat(action.payload),
        result: '',
      };
    case CALCULATE_RESULT:
      return {
        entries: '',
        result: calculateExpression(prevState.entries),
      };
    case RESET:
      return {
        entries: '',
        result: '',
      };
    default:
      throw new Error('Not implemented');
  }
};

export const useEntries = (
  initialState: State = { entries: '', result: '' }
) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return {
    state,
    dispatch,
  };
};

import { act, renderHook } from '@testing-library/react-hooks';
import { useEntries, ADD_ENTRY, CALCULATE_RESULT, RESET } from './useEntries';

import * as helpers from '../helpers';

jest.mock('../helpers');

describe('useEntries', () => {
  test('should state have initial value', () => {
    const { result } = renderHook(() => useEntries());

    expect(result.current.state).toEqual({ entries: '', result: '' });
  });

  test('should dispatch "ADD_ENTRY"', () => {
    const { result } = renderHook(() => useEntries());

    act(() => {
      result.current.dispatch({ type: ADD_ENTRY, payload: '100' });
    });

    act(() => {
      result.current.dispatch({ type: ADD_ENTRY, payload: '+' });
    });

    act(() => {
      result.current.dispatch({ type: ADD_ENTRY, payload: '100' });
    });

    expect(result.current.state).toEqual({ entries: '100+100', result: '' });
  });

  test('should dispatch "CALCULATE_RESULT"', () => {
    const entries = '50+50';

    jest
      .spyOn(helpers, 'calculateExpression')
      .mockImplementationOnce(() => '100');

    const { result } = renderHook(() => useEntries({ entries }));

    act(() => {
      result.current.dispatch({ type: CALCULATE_RESULT });
    });

    expect(result.current.state).toEqual({ entries: '', result: '100' });

    expect(helpers.calculateExpression).toHaveBeenCalledWith(entries);
  });

  test('should dispatch "RESET"', () => {
    const { result } = renderHook(() =>
      useEntries({ entries: '50+50', result: '100' })
    );

    act(() => {
      result.current.dispatch({ type: RESET });
    });

    expect(result.current.state).toEqual({ entries: '', result: '' });
  });

  test('should throw error when dispatch unknown action type"', () => {
    const { result } = renderHook(() => useEntries());

    act(() => {
      result.current.dispatch({ type: 'UNKNOWN_TYPE' });
    });

    expect(result.error).toBeInstanceOf(Error);
  });
});

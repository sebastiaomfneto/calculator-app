import { render, act, fireEvent } from '@testing-library/react';

import { Calculator } from './Calculator';
import * as hooks from '../hooks';

jest.mock('../hooks');

const renderWithHook = (Element: any, state: any, dispatch: any) => {
  jest
    .spyOn(hooks, 'useEntries')
    .mockImplementationOnce(() => ({ state, dispatch }));

  return render(Element);
};

describe('Calculator', () => {
  const state = { entries: '', result: '' };
  const dispatch = jest.fn();

  afterEach(() => {
    jest.resetAllMocks();
  });

  test('should match with snapshot', () => {
    const { container } = renderWithHook(<Calculator />, state, dispatch);

    expect(container).toMatchSnapshot();
  });

  test('should show 0 when state result & entries is empty', async () => {
    const { findByTestId } = renderWithHook(<Calculator />, state, dispatch);

    expect(await findByTestId('result-text')).toHaveTextContent('0');
  });

  test('should show state result', async () => {
    const { findByTestId } = renderWithHook(
      <Calculator />,
      { entries: '2+2', result: '4' },
      dispatch
    );

    expect(await findByTestId('result-text')).toHaveTextContent('4');
  });

  test('should show state entries', async () => {
    const { findByTestId } = renderWithHook(
      <Calculator />,
      { entries: '2+2', result: '' },
      dispatch
    );

    expect(await findByTestId('result-text')).toHaveTextContent('2+2');
  });

  test('should call dispatch "ADD_ENTRY" when number & operations button clicked', async () => {
    const { findByTestId } = renderWithHook(<Calculator />, state, dispatch);

    await act(async () => {
      fireEvent.click(await findByTestId('button-2'));
      fireEvent.click(await findByTestId('button-+'));
      fireEvent.click(await findByTestId('button-2'));
    });

    expect(dispatch).toHaveBeenCalledWith({
      type: hooks.ADD_ENTRY,
      payload: '2',
    });
    expect(dispatch).toHaveBeenCalledWith({
      type: hooks.ADD_ENTRY,
      payload: '+',
    });
    expect(dispatch).toHaveBeenCalledWith({
      type: hooks.ADD_ENTRY,
      payload: '2',
    });
  });
  test('should call dispatch "CALCULATE_RESULT" when equals button clicked', async () => {
    const { findByTestId } = renderWithHook(<Calculator />, state, dispatch);

    await act(async () => {
      fireEvent.click(await findByTestId('button-='));
    });

    expect(dispatch).toHaveBeenCalledWith({
      type: hooks.CALCULATE_RESULT,
    });
  });
  test('should call dispatch "RESET" when clear button clicked', async () => {
    const { findByTestId } = renderWithHook(<Calculator />, state, dispatch);

    await act(async () => {
      fireEvent.click(await findByTestId('button-reset'));
    });

    expect(dispatch).toHaveBeenCalledWith({
      type: hooks.RESET,
    });
  });
});

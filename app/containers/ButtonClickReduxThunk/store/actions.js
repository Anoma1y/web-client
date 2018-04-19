import {
  SET_COUNTER
} from './types';

type SetCounterAction = {
  type: typeof SET_COUNTER,
  payload: number
}
export const setCounter = (clicks: number): SetCounterAction => ({
  type: SET_COUNTER,
  payload: clicks
});

export const increaseCounter = (): ReduxThunkAction => (
  (dispatch: ReduxDispatch, getState: ReduxGetState) => {
    const { ButtonClickReduxThunk } = getState();
    setTimeout(() => {
      dispatch(setCounter(ButtonClickReduxThunk.clicks + 1));
    }, 1000);
  }
);

export type ActionTypes = SetCounterAction;

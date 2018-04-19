import {
  INCREASE_COUNTER
} from './types';

type IncreaseCounterAction = {
  type: typeof INCREASE_COUNTER,
}
export const increaseCounter = (): IncreaseCounterAction => ({
  type: INCREASE_COUNTER
});

export type ActionTypes = IncreaseCounterAction;

declare type ReduxDispatch = (
  action: ReduxAction | ReduxThunkAction | ReduxPromiseAction | Array<ReduxAction>
) => any;

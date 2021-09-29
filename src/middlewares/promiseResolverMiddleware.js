/** Custom middleware function to resolve Promise given as an action payload property.
 * @see https://redux.js.org/understanding/history-and-design/middleware
 */
export const promiseResolverMiddleware = store => next => action => {
  if (typeof action?.payload?.then !== 'function') {
    /** Pass action to next middleware and exit, if payload is not a Promise */
    return next(action);
  }
  action.payload.then(
    response => {
      store.dispatch({
        type: `${action.type}_FULFILLED`,
        payload: response,
      });
    },
    () => {
      store.dispatch({
        type: `${action.type}_REJECTED`,
      });
    }
  );
  /** Pass *_PENDING action to next middleware */
  return next({ type: `${action.type}_PENDING` });
};

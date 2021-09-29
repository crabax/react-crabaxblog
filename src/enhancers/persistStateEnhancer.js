/**
 * Naive implementation of persistent store using localStorage. With optional path configuration.
 */
export const persistStateEnhancer =
  (path = 'CrabaxBlog') =>
  next =>
  (reducer, initialState, enhancer) => {
    const localState = JSON.parse(localStorage.getItem(path) || '{}');
    const state = localState || initialState;
    const store = next(reducer, state, enhancer);
    store.subscribe(() => {
      const nextState = store.getState();
      localStorage.setItem(path, JSON.stringify(nextState));
    });
    return store;
  };

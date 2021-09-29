import {
  GET_GNEWS_POSTS,
  GET_LOCAL_POSTS,
  GET_SERVER_POSTS,
} from './actionTypes';

const initialState = {
  posts: undefined,
  isLoading: false,
  hasError: false,
  isFulfilled: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case `${GET_GNEWS_POSTS}_PENDING`:
      return {
        ...state,
        isFulfilled: false,
        isLoading: true,
        hasError: false,
        posts: undefined,
      };

    case `${GET_GNEWS_POSTS}_FULFILLED`:
      return {
        isFulfilled: true,
        isLoading: false,
        hasError: false,
        posts: action.payload.data,
      };

    case `${GET_GNEWS_POSTS}_REJECTED`:
      return {
        isFulfilled: false,
        isLoading: false,
        hasError: true,
        posts: undefined,
      };

    case `${GET_LOCAL_POSTS}_FULFILLED`:
      return {
        isFulfilled: true,
        isLoading: false,
        hasError: false,
        posts: action.payload,
      };

    case `${GET_SERVER_POSTS}_FULFILLED`:
      return {
        isFulfilled: true,
        isLoading: false,
        hasError: false,
        posts: action.payload.data,
      };

    case `${GET_SERVER_POSTS}_PENDING`:
      return {
        ...state,
        isFulfilled: false,
        isLoading: true,
        hasError: false,
        posts: undefined,
      };

    case `${GET_SERVER_POSTS}_REJECTED`:
      return {
        isFulfilled: false,
        isLoading: false,
        hasError: true,
        posts: undefined,
      };
    default:
      return state;
  }
};

export default reducer;

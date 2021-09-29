import { GET_LOCAL_POSTS } from './actionTypes';

const useGetLocalPostsQuery = dispatch => {
  const getPosts = () => {
    const currentPosts = JSON.parse(
      localStorage.getItem('localPosts') ||
        '{"articles":[], "totalArticles": 0}'
    );
    return currentPosts;
  };
  return () =>
    dispatch({
      type: `${GET_LOCAL_POSTS}_FULFILLED`,
      payload: getPosts(),
    });
};

export default useGetLocalPostsQuery;

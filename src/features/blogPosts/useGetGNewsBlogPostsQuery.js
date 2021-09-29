import axios from 'axios';
import config from 'config';
import { GET_GNEWS_POSTS } from './actionTypes';

const useGetGNewsBlogPostsQuery = dispatch => query => {
  dispatch({
    type: GET_GNEWS_POSTS,
    payload: axios.get(`${config.gnewsAPI}${query}`),
  });
};

export default useGetGNewsBlogPostsQuery;

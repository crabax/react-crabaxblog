import axios from 'axios';
import config from 'config';
import { GET_SERVER_POSTS } from './actionTypes';

const useGetServerBlogPostsQuery = dispatch => query => {
  dispatch({
    type: GET_SERVER_POSTS,
    payload: axios.get(`${config.serverAPI}${query}`),
  });
};

export default useGetServerBlogPostsQuery;

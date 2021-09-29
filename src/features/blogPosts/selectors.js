import { useSelector } from 'react-redux';

export const useLoadingState = () => {
  const { isLoading, hasError, isFulfilled } = useSelector(
    state => state.blogPosts
  );
  return { isLoading, hasError, isFulfilled };
};

export const usePosts = () => useSelector(state => state.blogPosts.posts);

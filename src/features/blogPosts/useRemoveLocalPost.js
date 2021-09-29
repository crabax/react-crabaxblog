const useRemoveLocalPost = () => postId => {
  const setPosts = () => {
    const currentPosts = JSON.parse(
      localStorage.getItem('localPosts') || '{"articles":[]}'
    );
    const articles = currentPosts.articles.filter(x => x.id !== postId);
    localStorage.setItem(
      'localPosts',
      JSON.stringify({
        articles,
        totalArticles: currentPosts.articles.length,
      })
    );
  };
  setPosts();
};

export default useRemoveLocalPost;

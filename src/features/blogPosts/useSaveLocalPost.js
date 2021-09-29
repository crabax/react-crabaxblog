import { v4 as uuidv4 } from 'uuid';

const useSaveLocalPost = () => form => {
  const setPosts = () => {
    if (form === null || form === undefined) {
      return;
    }

    const currentPosts = JSON.parse(
      localStorage.getItem('localPosts') || '{"articles":[]}'
    );

    const { articles } = currentPosts;
    if (!form.id || typeof form.id !== 'string') {
      //  Replace server id
      articles.push({ ...form, id: uuidv4() });
    } else {
      const index = articles.findIndex(x => x.id === form.id);
      articles[index] = form;
    }
    localStorage.setItem(
      'localPosts',
      JSON.stringify({
        articles,
        totalArticles: articles.length,
      })
    );
  };

  setPosts(form);
};

export default useSaveLocalPost;

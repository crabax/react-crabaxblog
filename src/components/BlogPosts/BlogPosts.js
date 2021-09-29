import React, { useState, useEffect, useCallback } from 'react';
import {
  Button,
  Card,
  Container,
  Row,
  Col,
  Pagination,
  Form,
} from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import {
  useGetGNewsBlogPostsQuery,
  useGetLocalPostsQuery,
  useGetServerBlogPostsQuery,
  useRemoveLocalPost,
  useSaveLocalPost,
  usePosts,
  useLoadingState,
} from 'features/blogPosts';
import BlogPostSave from './save';

const BlogPosts = ({ type }) => {
  const [updateCounter, setCount] = useState(0);
  const dispatch = useDispatch();
  const { isLoading, hasError, isFulfilled } = useLoadingState();
  const posts = usePosts();
  const getGnewsPosts = useGetGNewsBlogPostsQuery(dispatch);
  const getServerPosts = useGetServerBlogPostsQuery(dispatch);
  const getLocalPosts = useGetLocalPostsQuery(dispatch);
  const removeLocalPost = useRemoveLocalPost();
  const saveLocalPost = useSaveLocalPost();
  const isPristine = !isLoading && !hasError && !isFulfilled;
  const [keyword, setKeyword] = useState('watches');
  const [showed, setShowed] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postItemSelected, setPostItemSelected] = useState(null);

  const getPosts = useCallback(() => {
    if (type === 0) {
      getGnewsPosts(keyword);
    }
    if (type === 1) {
      getLocalPosts();
    }
    if (type === 2) {
      getServerPosts(keyword);
    }
  }, [getGnewsPosts, getLocalPosts, getServerPosts, type, keyword]);

  useEffect(
    () => {
      getPosts();
      setShowed(false);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [updateCounter]
  );

  const forceUpdate = () => {
    setCount(value => value + 1);
  };

  const editPost = ({ title, description, content, image, id }) => {
    setShowed(true);
    setPostItemSelected({ title, description, content, image, id: id || 0 });
  };

  const createPost = () => {
    setShowed(true);
    setPostItemSelected({});
  };

  const removePost = postItem => {
    if (type === 1) {
      removeLocalPost(postItem.id);
      forceUpdate();
    }
  };

  const onSavePost = form => {
    saveLocalPost(form);
    type === 1 ? forceUpdate() : setShowed(false);
  };

  const postTypeTitle = () => {
    switch (type) {
      case 0:
        return 'GNews Posts (remote)';
      case 1:
        return 'Local Posts';
      case 2:
        return 'Server Posts (remote+)';
      default:
        return '';
    }
  };

  function PostsList() {
    const getImage = postItem =>
      postItem.image instanceof Blob
        ? URL.createObjectURL(postItem.image)
        : postItem.image;

    const pageSize = 2;
    const totalItems = posts?.articles.length;
    const pageCount = Math.ceil(totalItems / pageSize);
    const items = [];
    for (let number = 1; number <= pageCount; number += 1) {
      items.push(
        <Pagination.Item
          key={number}
          active={number === currentPage}
          onClick={() => setCurrentPage(number)}>
          {number}
        </Pagination.Item>
      );
    }

    const listItems = posts?.articles
      ?.slice(
        pageSize * (currentPage - 1),
        pageSize * (currentPage - 1) + pageSize
      )
      .map((postItem, index) => (
        <Card
          key={`${postItem.id || ''}${postItem.url || ''}`}
          className={index === 0 ? 'mb-5' : 'my-5'}
          style={{ width: '100%' }}>
          <Card.Body>
            <Row>
              <Col xs={12} md={6}>
                <Card.Title>{postItem.title}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                  {postItem.description}
                </Card.Subtitle>
                <Card.Text>{postItem.content}</Card.Text>
              </Col>
              <Col xs={12} md={6}>
                <Card.Img
                  variant="top"
                  src={getImage(postItem)}
                  style={{ width: '100%' }}
                />
              </Col>
            </Row>
            <div className="d-flex justify-content-end">
              <Button
                variant="primary"
                className="my-2"
                onClick={() => editPost(postItem)}>
                Edit
              </Button>
              {type === 1 && (
                <Button
                  className="mx-2 my-2"
                  variant="outline-secondary"
                  onClick={() => removePost(postItem)}>
                  Remove
                </Button>
              )}
            </div>
          </Card.Body>
        </Card>
      ));
    return (
      <>
        <div className="mt-5">
          &nbsp;
          {(posts?.totalArticles || 0) === 0 ? (
            'No results found'
          ) : (
            <>{posts?.totalArticles} result(s) found</>
          )}
        </div>
        <Pagination>{items}</Pagination>
        {listItems}
        <Pagination>{items}</Pagination>
      </>
    );
  }

  return (
    <Container>
      <div className="d-flex justify-content-between align-items-center">
        <h1 className="m-0">{postTypeTitle()}</h1>
        <div className="d-flex">
          {type !== 1 && (
            <>
              <Form.Control
                className="mx-2"
                type="text"
                placeholder="Enter search keyword"
                defaultValue={keyword}
                onChange={event => setKeyword(event.target.value)}
              />
            </>
          )}
          <Button
            className="mx-3"
            disabled={isLoading}
            variant="secondary"
            onClick={getPosts}>
            {type === 1 ? 'Reload' : 'Search'} posts
          </Button>
          {type === 1 && (
            <Button className="mr-3" onClick={createPost}>
              Create post
            </Button>
          )}
        </div>
      </div>
      <div>
        {isPristine && <div>Click the button to get random number</div>}
        {isLoading && <div>Loading Posts...</div>}
        {isFulfilled && <PostsList />}
        {hasError && type === 0 && (
          <div>
            Cannot read from GNews.io. Maybe the query limit was reached because
            this is a free account.
          </div>
        )}
        {hasError && type === 2 && <div>Cannot read from server.</div>}
      </div>
      <BlogPostSave
        showed={showed}
        type={type}
        postItem={postItemSelected}
        handleClose={() => {
          setShowed(false);
          setPostItemSelected(null);
        }}
        onSavePost={onSavePost}
      />
    </Container>
  );
};

BlogPosts.propTypes = {
  type: PropTypes.number,
};
BlogPosts.defaultProps = {
  type: 0,
};
export default BlogPosts;

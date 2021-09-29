import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import PropTypes from 'prop-types';

const BlogPostSave = ({ showed, type, postItem, handleClose, onSavePost }) => {
  const [form, setForm] = useState({});
  const [errors, setErrors] = useState({});

  const setErrorMessage = ({ name, value }) => {
    setErrors(prev => ({ ...prev, [name]: value }));
  };
  const setFormValues = ({ name, value }) => {
    setForm({ ...form, [name]: value });

    if (
      value === undefined ||
      value === null ||
      (typeof value === 'string' && value.trim().length === 0)
    ) {
      setErrorMessage({ name, value: 'Cannot be empty' });
    } else {
      setErrorMessage({ name, value: null });
    }
  };

  useEffect(() => {
    setForm({
      title: postItem?.title,
      description: postItem?.description,
      content: postItem?.content,
      image: postItem?.image,
      id: postItem?.id || 0,
      url: postItem?.url || 0,
      publishedAt: postItem?.publishedAt || 0,
    });
  }, [postItem]);

  const hasErrors = () =>
    !formWithData() ||
    errors.title ||
    errors.description ||
    errors.content ||
    errors.image;

  const formWithData = () =>
    form.title || form.description || form.content || form.image;

  return (
    <Modal
      size="lg"
      show={showed}
      onHide={handleClose}
      backdrop="static"
      keyboard={false}>
      <Modal.Header closeButton>
        <Modal.Title>Post info</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="formPostTitle">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter post title"
              defaultValue={form.title || postItem?.title}
              onChange={event =>
                setFormValues({ name: 'title', value: event.target.value })
              }
            />
            {errors.title && (
              <Form.Label className="text-danger">{errors.title}</Form.Label>
            )}
          </Form.Group>
          <Form.Group className="mb-3" controlId="formPostDescription">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              placeholder="Enter description"
              defaultValue={form.description || postItem?.description}
              onChange={event =>
                setFormValues({
                  name: 'description',
                  value: event.target.value,
                })
              }
            />
            {errors.description && (
              <Form.Label className="text-danger">
                {errors.description}
              </Form.Label>
            )}
          </Form.Group>
          <Form.Group className="mb-3" controlId="formPostContent">
            <Form.Label>Content</Form.Label>
            <Form.Control
              as="textarea"
              placeholder="Enter post content"
              defaultValue={form.content || postItem?.content}
              onChange={event =>
                setFormValues({ name: 'content', value: event.target.value })
              }
            />
            {errors.content && (
              <Form.Label className="text-danger">{errors.content}</Form.Label>
            )}
          </Form.Group>

          <Form.Group className="mb-3" controlId="formPostTitle">
            <Form.Label>Image url</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter image url"
              defaultValue={form.image || postItem?.image}
              onChange={event =>
                setFormValues({ name: 'image', value: event.target.value })
              }
            />
            {errors.image && (
              <Form.Label className="text-danger">{errors.image}</Form.Label>
            )}
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-secondary" onClick={handleClose}>
          Close
        </Button>
        {(type === 0 || type === 2) && (
          <Button
            disabled={hasErrors()}
            variant="primary"
            onClick={() => onSavePost(form)}>
            Save as &quot;Local Post&quot;
          </Button>
        )}
        {type === 1 && (
          <Button
            disabled={hasErrors()}
            variant="primary"
            onClick={() => onSavePost(form)}>
            Save local changes
          </Button>
        )}
      </Modal.Footer>
    </Modal>
  );
};

BlogPostSave.propTypes = {
  showed: PropTypes.bool,
  type: PropTypes.number.isRequired,
  postItem: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string,
    content: PropTypes.string,
    image: PropTypes.string,
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    publishedAt: PropTypes.string,
    url: PropTypes.string,
  }),
  handleClose: PropTypes.func.isRequired,
  onSavePost: PropTypes.func.isRequired,
};
BlogPostSave.defaultProps = {
  showed: false,
  postItem: null,
};
export default BlogPostSave;

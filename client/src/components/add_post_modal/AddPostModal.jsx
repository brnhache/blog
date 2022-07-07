import './AddPostModal.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Modal, Form } from 'react-bootstrap';
import React from 'react';

export function AddPostModal(props) {
  const { showAddPost, handleHideAddPost, handleAddPost } = props;

  return (
    <Modal show={showAddPost} onHide={handleHideAddPost} backdrop="static">
      <Modal.Header closeButton={true}>
        <Modal.Title>Create Post</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleAddPost}>
          <Form.Label className="newPostFormLabel">Title</Form.Label>
          <Form.Control className="mb-3" type="text" name="newPostTitle" />
          <Form.Label className="newPostFormLabel">Body</Form.Label>
          <Form.Control className="mb-3" as="textarea" name="newPostBody" />
          <Form.Label className="newPostFormLabel">Image</Form.Label>
          <Form.Control className="mb-3" type="file" name="newPostImage" />
          <Button type="submit">Submit</Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

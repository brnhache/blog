import './EditPostModal.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import { Modal, Image, Button, ButtonGroup } from 'react-bootstrap';

import React from 'react';

export function EditPostModal(props) {
  const { selectedPost, showEditPost, handleHideEditPost } = props;
  return (
    <Modal backdrop="static" show={showEditPost} onHide={handleHideEditPost}>
      <Modal.Header className={'editPostHeader d-block text-center'}>
        Edit Post
      </Modal.Header>
      <Modal.Title className={'d-block text-center mb-3'}>
        {selectedPost?.title}
      </Modal.Title>
      <Image src={selectedPost.image} />
      <Modal.Body>{selectedPost?.body}</Modal.Body>
      <ButtonGroup>
        <Button variant="success">Save</Button>
        <Button variant="danger" onClick={handleHideEditPost}>
          Close
        </Button>
      </ButtonGroup>
    </Modal>
  );
}

import './ViewPostModal.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import { Modal, Image, Button, ButtonGroup } from 'react-bootstrap';
import { SavePostModal } from '../save_post_modal/SavePostModal';
import { Notyf } from 'notyf';
import 'notyf/notyf.min.css';

import React, { useState } from 'react';

/**Notyf toast baby */
const notyf = new Notyf();

export function ViewPostModal(props) {
  const { selectedPost, showViewPost, handleHideViewPost } = props;
  const [showSavePost, setShowSavePost] = useState(false);
  const handleHideSavePost = () => setShowSavePost(false);

  //Does it matter about passing the entire post? Or should it always just be the ID?
  const deletePost = async (post) => {
    try {
      const res = await fetch('/post/delete', {
        method: 'DELETE',
        body: JSON.stringify({
          post_id: post.id,
        }),
        headers: { 'content-type': 'application/json' },
      });
      if (res.ok) {
        notyf.success('Post Successfully Deleted');
      }
    } catch (err) {
      notyf.error('Oops! Something went wrong. Post not deleted.');
      console.error(err);
    }
    handleHideViewPost();
  };

  return (
    <Modal backdrop="static" show={showViewPost} onHide={handleHideViewPost}>
      <SavePostModal
        showSavePost={showSavePost}
        handleHideSavePost={handleHideSavePost}
        selectedPost={selectedPost}
      />
      <Modal.Header className={'viewPostHeader d-block text-center'}>
        {selectedPost?.title}
      </Modal.Header>
      <Image src={selectedPost.image} />
      <Modal.Body>{selectedPost?.body}</Modal.Body>
      <ButtonGroup>
        <Button variant="success" onClick={() => setShowSavePost(true)}>
          Edit
        </Button>
        <Button variant="danger" onClick={() => deletePost(selectedPost)}>
          Delete
        </Button>
        <Button variant="secondary" onClick={handleHideViewPost}>
          Close
        </Button>
      </ButtonGroup>
    </Modal>
  );
}

import './EditPostModal.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import { Modal, Image, Button, ButtonGroup } from 'react-bootstrap';

import React from 'react';

// function updatePost(post){
//   try{
//     let res = await(await fetch('/api/updatePost', {
//       method: "PUT",
//       headers: {"return_type": "application/json"},
//       body: {

//       }
//     }))
//   }catch(err)
// }

export function EditPostModal(props) {
  const { selectedPost, showEditPost, handleHideEditPost } = props;

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
        console.log('YEAH BOI BYEBYE POST, AAAAND TOAST ME');
      }
    } catch (err) {
      console.error(err);
    }
    handleHideEditPost();
  };

  return (
    <Modal backdrop="static" show={showEditPost} onHide={handleHideEditPost}>
      <Modal.Header className={'editPostHeader d-block text-center'}>
        {selectedPost?.title}
      </Modal.Header>
      <Image src={selectedPost.image} />
      <Modal.Body>{selectedPost?.body}</Modal.Body>
      <ButtonGroup>
        <Button variant="success">Save</Button>
        <Button variant="danger" onClick={() => deletePost(selectedPost)}>
          Delete
        </Button>
        <Button variant="secondary" onClick={handleHideEditPost}>
          Close
        </Button>
      </ButtonGroup>
    </Modal>
  );
}

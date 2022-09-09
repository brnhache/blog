import './SavePostModal.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Modal, Form } from 'react-bootstrap';
import React from 'react';

import { Notyf } from 'notyf';
import 'notyf/notyf.min.css';

/**This is my notyf object with all its toasty methods */
const notyf = new Notyf();

// Returns an image as base64 string to save directly in the DB
function readFileAsync(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => {
      resolve(reader.result);
    };

    reader.onerror = reject;

    reader.readAsDataURL(file);
  });
}

// This component will Update or Create depending on whether props include selectedPost
export function SavePostModal(props) {
  const { showSavePost, handleHideSavePost, selectedPost } = props;
  const action = selectedPost ? 'Edit' : 'Create';

  // Get the data from the form and pass it to the backend
  const handleSavePost = async (event) => {
    event.preventDefault();
    if (!event.target.newPostTitle.value || !event.target.newPostBody.value) {
      notyf.error('Hey man, you gotta fill out the form!');
      return;
    }
    try {
      const newImage = event.target.newPostImage.files[0];
      let newImageBase64 = false;
      if (newImage) {
        newImageBase64 = await readFileAsync(newImage);
      } else {
        newImageBase64 = selectedPost.image;
      }

      //At this point...should they just be separated? :(
      const body = selectedPost
        ? {
          title: event.target.newPostTitle.value,
          body: event.target.newPostBody.value,
          image: newImageBase64
            ? newImageBase64
            : 'https://picsum.photos/400/150',
          id: selectedPost.id,
        }
        : {
          title: event.target.newPostTitle.value,
          body: event.target.newPostBody.value,
          image: newImageBase64
            ? newImageBase64
            : 'https://picsum.photos/400/150',
        };
      const route = selectedPost ? '/post/update' : '/post/create';
      const res = await fetch(route, {
        method: selectedPost ? 'PUT' : 'POST',
        body: JSON.stringify(body),
        headers: { 'content-type': 'application/json' },
      });
      if (res.ok) {
        notyf.success('Post Created!');
      }
    } catch (err) {
      notyf.error('Something went wrong, post not saved!');
      console.error('server error');
    }
    handleHideSavePost();
  };

  return (
    <Modal
      fullscreen={true}
      show={showSavePost}
      onHide={handleHideSavePost}
      backdrop="static"
    >
      <Modal.Header closeButton={true}>
        <Modal.Title>{action} Post</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSavePost}>
          <Form.Label className="newPostFormLabel">Title</Form.Label>
          <Form.Control
            className="mb-3"
            type="text"
            name="newPostTitle"
            defaultValue={selectedPost?.title}
          />
          <Form.Label className="newPostFormLabel">Body</Form.Label>
          <Form.Control
            className="mb-3"
            as="textarea"
            name="newPostBody"
            defaultValue={selectedPost?.body}
          />
          <Form.Label className="newPostFormLabel">Image</Form.Label>
          <Form.Control className="mb-3" type="file" name="newPostImage" />
          <Button type="submit">Submit</Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

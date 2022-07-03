import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import {
  Button,
  Card,
  Container,
  Navbar,
  Modal,
  Form,
  Row,
  Col,
} from 'react-bootstrap';

import React, { useState, useEffect } from 'react';

/**
 *
 * TODO:
 *
 * finish crud operations
 * openvpn
 * pgadmin access remotely in browser
 * open modal on card click, show body, edit/delete buttons
 */
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

function chunkArray(arr, size) {
  const groupedArray = [];
  for (let i = 0; i < arr.length; i += size) {
    groupedArray.push(arr.slice(i, i + size));
  }
  return groupedArray;
}

function App() {
  const [showNewPost, setShowNewPost] = useState(false);
  const [postList, setPostList] = useState([]);

  useEffect(() => {
    loadPosts();
  }, []);

  const loadPosts = async () => {
    try {
      const data = (await (await fetch('/post/getAll')).json()).sort((a, b) => {
        return b.id - a.id;
      });
      setPostList(chunkArray(data, 5));
    } catch (err) {
      console.log(err);
    }
  };

  const handleAddPost = async (event) => {
    event.preventDefault();
    if (!event.target.newPostTitle.value || !event.target.newPostBody.value) {
      console.log('invalid form, pop ze toast');
      return;
    }
    try {
      const newImage = event.target.newPostImage.files[0];
      let newImageBase64 = false;
      if (newImage) {
        newImageBase64 = await readFileAsync(newImage);
      }
      const newPost = {
        title: event.target.newPostTitle.value,
        body: event.target.newPostBody.value,
        image: newImageBase64
          ? newImageBase64
          : 'https://picsum.photos/400/150',
      };
      const res = await fetch('/post/create', {
        method: 'POST',
        body: JSON.stringify(newPost),
        headers: { 'content-type': 'application/json' },
      });
      if (res.ok) {
        console.log('post created! put up a toast!');
      }
    } catch (err) {
      console.log('server error');
    }
    loadPosts();
    handleHide();
  };

  const handleShow = () => setShowNewPost(true);
  const handleHide = () => setShowNewPost(false);

  return (
    <div className="App">
      <header className="App-header">
        <Container>
          <Navbar>
            <Container>
              <Navbar.Brand href="#home">This is Blog.</Navbar.Brand>
              <Button onClick={handleShow}>New Post</Button>
              <Navbar.Collapse className="justify-content-end">
                <Navbar.Text>
                  Signed in as: <a href="#login">Mark Otto</a>
                </Navbar.Text>
              </Navbar.Collapse>
            </Container>
          </Navbar>
        </Container>
        <Container>
          <Modal show={showNewPost} onHide={handleHide} backdrop="static">
            <Modal.Header closeButton={true}>
              <Modal.Title>Create Post</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form onSubmit={handleAddPost}>
                <Form.Label className="newPostFormLabel">Title</Form.Label>
                <Form.Control
                  className="mb-3"
                  type="text"
                  name="newPostTitle"
                />
                <Form.Label className="newPostFormLabel">Body</Form.Label>
                <Form.Control
                  className="mb-3"
                  as="textarea"
                  name="newPostBody"
                />
                <Form.Label className="newPostFormLabel">Image</Form.Label>
                <Form.Control
                  className="mb-3"
                  type="file"
                  name="newPostImage"
                />
                <Button type="submit">Submit</Button>
              </Form>
            </Modal.Body>
          </Modal>
          {postList.map((row, idx) => {
            return (
              <Row key={idx}>
                {row.map((post) => {
                  return (
                    <Col key={post.id}>
                      <Card>
                        <Card.Img className="postImage" src={post.image} />
                        <Card.Title className="postTitle">
                          {post.title}
                        </Card.Title>
                      </Card>
                    </Col>
                  );
                })}
              </Row>
            );
          })}
        </Container>
      </header>
    </div>
  );
}

export default App;

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import { Button, Card, Container, Navbar, Row, Col } from 'react-bootstrap';

import React, { useState, useEffect } from 'react';
import { ViewPostModal } from './components/view_post_modal/ViewPostModal';
import { SavePostModal } from './components/save_post_modal/SavePostModal';

/**
 *
 * @param {*} arr
 * @param {*} size
 * @returns 2d array for displaying posts in a grid
 */
function chunkArray(arr, size) {
  const groupedArray = [];
  for (let i = 0; i < arr.length; i += size) {
    groupedArray.push(arr.slice(i, i + size));
  }
  return groupedArray;
}

/**
 *
 * @returns Main entry point to This is Blog
 */
function App() {
  const [showSavePost, setShowSavePost] = useState(false);
  const [showViewPost, setShowViewPost] = useState(false);
  const [selectedPost, setSelectedPost] = useState({});
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
      console.error(err);
    }
  };

  const handleShowSavePost = () => setShowSavePost(true);
  const handleHideSavePost = () => {
    loadPosts();
    setShowSavePost(false);
  };

  const handleShowViewPost = (post) => {
    setSelectedPost(post);
    setShowViewPost(true);
  };
  const handleHideViewPost = () => {
    loadPosts();
    setShowViewPost(false);
  };

  return (
    <div className="App">
      <header className="App-header">
        <Container>
          <Navbar>
            <Container>
              <Navbar.Brand href="#home">This is Blog.</Navbar.Brand>
              <Button onClick={handleShowSavePost} variant="success">
                New Post
              </Button>
              <Navbar.Collapse className="justify-content-end">
                <Navbar.Text>
                  Signed in as: <a href="#login">Mark Otto</a>
                </Navbar.Text>
              </Navbar.Collapse>
            </Container>
          </Navbar>
        </Container>
        <Container>
          <ViewPostModal
            showViewPost={showViewPost}
            handleHideViewPost={handleHideViewPost}
            selectedPost={selectedPost}
          />
          <SavePostModal
            showSavePost={showSavePost}
            handleHideSavePost={handleHideSavePost}
            selectedPost={false}
          />
          {postList.map((row, idx) => {
            return (
              <Row key={idx}>
                {row.map((post) => {
                  return (
                    <Col key={post.id}>
                      <Card onClick={() => handleShowViewPost(post)}>
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

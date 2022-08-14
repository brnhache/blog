import './LoginModal.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, Form, Button } from 'react-bootstrap';
import { Notyf } from 'notyf';
import 'notyf/notyf.min.css';

/**This is my notyf object with all its toasty methods */
const notyf = new Notyf();

// import { Button, Card, Navbar, Row, Col } from 'react-bootstrap';

// import React, { useState, useEffect } from 'react';
// import { ViewPostModal } from './components/view_post_modal/ViewPostModal';
// import { SavePostModal } from './components/save_post_modal/SavePostModal';

/**
 *
 * @returns Main entry point to This is Blog
 */
export function LoginModal(props) {
    const { showLogin, handleHideLogin } = props;


    //   useEffect(() => {
    //     loadPosts();
    //   }, []);

    const handleLogin = async (event) => {
        event.preventDefault();
        const username = event.target.username.value;
        const password = event.target.password.value;
        const res = await fetch(`/users/login?username=${username}&password=${password}`);
        if (res.ok) {
            notyf.success('Login Success');
        } else {
            notyf.error('Login Failed');
        }
    };

    return (
        <Modal
            show={showLogin}
            onHide={handleHideLogin}
            backdrop="static"
        >
            <Modal.Header closeButton={true}>
                <Modal.Title>Login</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleLogin}>
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                        className="mb-3"
                        type="text"
                        name="username"
                    />
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        className="mb-3"
                        type="password"
                        name="password"
                    />
                    <Button type="submit" variant="success">Login</Button>
                    <Button onClick={handleHideLogin} variant="danger">Cancel</Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

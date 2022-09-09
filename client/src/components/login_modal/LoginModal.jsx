import { useState, useEffect } from 'react';
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

export function LoginModal(props) {
    const { showLogin, handleHideLogin } = props;
    const [showCreateAccountForm, setShowCreateAccountForm] = useState(false);

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

    const handleCreateAccount = async (event) => {
        const username = event.target.username.value;
        const password = event.target.password.value;
        const res = await fetch(`/users/create?username=${username}&password=${password}`);
        if (res.ok) {
            notyf.success('Account Created!');
        } else {
            notyf.error('Account Creation Failed');
        }
    };

    const handleShowCreateAccountForm = () => {
        setShowCreateAccountForm(true);
    };

    const handleHideCreateAccountForm = () => {
        setShowCreateAccountForm(false);
    };

    const title = showCreateAccountForm ? "Create A New Account" : "Login";


    return (
        <Modal
            show={showLogin}
            onHide={handleHideLogin}
            backdrop="static"
        >
            <Modal.Header closeButton={true}>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {!showCreateAccountForm &&
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
                        <Button onClick={handleHideLogin} variant="danger">Close</Button>
                        <Button className="showCreateAccountFormButton" onClick={handleShowCreateAccountForm} variant="info">Create Account</Button>
                    </Form>
                }
                {showCreateAccountForm &&
                    <Form onSubmit={handleCreateAccount}>
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            className="mb-3"
                            type="email"
                            name="email"
                        />
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
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control
                            className="mb-3"
                            type="password"
                            name="passwordConfirm"
                        />
                        <Button type="submit" variant="success">Create</Button>
                        <Button onClick={handleHideCreateAccountForm} variant="danger">Cancel</Button>
                    </Form>
                }
            </Modal.Body>
        </Modal>
    );
};

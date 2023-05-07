import React, {useState} from 'react';
import {Button, Form, InputGroup, Modal} from 'react-bootstrap';

const loginPageStyles = {
    title: {
        fontSize: '2rem',
        fontWeight: 'bold',
        color: '#333333',
    },
    label: {
        fontSize: '1.2rem',
        color: '#333333',
        marginBottom: '0.5rem',
    },
    input: {
        backgroundColor: '#f2f2f2',
        borderColor: '#f2f2f2',
        color: '#333333',
    },
    inputIcon: {
        backgroundColor: '#f2f2f2',
        borderColor: '#f2f2f2',
        color: '#333333',
    },
    submitButton: {
        backgroundColor: '#0069d9',
        borderColor: '#0069d9',
        fontWeight: 'bold',
        marginTop: '2rem',
    },
    forgotButton: {
        fontWeight: 'bold',
        marginTop: '2rem',
    },
    closeButton: {
        color: '#333333',
    },
    invalidFeedback: {
        fontSize: '0.8rem',
    },
};

// eslint-disable-next-line react/prop-types
export default function Login({show, handleClose}) {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const [validationErrors, setValidationErrors] = useState({});

    const validateForm = (forgotPassword) => {
        const errors = {};

        if (!formData.email) {
            errors.email = 'Please enter an email';
        } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
            errors.email = 'Please enter a valid email address';
        }

        if (!forgotPassword && !formData.password) {
            errors.password = 'Please enter a password';
        }

        setValidationErrors(errors);

        return Object.keys(errors).length === 0;
    };

    const handleChange = (event, key) => {
        setFormData((prevFormData) => ({
            ...prevFormData,
            [key]: event.target.value,
        }));
    };

    const handleLoginSubmit = (event) => {
        event.preventDefault();

        if (validateForm(false)) {
            console.log(formData);
            handleClose();
        }
    };

    const handleForgotPassword = (event) => {
        event.preventDefault();

        if (validateForm(true)) {
            console.log(`Forgot password for email: ${formData.email}`);
        }
    };

    return (
        <Modal show={show} onHide={handleClose} centered>
            <Modal.Header closeButton>
                <Modal.Title style={loginPageStyles.title}>Login</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label style={loginPageStyles.label}>Email address</Form.Label>
                        <InputGroup>
                            <InputGroup.Text style={loginPageStyles.inputIcon}>@</InputGroup.Text>
                            <Form.Control
                                type="email"
                                placeholder="Enter email"
                                value={formData.email}
                                onChange={(e) => handleChange(e, 'email')}
                                style={loginPageStyles.input}
                                isInvalid={!!validationErrors.email}
                                required
                            />
                            <Form.Control.Feedback type="invalid" style={loginPageStyles.invalidFeedback}>
                                {validationErrors.email}
                            </Form.Control.Feedback>
                        </InputGroup>
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Label style={loginPageStyles.label}>Password
                        </Form.Label>
                        <InputGroup>
                            <Form.Control
                                type="password"
                                placeholder="Password"
                                value={formData.password}
                                onChange={(e) => handleChange(e, 'password')}
                                style={loginPageStyles.input}
                                isInvalid={!!validationErrors.password}
                                required
                            />
                            <InputGroup.Text style={loginPageStyles.inputIcon}>
                                <i className="bi bi-shield-lock-fill"></i>
                            </InputGroup.Text>
                            <Form.Control.Feedback type="invalid" style={loginPageStyles.invalidFeedback}>
                                {validationErrors.password}
                            </Form.Control.Feedback>
                        </InputGroup>
                    </Form.Group>

                    <div className="d-flex justify-content-between align-items-center">
                        <Button
                            variant="primary"
                            type="submit"
                            style={loginPageStyles.submitButton}
                            onClick={handleLoginSubmit}
                        >
                            Login
                        </Button>

                        <Button
                            variant="link"
                            style={loginPageStyles.forgotButton}
                            onClick={handleForgotPassword}
                        >
                            Forgot password?
                        </Button>
                    </div>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose} style={loginPageStyles.closeButton}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    )
}
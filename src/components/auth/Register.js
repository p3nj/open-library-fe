import React, {useState} from 'react';
import {Button, Form, InputGroup, Modal} from 'react-bootstrap';

const registerPageStyles = {
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
    closeButton: {
        color: '#333333',
    },
    invalidFeedback: {
        fontSize: '0.8rem',
    },
};

// eslint-disable-next-line react/prop-types
export default function Register({show, handleClose}) {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        confirmPassword: '',
    });

    const [validationErrors, setValidationErrors] = useState({});

    const validateForm = () => {
        const errors = {};

        if (!formData.email) {
            errors.email = 'Please enter an email';
        } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
            errors.email = 'Please enter a valid email address';
        }

        if (!formData.password) {
            errors.password = 'Please enter a password';
        } else if (formData.password.length < 8) {
            errors.password = 'Password must be at least 8 characters long';
        }

        if (formData.confirmPassword !== formData.password) {
            errors.confirmPassword = 'Passwords do not match';
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

    const handleSubmit = (event) => {
        event.preventDefault();

        if (validateForm()) {
            console.log(formData);
            handleClose();
        }
    };

    return (
        <Modal show={show} onHide={handleClose} centered>
            <Modal.Header closeButton>
                <Modal.Title style={registerPageStyles.title}>Register</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label style={registerPageStyles.label}>Email address</Form.Label>
                        <InputGroup>
                            <InputGroup.Text style={registerPageStyles.inputIcon}>@</InputGroup.Text>
                            <Form.Control
                                type="email"
                                placeholder="Enter email"
                                value={formData.email}
                                onChange={(e) => handleChange(e, 'email')}
                                style={registerPageStyles.input}
                                isInvalid={!!validationErrors.email}
                                required
                            />
                            <Form.Control.Feedback type="invalid" style={registerPageStyles.invalidFeedback}>
                                {validationErrors.email}
                            </Form.Control.Feedback>
                        </InputGroup>
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Label style={registerPageStyles.label}>Password</Form.Label>
                        <InputGroup>
                            <Form.Control
                                type="password"
                                placeholder="Password"
                                value={formData.password}
                                onChange={(e) => handleChange(e, 'password')}
                                style={registerPageStyles.input}
                                isInvalid={!!validationErrors.password}
                                required
                            />
                            <InputGroup.Text style={registerPageStyles.inputIcon}>
                                <i className="bi bi-shield-lock-fill"></i>
                            </InputGroup.Text>
                            <Form.Control.Feedback type="invalid" style={registerPageStyles.invalidFeedback}>
                                {validationErrors.password}
                            </Form.Control.Feedback>
                        </InputGroup>
                    </Form.Group>

                    <Form.Group controlId="formBasicConfirmPassword">
                        <Form.Label style={registerPageStyles.label}>Confirm Password</Form.Label>
                        <InputGroup>
                            <Form.Control
                                type="password"
                                placeholder="Confirm Password"
                                value={formData.confirmPassword}
                                onChange={(e) => handleChange(e, 'confirmPassword')}
                                style={registerPageStyles.input}
                                isInvalid={!!validationErrors.confirmPassword}
                                required
                            />
                            <InputGroup.Text style={registerPageStyles.inputIcon}>
                                <i className="bi bi-shield-lock-fill"></i>
                            </InputGroup.Text>
                            <Form.Control.Feedback type="invalid" style={registerPageStyles.invalidFeedback}>
                                {validationErrors.confirmPassword}
                            </Form.Control.Feedback>
                        </InputGroup>
                    </Form.Group>

                    <div className="d-grid gap-2 mb-3">
                        <Button variant="primary" type="submit" style={registerPageStyles.submitButton}>
                            Register
                        </Button>
                    </div>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose} style={registerPageStyles.closeButton}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    )
}
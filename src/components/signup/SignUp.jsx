import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { auth } from '../../FireBase';
import { createUserWithEmailAndPassword } from 'firebase/auth';

export const SignUp = () => {
    const [first, setFirst] = useState("");
    const [last, setLast] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [again, setAgain] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate(); // Initialize useNavigate

    // Handle form submit
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Basic validation
        if (password !== again) {
            setError("Passwords do not match");
            return;
        }

        try {
            await createUserWithEmailAndPassword(auth, email, password);
            console.log('Account Created');
            // Redirect to home page after successful sign-up
            navigate('/'); // Use navigate to redirect
        } catch (error) {
            console.error(error);
            setError(error.message); // Update error state to show the error message
        }
    };

    return (
        <div className='fum'>
            <div className='scold'>
                <h3>Register with Us and Discover!</h3>
            </div>
            <div className='sign-cont'>
                <form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Label>First Name</Form.Label>
                        <Form.Control
                            className='form'
                            type="text"
                            placeholder="Enter first name"
                            value={first}
                            onChange={(e) => setFirst(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control
                            className='form'
                            type="text"
                            placeholder="Enter last name"
                            value={last}
                            onChange={(e) => setLast(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            className='form'
                            type="email"
                            placeholder="Enter email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            className='form'
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control
                            className='form'
                            type="password"
                            placeholder="Enter Password Again"
                            value={again}
                            onChange={(e) => setAgain(e.target.value)}
                        />
                    </Form.Group>

                    <p>Already Have An Account? <a href="/signin">Sign In Here</a></p>
                    <Button variant="primary" type="submit">
                        Continue
                    </Button>
                    {error && <div className='error-msg'>{error}</div>}
                </form>
            </div>
        </div>
    );
};

export default SignUp;

import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
// import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { auth, db } from '../../FireBase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { setDoc, doc } from 'firebase/firestore';
import { toast } from 'react-toastify';


export const SignUp = () => {
    const [first, setFirst] = useState("");
    const [last, setLast] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [again, setAgain] = useState("");
    const [error, setError] = useState("");
    // const navigate = useNavigate(); // Initialize useNavigate

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
            const user = auth.currentUser;
            localStorage.setItem('token', user.accessToken);
            localStorage.setItem('user', JSON.stringify(user));
            console.log(user);
             if (user){
                await setDoc(doc (db, 'Users', user.uid),{
                email: user.email,
                firstName: first,
                lastName: last,
                password: password
                });
             }
            console.log('Account Created');
            toast.success('Registration Successful!', {
                position: "top-center",
            });
            window.location.href = '/signin'

            // navigate('/'); // Uncomment to use navigate for redirection

        } catch (error) {
            console.log(error);
            toast.success(error.message, {
                position: "bottom-center",
            });
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

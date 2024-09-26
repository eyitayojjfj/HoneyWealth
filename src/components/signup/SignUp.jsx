import React, { useState } from 'react';
import { IoEyeSharp } from "react-icons/io5";
import { FaRegEyeSlash } from "react-icons/fa";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../../FireBase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { setDoc, doc } from 'firebase/firestore';
import { toast } from 'react-toastify';
import './signin.css';
import GoogleSign from './GoogleSign';

export const SignUp = () => {
    const [first, setFirst] = useState("");
    const [last, setLast] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [again, setAgain] = useState("");
    const [error, setError] = useState("");
    const [showPassword, setShowPassword] = useState(false); 
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        if (password !== again) {
            setError("Passwords do not match");
            return;
        }

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            localStorage.setItem('token', user.accessToken);
            localStorage.setItem('user', JSON.stringify(user));

            await setDoc(doc(db, 'Users', user.uid), {
                email: user.email,
                firstName: first,
                lastName: last,
                password: password, 
                photo: ''
            });

            console.log('Account Created');
            toast.success('Registration Successful!', {
                position: "top-center",
            });

            navigate('/'); 
        } catch (error) {
            console.error(error);
            toast.error(error.message, {
                position: "bottom-center",
            });
            setError(error.message); 
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
                            type={showPassword ? "text" : "password"} 
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <span className='eyes2' onClick={() => setShowPassword(!showPassword)} style={{ cursor: 'pointer' }}>
                            {showPassword ? <FaRegEyeSlash /> : <IoEyeSharp />}
                        </span>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicConfirmPassword">
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control
                            className='form'
                            type={showPassword ? "text" : "password"} 
                            placeholder="Enter Password Again"
                            value={again}
                            onChange={(e) => setAgain(e.target.value)}
                        />
                        <span className='eyes2' onClick={() => setShowPassword(!showPassword)} style={{ cursor: 'pointer' }}>
                            {showPassword ? <FaRegEyeSlash /> : <IoEyeSharp />}
                        </span>
                    </Form.Group>
                    
                    <Button className='sign-button' variant="primary" type="submit">
                        Continue
                    </Button>  
                    <p className='already'>Already Have An Account? <a href="/signin">Sign In Here</a></p>
                  
                    {error && <div className='error-msg'>{error}</div>}
                </form>
            </div>
            <GoogleSign/>
        </div>
    );
};

export default SignUp;

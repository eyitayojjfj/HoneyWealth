import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import { IoEyeSharp } from "react-icons/io5";
import { FaRegEyeSlash } from "react-icons/fa";
import '../signup/signin.css';
import Form from 'react-bootstrap/Form';
import { auth } from '../../FireBase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { toast } from 'react-toastify';
import GoogleSign from '../signup/GoogleSign';
import { useNavigate } from 'react-router-dom';

const SignIn = () => {
    const navigate = useNavigate();
    const [mail, setMail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            if (user) {
                navigate('/');
            }
        });

        return () => unsubscribe(); 
    }, [navigate]);

    const handlePasswordToggle = () => {
        setShowPassword(prev => !prev);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        try {
            const userCredential = await signInWithEmailAndPassword(auth, mail, password);
            const user = userCredential.user;
            localStorage.setItem('token', user.accessToken);
            localStorage.setItem('user', JSON.stringify(user));
            toast.success('Login Successful!', {
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

    const handleReset = () => {
        navigate('/forgotpassword');
    };

    return (
        <div className='fum'>
            <div className='scold'>
                <h3>Welcome! Sign In Now!</h3>
            </div>
            <div className='sign-cont'>
                <form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control
                            className='form'
                            type="email"
                            placeholder="Enter email"
                            value={mail}
                            onChange={(e) => setMail(e.target.value)}
                            required
                        />
                    </Form.Group>

                    <Form.Group className="mb-3 position-relative" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            className='form'
                            type={showPassword ? "text" : "password"}
                            autoComplete='current-password'
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <div
                            onClick={handlePasswordToggle}
                            className={`eyes ${showPassword ? 'eye' : 'eye-slash'}`}
                            style={{ cursor: 'pointer', transform: 'translateY(-50%)' }}
                        >
                            {showPassword ? <FaRegEyeSlash /> : <IoEyeSharp />}
                        </div>
                    </Form.Group>
                    <Button className='sign-button' variant="primary" type="submit">
                        Continue
                    </Button>
                    <p onClick={handleReset} className='pass'><a href="/forgotpassword">Forgot Password?</a></p>
                    <p className='already'>Don't have an account yet? <a href="/signup">Create an Account</a></p>

                    
                    {error && <div className='error-msg'>{error}</div>}
                </form>
            </div>
            <GoogleSign />
        </div>
    );
};

export default SignIn;

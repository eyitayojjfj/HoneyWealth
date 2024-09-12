import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { auth } from '../../FireBase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { toast } from 'react-toastify';
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";


// import { useNavigate } from 'react-router-dom';

const SignIn = () => {
    // const navigate = useNavigate();

    const [mail, setMail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [showPassword, setShowPassword] = useState(false);


    const handlePasswordToggle = () => {
      setShowPassword(!showPassword);
    };


    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await signInWithEmailAndPassword(auth, mail, password);
            const user = auth.currentUser;
            localStorage.setItem('token', user.accessToken);
            localStorage.setItem('user', JSON.stringify(user));
            toast.success('Login Successful!', {
                position: "top-center",
            });
            window.location.href = '/'
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
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              className='form'
              type="password"
              autoComplete='current-password'
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
              <div
          onClick={handlePasswordToggle}
          className={`position-absolute top-50 end-0 me-2 ${showPassword ? <FaRegEyeSlash/> : <FaRegEye/> }`}
          style={{ cursor: 'pointer', transform: 'translateY(-50%)' }}
        ></div>
          </Form.Group>
          <p className='pass'><a href="">Forgot Password?</a></p>
          <p>Don't have an account yet? <a href="/signup">Create an Account</a></p>
          
          {error && <div className='error-msg'>{error}</div>}
          <Button variant="primary" type="submit">
            Continue
          </Button>
        </form>
      </div>
    </div>
  
    );
};

export default SignIn;

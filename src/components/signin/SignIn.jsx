import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { auth } from '../../FireBase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { toast } from 'react-toastify';
// import { useNavigate } from 'react-router-dom';

const SignIn = () => {
    // const navigate = useNavigate();

    const [mail, setMail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await signInWithEmailAndPassword(auth, mail, password);
            toast.success('Login Successful!', {
                position: "top-center",
            });
            window.location.href = '/account'
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
          </Form.Group>
          
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

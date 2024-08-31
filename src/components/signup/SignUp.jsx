import React from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState } from "react";

export const SignUp = () => {
    const [first, setFirst] = useState ("")
    const [last, setLast] = useState ("")
    const [mail, setMail] = useState ("")
    const [password, setPassword] = useState ("")
    const [again, setAgain] = useState ("")

 // handle form submit
 const handleSubmit = (e) => { 
  e.preventDefault();

  let user ={
    FirstName:  first,
    LastName:  last,
    Email:  mail,
    Password:  password,
    confirmPassword:  again,
  }

  // get users list from local storage
  // check if users list is empty

  const users = JSON.parse(localStorage.getItem('users')) || [];

  if (users.length > 0) {
    users.push(user)
    localStorage.setItem("users",  JSON.stringify(users));
  
} else {
  users.push(user)
  localStorage.setItem("users",  JSON.stringify(users)); 
}

 setFirst: "";
 setLast: "";
 setMail: "";
 setPassword: "";
 setAgain: ""
}



    return (
      <div className='fum'>
      <div className='scold'><h3>Register with Us and Discover!</h3></div>
        
      <div  className=' sign-cont '>
      <form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>First Name</Form.Label>
        <Form.Control className='form' type="text" placeholder="Enter first name" value={first}
              onChange={(e) => setFirst(e.target.value)} />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Last Name</Form.Label>
        <Form.Control className='form' type="text" placeholder="Enter last name"  value={last}
              onChange={(e) => setLast(e.target.value)} />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>UserName</Form.Label>
        <Form.Control className='form' type="email" placeholder="Enter email"  value={mail}
              onChange={(e) => setMail(e.target.value)} />

        <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Password</Form.Label>
        <Form.Control className='form' type="password" placeholder="Password"  value={password}
              onChange={(e) => setPassword(e.target.value)} />
      </Form.Group>
       
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label> Confirm Password</Form.Label>
        <Form.Control className='form' type="password" placeholder="Enter Password Again"  value={again}
              onChange={(e) => setAgain(e.target.value)} />
      </Form.Group>
      <p>Already Have An Account? <a href="/signin">Sign In Here</a> </p>
      <Button variant="primary" type="submit">
        Continue
      </Button>
    </form>
    </div>
        </div>
      );
    }

export default SignUp
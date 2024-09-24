import React, { useState } from 'react';
import './ResetPasswordForm.css';
import { sendPasswordResetEmail } from 'firebase/auth';
import {  db } from '../../FireBase';


const Reset = async () => {
  const [email, setEmail] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await sendPasswordResetEmail(db, email);
      console.log('Password reset email sent successfully');
    } catch (error) {
      console.error('Error sending password reset email:', error);
    }
  };

  return (
    <div className="reset-password-container">
      <h2>Reset Password</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email Address</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="Enter your email"
          />
        </div>
        <button className='RST' type="submit">Send Reset Link</button>
      </form>
    </div>
  );
};

export default Reset;

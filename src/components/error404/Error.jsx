import React from 'react'
import { Link } from 'react-router-dom'

const Error = () => {
  return (
    <div className='container mt-4'>
     <h1>404 Not Found</h1>
      <Link to='/' >Go Back To Home</Link>
    </div>
  )
}

export default Error
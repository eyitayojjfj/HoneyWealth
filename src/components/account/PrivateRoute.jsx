import React from 'react'

const PrivateRoute = () => {
    const token = localStorage.getItem('token');
  return (
      token ? <Outlet /> : <Navigate to="/signin" />
  )
}

export default PrivateRoute
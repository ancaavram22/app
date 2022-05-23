import React from 'react';
import '../input.css';
import Navbar from '../template/Navbar';
import LoginForm from '../template/LoginForm';

function Login() {
  return (
    <div>
      <Navbar value="Login" />
      <LoginForm />
    </div>
  );
}

export default Login;

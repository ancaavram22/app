/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import Navbar from '../template/Navbar.js';
import RegForm from '../template/RegForm.js';
import '../input.css';

export default function Register() {
  return (
    <div className="w-screen h-screen">
      <Navbar value="Register" />
      <RegForm />
    </div>
  );
}

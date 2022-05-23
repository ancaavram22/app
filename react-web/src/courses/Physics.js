import React from 'react';
import Navbar from '../template/Navbar';
import '../input.css';
import Note from '../template/Note';

export default function Physics() {
  return (
    <div className="">
      <Navbar value="Physics notes" />
      <Note />
    </div>
  );
}

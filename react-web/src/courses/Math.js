import React from 'react';
import Navbar from '../template/Navbar';
import '../input.css';
import Note from '../template/Note';

export default function Math() {
  return (
    <div className="">
      <Navbar value="Math notes" />
      <Note />
    </div>
  );
}

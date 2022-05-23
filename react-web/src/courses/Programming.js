import React from 'react';
import Navbar from '../template/Navbar';
import '../input.css';
import Note from '../template/Note';

export default function Programming() {
  return (
    <div className="">
      <Navbar value="Programming notes" />
      <Note />
    </div>
  );
}

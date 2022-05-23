/* eslint-disable global-require */
import React from 'react';
import '../input.css';
import { Link } from 'react-router-dom';
import Navbar from '../template/Navbar.js';

function LandingPage() {
  return (
    <div>
      <Navbar value="Home" />
      <h2 className="text-3xl absolute top-32 left-36">My notes</h2>
      {/* <div className="absolute top-72 left-56 font-semibold"> */}
      <div className="absolute top-1/3 left-10">
        <div className="flex justify-center gap-10 flex-wrap">
          <Link to="/chemistry" className="text-center">
            Chemistry
            <img src={require('../imgs/pic1.jpg')} alt="chemistry study group" className="w-56 h-40 mx-28 mb-10" />
          </Link>

          <Link to="/math" className="inline-block text-center">
            Math
            <img src={require('../imgs/pic2.jpg')} alt="math study group" className="w-56 h-40 mx-28 mb-10" />
          </Link>

          <Link to="/programming" className="inline-block text-center">
            Programming
            <img src={require('../imgs/pic3.jpg')} alt="programming study group" className="w-56 h-40 mx-28 mb-10" />
          </Link>

          <Link to="/english" className="inline-block text-center">
            English
            <img src={require('../imgs/pic4.jpg')} alt="english study group" className="w-56 h-40 mx-28 mb-10" />
          </Link>

          <Link to="/physics" className="inline-block text-center">
            Physics
            <img src={require('../imgs/pic5.jpg')} alt="physics study group" className="w-56 h-40 mx-28 mb-10" />
          </Link>

          <Link to="/grammar" className="inline-block text-center">
            Grammar
            <img src={require('../imgs/pic6.jpg')} alt="grammar study group" className="w-56 h-40 mx-28 mb-10" />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;

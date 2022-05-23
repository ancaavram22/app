import React from 'react';
import '../input.css';
import { Link } from 'react-router-dom';

export default function LoginForm() {
  return (
    <div className="relative top-52 w-full flex justify-center">
      <form>
        <label htmlFor="username" className="py-3 block">
          Username:
          <input type="text" id="username" className="border border-black rounded block w-60" />
        </label>
        <label htmlFor="password" className="py-3 block">
          Password:
          <input type="password" id="password" className="border border-black rounded block w-60" />
        </label>
        <Link to="/">
          <input type="submit" className="bg-white border border-black w-20 mt-4 rounded relative left-1/3 hover:bg-slate-200 cursor-pointer" value="Sign in" />
        </Link>
        <p className="py-4">
          Don&apos;t have an account?
          {' '}
          <Link to="/register" className="text-sky-600 underline hover:text-cyan-400">Sign up</Link>
        </p>
      </form>
    </div>
  );
}

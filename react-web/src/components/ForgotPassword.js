import React from 'react';
import Navbar from '../template/Navbar';

function ForgotPassword() {
  return (
    <>
      <Navbar value="Change password" />
      <div className="relative top-52 flex justify-center">
        <form>
          <label htmlFor="code" className="block py-2">
            Enter the code:
            <input type="text" id="code" className="block border-slate-800 border rounded" />
          </label>
          <label htmlFor="new-password" className="block py-2">
            New Password:
            <input type="password" id="new-password" className="block border-slate-800 border rounded" />
          </label>
          <label htmlFor="rep-password" className="block py-2">
            Repeat Password:
            <input type="password" id="rep-password" className="block border-slate-800 border rounded" />
          </label>
          <input type="submit" value="Confirm" className="rounded border-black border my-4 bg-white hover:bg-slate-100 w-24 cursor-pointer relative left-1/4" />
        </form>
      </div>
    </>
  );
}

export default ForgotPassword;

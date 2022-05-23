import React from 'react';
import { Link } from 'react-router-dom';

export default function Note() {
  return (
    <div className="relative top-10 left-56 w-4/5 border border-black rounded">
      <textarea rows={20} className="w-full border" />
      <div className="flex justify-center">
        <Link to="/">
          <button type="button" className="border border-black rounded w-20 hover:bg-slate-100 mb-1 mr-2">Go back</button>
        </Link>
        <button type="button" className="border border-black rounded w-20 hover:bg-slate-100 mb-1">Save</button>
      </div>
    </div>
  );
}

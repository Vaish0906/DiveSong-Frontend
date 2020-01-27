import React from 'react';
import { Link } from 'react-router-dom';

export default () => {
  return (
    <div>
      <h1 className="display-4">
        <span className="text-danger"> 409</span> Username already exists
      </h1>
      <Link to="/sign-in" className="lead">
        Sign In
      </Link>
      <br />
      <Link to="/homepage" className="lead">
        You can still listen to music though
      </Link>
    </div>
  );
};

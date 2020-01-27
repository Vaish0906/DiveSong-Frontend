import React from 'react';
import { Link } from 'react-router-dom';

export default () => {
  return (
    <div>
      <h1 className="display-4">
        <span className="text-danger"> 401</span> Incorrect username or password
      </h1>
      <p className="lead">Incorrect Username or Password.</p>
      <br />
      <Link to="/homepage" className="lead">
        You can still listen to music though
      </Link>
    </div>
  );
};

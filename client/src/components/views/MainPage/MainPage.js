import React from 'react';
import { Link } from 'react-router-dom';

function MainPage() {
  return (
    <>
      <h3>MainPage</h3>
      <Link to="/login">login</Link>
    </>
  );
}

export default MainPage;

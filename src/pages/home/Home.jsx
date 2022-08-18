import React from 'react';
import { getUserName } from '../../services/auth';

function Home() {
  return (
    <>
      <span>Hello {getUserName()}</span>
    </>
  );
}

export default Home;
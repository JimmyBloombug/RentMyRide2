import React from 'react';
import { Canvas } from 'react-three-fiber';
import { Html } from 'drei';

const Home = () => {
  return (
    <Canvas
      colorManagement
      camera={{ position: [0, 0, 120], fov: 70 }}
    ></Canvas>
  );
};

export default Home;

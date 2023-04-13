import React, { useState, useEffect, useRef } from 'react';

const MovingDiv = () => {
  const [xPos, setXPos] = useState(0);
  const [yPos, setYPos] = useState(0);
  const keyDownRef = useRef({});

  const handleKeyDown = (event) => {
    const { key } = event;
    keyDownRef.current[key] = true;
  };

  const handleKeyUp = (event) => {
    const { key } = event;
    delete keyDownRef.current[key];
  };

  const updatePosition = () => {
    console.log('tick')
    if (keyDownRef.current.ArrowLeft) {
      setXPos((xPos) => xPos - 10);
    }
    if (keyDownRef.current.ArrowRight) {
      setXPos((xPos) => xPos + 10);
    }
    if (keyDownRef.current.ArrowUp) {
      setYPos((yPos) => yPos - 10);
    }
    if (keyDownRef.current.ArrowDown) {
      setYPos((yPos) => yPos + 10);
    }

    requestAnimationFrame(updatePosition);
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('keyup', handleKeyUp);
    requestAnimationFrame(updatePosition);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  const style = {
    position: 'absolute',
    left: xPos,
    top: yPos,
    width: '50px',
    height: '50px',
    backgroundColor: 'red',
  };

  return <div style={style} />;
};

export default MovingDiv;

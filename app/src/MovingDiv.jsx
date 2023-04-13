import React, { useState, useEffect, useRef } from 'react';

const MovingDiv = () => {
  const [dir, setDir] = useState('s')
  const [xPos, setXPos] = useState(0);
  const [yPos, setYPos] = useState(0);
  const keyDownRef = useRef(new Set());

  const handleKeyDown = (event) => {
    const { key } = event;
    keyDownRef.current.add(key);
  };

  const handleKeyUp = (event) => {
    const { key } = event;
    keyDownRef.current.delete(key);
  };

  const updatePosition = () => {
    if (keyDownRef.current.has('a')) {
      setXPos((xPos) => xPos - 1);
      setDir('w')
    }
    if (keyDownRef.current.has('d')) {
      setXPos((xPos) => xPos + 1);
      setDir('e')
    }
    if (keyDownRef.current.has('w')) {
      setYPos((yPos) => yPos - 1);
      setDir('n')
    }
    if (keyDownRef.current.has('s')) {
      setYPos((yPos) => yPos + 1);
      setDir('s')
    }
    if (keyDownRef.current.has('s') && keyDownRef.current.has('a')) {
      setDir('sw')
    }
    if (keyDownRef.current.has('s') && keyDownRef.current.has('d')) {
      setDir('se')
    }
    if (keyDownRef.current.has('w') && keyDownRef.current.has('a')) {
      setDir('nw')
    }
    if (keyDownRef.current.has('w') && keyDownRef.current.has('d')) {
      setDir('ne')
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('keyup', handleKeyUp);

    let requestId;

    const update = () => {
      updatePosition();
      requestAnimationFrame(update);
    };

    requestId = requestAnimationFrame(update);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('keyup', handleKeyUp);
      cancelAnimationFrame(requestId);
    };
  }, []);

  return (
    <div className='App'>
      <p style={{zIndex: 2}}>Pressed keys: {Array.from(keyDownRef.current).join(',')}</p>
      <div className='char' style={{animationName: 'walk-'+ dir, top: yPos, left: xPos}}></div>
    </div>

  )
};

export default MovingDiv;

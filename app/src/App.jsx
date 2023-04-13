import { useEffect, useState, useRef, useCallback } from 'react'
import './App.css'

function App() {
  const [dir, setDir] = useState('s')
  const [keysPressed, setKeysPressed] = useState(new Set());
  const [xPos, setXPos] = useState('50px');
  const [yPos, setYPos] = useState('50px');

  useEffect(() => {
    const handleKeyDown = (event) => {
      const { key } = event;
      setKeysPressed(keysPressed => new Set([...keysPressed, key]));
    };

    const handleKeyUp = (event) => {
      const { key } = event;
      setKeysPressed(keysPressed => {
        const newKeysPressed = new Set(keysPressed);
        newKeysPressed.delete(key);
        return newKeysPressed;
      });
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('keyup', handleKeyUp);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  useEffect(() => {
    const keys = Array.from(keysPressed).join(',')
    if(keys === 'w'){
      setDir('n')
      setYPos((yPos) => yPos - 10);
    } else if(keys === 'a') {
      setDir('w')
      setXPos((xPos) => xPos - 10);
    } else if(keys === 's') {
      setDir('s')
      setYPos((yPos) => yPos + 10);
    } else if(keys === 'd') {
      setDir('e')
      setXPos((xPos) => xPos + 10);
    } else if(keys === 'a,w' || keys === 'w,a') {
      setDir('nw')
      setXPos((xPos) => xPos - 7);
      setYPos((yPos) => yPos - 7);
    } else if(keys === 'a,s' || keys === 's,a') {
      setDir('sw')
      setYPos((yPos) => yPos + 7);
      setXPos((xPos) => xPos - 7);
    } else if(keys === 'd,w' || keys === 'w,d') {
      setDir('ne')
      setYPos((yPos) => yPos - 7);
      setXPos((xPos) => xPos + 7);
    } else if(keys === 's,d' || keys === 'd,s') {
      setDir('se')
      setXPos((xPos) => xPos + 7);
      setYPos((yPos) => yPos + 7);
    }
  }, [keysPressed])

  return (
    <div className="App">
      {/* <p style={{zIndex: 2}}>Pressed keys: {Array.from(keysPressed).join(',')}</p> */}
      <div className='char' style={{animationName: 'walk-'+ dir, top: xPos, left: yPos}}></div>
    </div>
  )
}

export default App

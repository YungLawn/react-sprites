import { useState } from 'react'
import HumanIdle from './assets/spritesheets/human/idle/IsoHumanIdle-E.png'
// import HumanWalk from './assets/spritesheets/human/walk'
import './App.css'

function App() {
  const [dir,setDir] = useState('s')

  function handleKeyPress(event) {

    const { key } = event;

   if (key.keyCode === 87) {
      console.log('here')

      setDir('nw');

    } else if (key === 's' && 'd') {

      setDir('sw');

    } else if (key === 's' && 'd') {

      setDir('se');

    } else if (key === 'w') {

      setDir('n');

    } else if (key === 'a') {

      setDir('w');

    } else if (key === 's') {

      setDir('s');

    } else if (key === 'd') {

      setDir('e');

    }

  }

  return (
    <div className="App" onKeyDown={(event) => {handleKeyPress(event)}}>
      <div className='char' style={{animationName: 'walk-'+ dir}}></div>
    </div>
  )
}

export default App

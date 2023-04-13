import { useEffect, useState } from 'react'
import HumanIdle from './assets/spritesheets/human/idle/IsoHumanIdle-E.png'
// import HumanWalk from './assets/spritesheets/human/walk'
import './App.css'

function App() {
  const [dir,setDir] = useState('s')

  useEffect(( ) => {
    document.addEventListener('keydown', handleKeyPress, true)
  },[])

  // const detectKeyDown = (e) => {
  //   console.log(e.key.toString())
  // }

  const handleKeyPress = (event) => {

    const { key } = event;
    console.log(key)

    if (key === 'w') {
      setDir('n')
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

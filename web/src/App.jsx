import { useState } from 'react'
import Chart from './components/chat';
import './styles/global.less';
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Chart />
    </>
  )
}

export default App

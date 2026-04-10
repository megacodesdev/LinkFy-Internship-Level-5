import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import AppRoutes from './routes/App.Routes'
import Dashboard from './pages/Dashbord'
function App() {
  const [count, setCount] = useState(0)

  return (
    
    <>
    <div className="App">
      <Dashboard />
    </div>
    <AppRoutes />
    </>
  )
}

export default App

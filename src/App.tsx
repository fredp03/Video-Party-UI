import './App.css'
import { useState } from 'react'
import VideoPartyScreen from './components/VideoPartyScreen.tsx'
import LoginScreen from './components/LoginScreen.tsx'

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  return (
    <div className="app">
      {isLoggedIn ? (
        <VideoPartyScreen />
      ) : (
        <LoginScreen onLogin={() => setIsLoggedIn(true)} />
      )}
    </div>
  )
}

export default App

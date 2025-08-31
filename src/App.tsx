import { useState } from 'react'
import './App.css'
import VideoPartyScreen from './components/VideoPartyScreen.tsx'
import LoginScreen from './components/LoginScreen.tsx'

function App() {
  const [loggedIn, setLoggedIn] = useState(false)

  if (!loggedIn) {
    return <LoginScreen onLogin={() => setLoggedIn(true)} />
  }

  return (
    <div className="app">
      <VideoPartyScreen />
    </div>
  )
}

export default App

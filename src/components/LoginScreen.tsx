import { useState } from 'react'
import './LoginScreen.css'

interface LoginScreenProps {
  onLogin: () => void
}

const users = ['Fred', 'Avalene']

const LoginScreen = ({ onLogin }: LoginScreenProps) => {
  const [selectedUser, setSelectedUser] = useState<string | null>(null)
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (password === 'password') {
      onLogin()
    } else {
      setError('Incorrect password')
    }
  }

  if (!selectedUser) {
    return (
      <div className="login-screen">
        <h2>Who's Watching...</h2>
        <div className="user-options">
          {users.map(user => (
            <button key={user} onClick={() => setSelectedUser(user)}>
              {user}
            </button>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="login-screen">
      <button
        className="back-button"
        onClick={() => {
          setSelectedUser(null)
          setPassword('')
          setError('')
        }}
      >
        Back
      </button>
      <h2>Hi {selectedUser}</h2>
      <form onSubmit={handleSubmit} className="password-form">
        <input
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          placeholder="Password"
        />
        <button type="submit">Login</button>
      </form>
      {error && <p className="error">{error}</p>}
    </div>
  )
}

export default LoginScreen

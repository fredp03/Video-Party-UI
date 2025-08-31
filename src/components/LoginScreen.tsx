import { useState } from 'react'
import './LoginScreen.css'

const USERS = ['Avalene', 'Fred']
const PASSWORD = 'password'

interface LoginScreenProps {
  onLogin: () => void
}

export default function LoginScreen({ onLogin }: LoginScreenProps) {
  const [selectedUser, setSelectedUser] = useState<string | null>(null)
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (password === PASSWORD) {
      onLogin()
    } else {
      setError('Incorrect password')
    }
  }

  if (!selectedUser) {
    return (
      <div className="login-screen">
        <h1>Who's Watching...</h1>
        <div className="user-list">
          {USERS.map(user => (
            <button
              key={user}
              onClick={() => {
                setSelectedUser(user)
                setPassword('')
                setError('')
              }}
            >
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
      <h2>Hi {selectedUser}...</h2>
      <form onSubmit={handleSubmit} className="password-form">
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </label>
        {error && <div className="error">{error}</div>}
        <button type="submit" disabled={!password}>
          Login
        </button>
      </form>
    </div>
  )
}


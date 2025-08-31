import { useState, useEffect, useRef } from 'react'
import { animate as anime } from 'animejs'
import './ChatSection.css'

interface Message {
  id: number
  text: string
  isOwn: boolean
}

interface ChatSectionProps {
  height?: number
}

const ChatSection = ({ height }: ChatSectionProps) => {
  const [messages, setMessages] = useState<Message[]>([])
  const [inputValue, setInputValue] = useState('')
  const sectionRef = useRef<HTMLDivElement>(null)

  const handleSendMessage = () => {
    if (inputValue.trim()) {
      const newMessage: Message = {
        id: Date.now(),
        text: inputValue.trim(),
        isOwn: true
      }
      setMessages(prev => [...prev, newMessage])
      setInputValue('')
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage()
    }
  }

  const chatStyle = height ? { height: `${height}px` } : {}

  // Slide in the chat section when it mounts
  useEffect(() => {
    if (sectionRef.current) {
      anime(sectionRef.current, {
        translateX: [20, 0],
        opacity: [0, 1],
        duration: 500,
        easing: 'easeOutQuad'
      })
    }
  }, [])

  // Animate new messages subtly
  useEffect(() => {
    if (messages.length) {
      const el = document.querySelector('.chat-message:last-child')
      if (el) {
        anime(el, {
          translateY: [20, 0],
          opacity: [0, 1],
          duration: 500,
          easing: 'easeOutQuad'
        })
      }
    }
  }, [messages])

  return (
    <div className="chat-section" ref={sectionRef} style={chatStyle}>
      {/* Close button */}
      <div className="close-button-wrapper">
        <div className="close-button">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M13 1L1 13M1 1L13 13" stroke="#999" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </div>
      </div>

      {/* Messages container */}
      <div className="messages-container">
        {messages.map((message) => (
          <div key={message.id} className={`chat-message ${message.isOwn ? 'right' : 'left'}`}>
            <div className={`message-bubble ${message.isOwn ? 'green' : 'blue'}`}>
              {message.text}
            </div>
          </div>
        ))}
      </div>

      {/* Input field */}
      <div className="user-chat-input">
        <input 
          type="text" 
          placeholder="Start typing your message"
          className="chat-input-field"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={handleKeyPress}
        />
      </div>
    </div>
  )
}

export default ChatSection

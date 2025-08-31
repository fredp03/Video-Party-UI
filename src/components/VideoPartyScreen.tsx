import { useState, useRef, useEffect } from 'react'
import './VideoPartyScreen.css'
import MenuBar from './MenuBar.tsx'
import VideoPlayer from './VideoPlayer.tsx'
import VideoControls from './VideoControls.tsx'
import ChatSection from './ChatSection.tsx'

const VideoPartyScreen = () => {
  const [isChatVisible, setIsChatVisible] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [chatHeight, setChatHeight] = useState<number | undefined>(undefined)
  const mediaItemsRef = useRef<HTMLDivElement>(null)

  const toggleChat = () => {
    setIsChatVisible(!isChatVisible)
  }

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying)
  }

  useEffect(() => {
    if (isChatVisible && mediaItemsRef.current) {
      const updateChatHeight = () => {
        if (mediaItemsRef.current) {
          const rect = mediaItemsRef.current.getBoundingClientRect()
          setChatHeight(rect.height)
        }
      }
      
      updateChatHeight()
      window.addEventListener('resize', updateChatHeight)
      
      return () => window.removeEventListener('resize', updateChatHeight)
    }
  }, [isChatVisible])

  return (
    <div className="netflix-party-screen">
      <div className={`screen-container ${isChatVisible ? 'chat-visible' : 'chat-hidden'}`}>
        <MenuBar onChatToggle={toggleChat} isChatVisible={isChatVisible} />

        <div className={`horizontal-wrapper ${isChatVisible ? 'chat-open' : 'chat-closed'}`}>
          <div
            className={`media-items ${isChatVisible ? '' : 'fullscreen'}`}
            ref={mediaItemsRef}
          >
            <VideoPlayer isPlaying={isPlaying} />
            <VideoControls isPlaying={isPlaying} onTogglePlayPause={togglePlayPause} />
          </div>
          {isChatVisible && <ChatSection height={chatHeight} />}
        </div>
      </div>
    </div>
  )
}

export default VideoPartyScreen

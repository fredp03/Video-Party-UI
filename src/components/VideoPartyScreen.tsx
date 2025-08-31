import { useState, useRef, useEffect } from 'react'
import './VideoPartyScreen.css'
import MenuBar from './MenuBar.tsx'
import VideoPlayer from './VideoPlayer.tsx'
import VideoControls from './VideoControls.tsx'
import ChatSection from './ChatSection.tsx'

const VideoPartyScreen = () => {
  const [isChatVisible, setIsChatVisible] = useState(false)
  const [shouldRenderChat, setShouldRenderChat] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [chatHeight, setChatHeight] = useState<number | undefined>(undefined)
  const mediaItemsRef = useRef<HTMLDivElement>(null)

  const toggleChat = () => {
    if (isChatVisible) {
      setIsChatVisible(false)
    } else {
      setShouldRenderChat(true)
      setIsChatVisible(true)
    }
  }

  const handleChatClosed = () => {
    setShouldRenderChat(false)
  }

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying)
  }

  useEffect(() => {
    if (shouldRenderChat && mediaItemsRef.current) {
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
  }, [shouldRenderChat])

  return (
    <div className="netflix-party-screen">
      <div className={`screen-container ${isChatVisible ? 'chat-visible' : 'chat-hidden'}`}>
        <MenuBar onChatToggle={toggleChat} isChatVisible={isChatVisible} />

        <div className="horizontal-wrapper">
          <div
            className={`media-items ${isChatVisible ? '' : 'fullscreen'}`}
            ref={mediaItemsRef}
          >
            <VideoPlayer isPlaying={isPlaying} />
            <VideoControls
              isPlaying={isPlaying}
              onTogglePlayPause={togglePlayPause}
            />
          </div>
          {shouldRenderChat && (
            <ChatSection
              height={chatHeight}
              isVisible={isChatVisible}
              onRequestClose={() => setIsChatVisible(false)}
              onClosed={handleChatClosed}
            />
          )}
        </div>
      </div>
    </div>
  )
}

export default VideoPartyScreen

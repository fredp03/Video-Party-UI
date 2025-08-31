import { useState, useRef, useEffect } from 'react'
import { animate, createTimeline } from 'animejs'
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

  useEffect(() => {
    animate('.menu-bar', { opacity: 0, translateY: -20, duration: 0 })
    animate('.video-player', { opacity: 0, scale: 0.98, duration: 0 })
    animate('.video-controls', { opacity: 0, translateY: 20, duration: 0 })

    const tl = createTimeline({ duration: 600 })
    tl
      .add('.menu-bar', { opacity: 1, translateY: 0, easing: 'easeOutQuad' })
      .add(
        '.video-player',
        { opacity: 1, scale: 1, easing: 'easeOutQuad' },
        '-=200'
      )
      .add(
        '.video-controls',
        { opacity: 1, translateY: 0, easing: 'easeOutQuad' },
        '-=400'
      )
  }, [])

  return (
    <div className="netflix-party-screen">
      <div className={`screen-container ${isChatVisible ? 'chat-visible' : 'chat-hidden'}`}>
        <MenuBar onChatToggle={toggleChat} isChatVisible={isChatVisible} />
        
        {isChatVisible ? (
          <div className="horizontal-wrapper">
            <div className="media-items" ref={mediaItemsRef}>
              <VideoPlayer isPlaying={isPlaying} />
              <VideoControls isPlaying={isPlaying} onTogglePlayPause={togglePlayPause} />
            </div>
            <ChatSection height={chatHeight} />
          </div>
        ) : (
          <div className="media-items fullscreen">
            <VideoPlayer isPlaying={isPlaying} />
            <VideoControls isPlaying={isPlaying} onTogglePlayPause={togglePlayPause} />
          </div>
        )}
      </div>
    </div>
  )
}

export default VideoPartyScreen

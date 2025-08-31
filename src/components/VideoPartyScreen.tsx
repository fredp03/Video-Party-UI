import { useState, useRef, useEffect } from 'react'
import { animate } from 'animejs'
import './VideoPartyScreen.css'
import MenuBar from './MenuBar.tsx'
import VideoPlayer from './VideoPlayer.tsx'
import VideoControls from './VideoControls.tsx'
import ChatSection from './ChatSection.tsx'
import MediaSelector from './MediaSelector.tsx'

const VideoPartyScreen = () => {
  const [isChatVisible, setIsChatVisible] = useState(false)
  const [shouldRenderChat, setShouldRenderChat] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [chatHeight, setChatHeight] = useState<number | undefined>(undefined)
  const [isMediaVisible, setIsMediaVisible] = useState(false)
  const mediaItemsRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)

  const toggleChat = () => {
    if (isChatVisible) {
      setIsChatVisible(false)
    } else {
      setShouldRenderChat(true)
      setIsChatVisible(true)
    }
  }

  const toggleMedia = () => {
    setIsMediaVisible(!isMediaVisible)
  }

  const handleChatClosed = () => {
    setShouldRenderChat(false)
  }

  const togglePlayPause = () => {
    setIsPlaying(prev => !prev)
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
  }, [shouldRenderChat, isMediaVisible])

  useEffect(() => {
    if (mediaItemsRef.current) {
      animate(mediaItemsRef.current, {
        translateX: isChatVisible ? -20 : 0,
        scale: isChatVisible ? 0.98 : 1,
        duration: 400,
        easing: 'easeOutQuad'
      })
    }
  }, [isChatVisible])

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.code === 'Space') {
        e.preventDefault()
        setIsPlaying(prev => !prev)
      } else if (e.code === 'ArrowLeft') {
        if (videoRef.current) {
          videoRef.current.currentTime = Math.max(
            0,
            videoRef.current.currentTime - 10
          )
        }
      } else if (e.code === 'ArrowRight') {
        if (videoRef.current) {
          videoRef.current.currentTime = Math.min(
            videoRef.current.duration || 0,
            videoRef.current.currentTime + 10
          )
        }
      }
    }

    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [])

  return (
    <div className="netflix-party-screen">
      <div className={`screen-container ${isChatVisible ? 'chat-visible' : 'chat-hidden'}`}>
        <MenuBar
          onChatToggle={toggleChat}
          isChatVisible={isChatVisible}
          onMediaToggle={toggleMedia}
          isMediaVisible={isMediaVisible}
        />

        <div className="horizontal-wrapper">
          <div
            className={`media-items ${isChatVisible ? '' : 'fullscreen'}`}
            ref={mediaItemsRef}
          >
            <VideoPlayer isPlaying={isPlaying} videoRef={videoRef} />
            <VideoControls
              isPlaying={isPlaying}
              onTogglePlayPause={togglePlayPause}
              videoRef={videoRef}
            />
            <MediaSelector isVisible={isMediaVisible} />
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

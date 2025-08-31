import { useState, useRef, useEffect } from 'react'
import './VideoPartyScreen.css'
import MenuBar from './MenuBar.tsx'
import VideoPlayer from './VideoPlayer.tsx'
import VideoControls from './VideoControls.tsx'
import ChatSection from './ChatSection.tsx'
import MediaLibrary from './MediaLibrary.tsx'

const VideoPartyScreen = () => {
  const [isChatVisible, setIsChatVisible] = useState(false)
  const [shouldRenderChat, setShouldRenderChat] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isLibraryVisible, setIsLibraryVisible] = useState(false)
  const [progress, setProgress] = useState(0)
  const [chatHeight, setChatHeight] = useState<number | undefined>(undefined)
  const mediaItemsRef = useRef<HTMLDivElement>(null)

  const DURATION = 300 // placeholder duration in seconds

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

  const toggleLibrary = () => {
    setIsLibraryVisible(v => !v)
  }

  const handleSeek = (p: number) => {
    setProgress(p)
  }

  useEffect(() => {
    let frame: number
    const step = () => {
      setProgress(p => {
        const next = p + 1 / (DURATION * 60)
        return next >= 1 ? 1 : next
      })
      frame = requestAnimationFrame(step)
    }
    if (isPlaying) {
      frame = requestAnimationFrame(step)
    }
    return () => cancelAnimationFrame(frame)
  }, [isPlaying])

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.code === 'Space') {
        e.preventDefault()
        setIsPlaying(p => !p)
      } else if (e.code === 'ArrowRight') {
        e.preventDefault()
        setProgress(p => Math.min(1, p + 10 / DURATION))
      } else if (e.code === 'ArrowLeft') {
        e.preventDefault()
        setProgress(p => Math.max(0, p - 10 / DURATION))
      }
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [])

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
  }, [shouldRenderChat, isLibraryVisible])

  return (
    <div className="netflix-party-screen">
      <div className={`screen-container ${isChatVisible ? 'chat-visible' : 'chat-hidden'}`}>
        <MenuBar
          onChatToggle={toggleChat}
          isChatVisible={isChatVisible}
          onLibraryToggle={toggleLibrary}
          isLibraryVisible={isLibraryVisible}
        />

        <div className="horizontal-wrapper">
          <div
            className={`media-items ${isChatVisible ? '' : 'fullscreen'}`}
            ref={mediaItemsRef}
          >
            <VideoPlayer isPlaying={isPlaying} chatVisible={isChatVisible} />
            <VideoControls
              isPlaying={isPlaying}
              progress={progress}
              onTogglePlayPause={togglePlayPause}
              onSeek={handleSeek}
            />
            <MediaLibrary isVisible={isLibraryVisible} />
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

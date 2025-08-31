import { useState, useRef, useEffect, useCallback } from 'react'
import './VideoPartyScreen.css'
import MenuBar from './MenuBar.tsx'
import VideoPlayer from './VideoPlayer.tsx'
import VideoControls from './VideoControls.tsx'
import ChatSection from './ChatSection.tsx'
import MediaPicker from './MediaPicker.tsx'

const VideoPartyScreen = () => {
  const [isChatVisible, setIsChatVisible] = useState(false)
  const [shouldRenderChat, setShouldRenderChat] = useState(false)
  const [isMediaVisible, setIsMediaVisible] = useState(false)
  const [shouldRenderMedia, setShouldRenderMedia] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [chatHeight, setChatHeight] = useState<number | undefined>(undefined)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [videoSrc, setVideoSrc] = useState('https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4')
  const videoRef = useRef<HTMLVideoElement>(null)
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

  const toggleMedia = () => {
    if (isMediaVisible) {
      setIsMediaVisible(false)
    } else {
      setShouldRenderMedia(true)
      setIsMediaVisible(true)
    }
  }

  const handleMediaClosed = () => {
    setShouldRenderMedia(false)
  }

  const togglePlayPause = useCallback(() => {
    setIsPlaying(prev => !prev)
  }, [])

  const handleSeek = (time: number) => {
    if (videoRef.current) {
      videoRef.current.currentTime = time
    }
    setCurrentTime(time)
  }

  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    const onTime = () => setCurrentTime(video.currentTime)
    const onLoaded = () => setDuration(video.duration)
    video.addEventListener('timeupdate', onTime)
    video.addEventListener('loadedmetadata', onLoaded)
    return () => {
      video.removeEventListener('timeupdate', onTime)
      video.removeEventListener('loadedmetadata', onLoaded)
    }
  }, [])

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.code === 'Space') {
        e.preventDefault()
        togglePlayPause()
      } else if (e.code === 'ArrowRight' && videoRef.current) {
        videoRef.current.currentTime = Math.min(videoRef.current.currentTime + 10, duration)
      } else if (e.code === 'ArrowLeft' && videoRef.current) {
        videoRef.current.currentTime = Math.max(videoRef.current.currentTime - 10, 0)
      }
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [duration, togglePlayPause])

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
            <VideoPlayer
              isPlaying={isPlaying}
              src={videoSrc}
              isChatVisible={isChatVisible}
              videoRef={videoRef}
            />
            <VideoControls
              isPlaying={isPlaying}
              currentTime={currentTime}
              duration={duration}
              onTogglePlayPause={togglePlayPause}
              onSeek={handleSeek}
            />
            {shouldRenderMedia && (
              <MediaPicker
                isVisible={isMediaVisible}
                onRequestClose={() => setIsMediaVisible(false)}
                onClosed={handleMediaClosed}
                onSelect={(src) => {
                  setVideoSrc(src)
                  setIsMediaVisible(false)
                  setShouldRenderMedia(false)
                  setCurrentTime(0)
                }}
              />
            )}
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

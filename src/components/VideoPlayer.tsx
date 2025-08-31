import { useEffect, useRef, useState } from 'react'
import { animate } from 'animejs'
import './VideoPlayer.css'

interface VideoPlayerProps {
  isPlaying: boolean
  videoRef: React.MutableRefObject<HTMLVideoElement | null>
}

const VideoPlayer = ({ isPlaying, videoRef }: VideoPlayerProps) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const indicatorRef = useRef<HTMLDivElement>(null)
  const indicatorAnim = useRef<ReturnType<typeof animate> | null>(null)
  const [volume, setVolume] = useState(1)
  const [showControls, setShowControls] = useState(false)

  useEffect(() => {
    if (containerRef.current) {
      animate(containerRef.current, {
        opacity: [0, 1],
        scale: [0.96, 1],
        easing: 'easeOutQuad',
        duration: 600
      })
    }
  }, [])

  useEffect(() => {
    indicatorAnim.current?.cancel()
    if (isPlaying && indicatorRef.current) {
      indicatorAnim.current = animate(indicatorRef.current, {
        opacity: [0.6, 1],
        scale: [1, 1.05],
        direction: 'alternate',
        easing: 'easeInOutSine',
        duration: 800,
        loop: true
      })
    }
  }, [isPlaying])

  useEffect(() => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.play()
      } else {
        videoRef.current.pause()
      }
    }
  }, [isPlaying, videoRef])

  useEffect(() => {
    const onFsChange = () => {
      setShowControls(!document.fullscreenElement)
    }
    const vid = videoRef.current
    document.addEventListener('fullscreenchange', onFsChange)
    vid?.addEventListener('fullscreenchange', onFsChange)
    return () => {
      document.removeEventListener('fullscreenchange', onFsChange)
      vid?.removeEventListener('fullscreenchange', onFsChange)
    }
  }, [videoRef])

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const vol = parseFloat(e.target.value)
    setVolume(vol)
    if (videoRef.current) videoRef.current.volume = vol
  }

  const handleFullscreen = () => {
    const vid = videoRef.current
    if (!vid) return
    if (document.fullscreenElement) {
      document.exitFullscreen().then(() => setShowControls(true))
    } else {
      const req = vid.requestFullscreen?.()
      req?.then(() => setShowControls(false))
    }
  }

  const handleMouseLeave = () => {
    if (!document.fullscreenElement) {
      setShowControls(false)
    }
  }

  return (
    <div
      className="video-player"
      ref={containerRef}
      onMouseMove={() => setShowControls(true)}
      onMouseLeave={handleMouseLeave}
    >
      <video
        ref={videoRef}
        className="video-element"
        src="https://samplelib.com/lib/preview/mp4/sample-5s.mp4"
      />
      {isPlaying && (
        <div
          ref={indicatorRef}
          className="playing-indicator"
          style={{
            position: 'absolute',
            top: '10px',
            right: '10px',
            background: 'rgba(0,0,0,0.7)',
            color: 'white',
            padding: '4px 8px',
            borderRadius: '4px',
            fontSize: '12px'
          }}
        >
          Playing
        </div>
      )}

      <div className={`video-hover-controls ${showControls ? 'visible' : ''}`}>
        <div className="volume-control">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="#fff" xmlns="http://www.w3.org/2000/svg">
            <path d="M3 9v6h4l5 5V4L7 9H3z" />
          </svg>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            onChange={handleVolumeChange}
          />
        </div>
        <button className="fullscreen-btn" onClick={handleFullscreen}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" xmlns="http://www.w3.org/2000/svg">
            <path d="M4 4h6v2H6v4H4V4zm14 0h-6v2h4v4h2V4zM4 14h2v4h4v2H4v-6zm16 0h-2v4h-4v2h6v-6z" />
          </svg>
        </button>
      </div>
    </div>
  )
}

export default VideoPlayer

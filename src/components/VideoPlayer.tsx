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

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const vol = parseFloat(e.target.value)
    setVolume(vol)
    if (videoRef.current) videoRef.current.volume = vol
  }

  const toggleFullscreen = () => {
    const vid = videoRef.current
    if (!vid) return
    if (document.fullscreenElement) {
      document.exitFullscreen()
    } else {
      vid.requestFullscreen()
    }
  }

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

  return (
    <div className="video-player" ref={containerRef}>
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
      <div className="hover-controls">
        <button className="fullscreen-btn" onClick={toggleFullscreen}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3 8V5a2 2 0 012-2h3" stroke="white" strokeWidth="2" strokeLinecap="round"/>
            <path d="M21 8V5a2 2 0 00-2-2h-3" stroke="white" strokeWidth="2" strokeLinecap="round"/>
            <path d="M3 16v3a2 2 0 002 2h3" stroke="white" strokeWidth="2" strokeLinecap="round"/>
            <path d="M21 16v3a2 2 0 01-2 2h-3" stroke="white" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </button>
        <div className="volume-control">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M11 5L6 9H2v6h4l5 4V5z" fill="white"/>
            <path d="M15.54 8.46a5 5 0 010 7.07" stroke="white" strokeWidth="2" strokeLinecap="round"/>
            <path d="M17.54 6.46a8 8 0 010 11.31" stroke="white" strokeWidth="2" strokeLinecap="round"/>
          </svg>
          <input
            type="range"
            min="0"
            max="1"
            step="0.05"
            value={volume}
            onChange={handleVolumeChange}
            className="volume-slider"
          />
        </div>
      </div>
    </div>
  )
}

export default VideoPlayer

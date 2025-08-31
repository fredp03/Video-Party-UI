import { useEffect, useRef, useState } from 'react'
import { animate } from 'animejs'
import './VideoControls.css'

interface VideoControlsProps {
  isPlaying: boolean
  onTogglePlayPause: () => void
  videoRef: React.MutableRefObject<HTMLVideoElement | null>
}

const VideoControls = ({ isPlaying, onTogglePlayPause, videoRef }: VideoControlsProps) => {
  const progressBarRef = useRef<HTMLDivElement>(null)
  const progressRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const [progress, setProgress] = useState(0)
  const [isScrubbing, setIsScrubbing] = useState(false)

  useEffect(() => {
    const vid = videoRef.current
    if (!vid) return
    let frameId: number
    const update = () => {
      if (!isScrubbing) {
        const pct = vid.duration ? vid.currentTime / vid.duration : 0
        setProgress(pct)
      }
      frameId = requestAnimationFrame(update)
    }
    if (isPlaying) {
      frameId = requestAnimationFrame(update)
    }
    return () => cancelAnimationFrame(frameId)
  }, [videoRef, isPlaying, isScrubbing])

  const handleScrub = (clientX: number) => {
    if (!progressBarRef.current || !videoRef.current) return
    const rect = progressBarRef.current.getBoundingClientRect()
    const pos = Math.min(Math.max(0, clientX - rect.left), rect.width)
    const pct = pos / rect.width
    videoRef.current.currentTime = pct * (videoRef.current.duration || 0)
    setProgress(pct)
  }

  const onPointerDown = (e: React.PointerEvent) => {
    setIsScrubbing(true)
    handleScrub(e.clientX)
    window.addEventListener('pointermove', onPointerMove)
    window.addEventListener('pointerup', endScrub)
  }
  const onPointerMove = (e: PointerEvent) => {
    if (isScrubbing) handleScrub(e.clientX)
  }
  const endScrub = (e: PointerEvent) => {
    if (isScrubbing) handleScrub(e.clientX)
    setIsScrubbing(false)
    window.removeEventListener('pointermove', onPointerMove)
    window.removeEventListener('pointerup', endScrub)
  }

  useEffect(() => {
    if (buttonRef.current) {
      animate(buttonRef.current, {
        scale: [0.9, 1],
        easing: 'spring(1, 80, 10, 0)',
        duration: 500
      })
    }
  }, [isPlaying])

  useEffect(() => {
    if (progressRef.current && progressBarRef.current) {
      const width = progressBarRef.current.clientWidth
      progressRef.current.style.left = `${progress * width}px`
    }
  }, [progress])

  return (
    <div className="video-controls">
      <div
        className="video-progress"
        ref={progressBarRef}
        onPointerDown={onPointerDown}
      >
        <svg width="100%" height="2" viewBox="0 0 1422 2" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M1.70755 1H1420.96" stroke="#4D413F" strokeWidth="2" strokeLinecap="round" />
        </svg>
        <div className="video-position" ref={progressRef} />
      </div>

      <button className="play-pause-button" onClick={onTogglePlayPause} ref={buttonRef}>
        {isPlaying ? (
          <svg width="48" height="24" viewBox="0 0 48 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="18.2" y="4" width="3.6" height="16" rx="1.8" fill="#5D5D5D" />
            <rect x="26.2" y="4" width="3.6" height="16" rx="1.8" fill="#5D5D5D" />
          </svg>
        ) : (
          <svg width="48" height="24" viewBox="0 0 48 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M16.6 4L31.4 12L16.6 20V4Z" fill="#5D5D5D" />
          </svg>
        )}
      </button>
    </div>
  )
}

export default VideoControls

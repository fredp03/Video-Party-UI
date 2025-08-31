import { useEffect, useRef } from 'react'
import { animate } from 'animejs'
import './VideoControls.css'

interface VideoControlsProps {
  isPlaying: boolean
  progress: number
  onTogglePlayPause: () => void
  onSeek: (progress: number) => void
}

const VideoControls = ({
  isPlaying,
  progress,
  onTogglePlayPause,
  onSeek
}: VideoControlsProps) => {
  const headRef = useRef<HTMLDivElement>(null)
  const barRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const isScrubbing = useRef(false)

  useEffect(() => {
    if (headRef.current && barRef.current) {
      const width = barRef.current.clientWidth - 12
      animate(headRef.current, {
        translateX: progress * width,
        duration: isScrubbing.current ? 0 : 200,
        easing: 'easeOutQuad'
      })
    }
  }, [progress])

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
    const bar = barRef.current
    if (!bar) return

    const updateProgress = (e: PointerEvent) => {
      if (!barRef.current) return
      const rect = barRef.current.getBoundingClientRect()
      const newProgress = (e.clientX - rect.left) / rect.width
      onSeek(Math.min(Math.max(newProgress, 0), 1))
    }

    const handlePointerMove = (e: PointerEvent) => {
      if (isScrubbing.current) {
        updateProgress(e)
      }
    }

    const handlePointerUp = (e: PointerEvent) => {
      if (isScrubbing.current) {
        updateProgress(e)
        isScrubbing.current = false
        window.removeEventListener('pointermove', handlePointerMove)
        window.removeEventListener('pointerup', handlePointerUp)
      }
    }

    const handlePointerDown = (e: PointerEvent) => {
      isScrubbing.current = true
      updateProgress(e)
      window.addEventListener('pointermove', handlePointerMove)
      window.addEventListener('pointerup', handlePointerUp)
    }

    bar.addEventListener('pointerdown', handlePointerDown)
    return () => {
      bar.removeEventListener('pointerdown', handlePointerDown)
      window.removeEventListener('pointermove', handlePointerMove)
      window.removeEventListener('pointerup', handlePointerUp)
    }
  }, [onSeek])

  return (
    <div className="video-controls">
      <div className="video-progress" ref={barRef}>
        <div className="progress-track" />
        <div
          className="progress-fill"
          style={{ width: `${progress * 100}%` }}
        />
        <div className="video-head" ref={headRef} />
      </div>

      <button className="play-pause-button" onClick={onTogglePlayPause} ref={buttonRef}>
        {isPlaying ? (
          // Pause icon (two bars) - taller and perfectly centered
          <svg width="48" height="24" viewBox="0 0 48 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="18.2" y="4" width="3.6" height="16" rx="1.8" fill="#5D5D5D"/>
            <rect x="26.2" y="4" width="3.6" height="16" rx="1.8" fill="#5D5D5D"/>
          </svg>
        ) : (
          // Play icon (triangle) - taller and centered
          <svg width="48" height="24" viewBox="0 0 48 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M16.6 4L31.4 12L16.6 20V4Z" fill="#5D5D5D"/>
          </svg>
        )}
      </button>
    </div>
  )
}

export default VideoControls

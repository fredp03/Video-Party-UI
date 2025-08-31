import { useEffect, useRef } from 'react'
import { animate as anime } from 'animejs'
import './VideoControls.css'

interface VideoControlsProps {
  isPlaying: boolean
  onTogglePlayPause: () => void
}

const VideoControls = ({ isPlaying, onTogglePlayPause }: VideoControlsProps) => {
  const controlsRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)

  // Fade in controls on mount
  useEffect(() => {
    if (controlsRef.current) {
      anime(controlsRef.current, {
        opacity: [0, 1],
        translateY: [10, 0],
        duration: 600,
        easing: 'easeOutQuad'
      })
    }
  }, [])

  const handleClick = () => {
    onTogglePlayPause()
    if (buttonRef.current) {
      anime(buttonRef.current, {
        scale: [1, 0.9, 1],
        duration: 300,
        easing: 'easeInOutSine'
      })
    }
  }

  return (
    <div className="video-controls" ref={controlsRef}>
      <div className="video-progress">
        <svg width="1422" height="2" viewBox="0 0 1422 2" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M1.70755 1H1420.96" stroke="#4D413F" strokeWidth="2" strokeLinecap="round"/>
        </svg>
        <div className="video-position">
          <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g filter="url(#filter0_d_1_19743)">
              <ellipse cx="6.38295" cy="6.38295" rx="6.38295" ry="6.38295" transform="matrix(-1 0 0 1 15.811 0.617065)" fill="#6A7967"/>
            </g>
            <defs>
              <filter id="filter0_d_1_19743" x="0.745105" y="0.617065" width="17.3659" height="18.0659" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                <feFlood floodOpacity="0" result="BackgroundImageFix"/>
                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                <feOffset dy="3"/>
                <feGaussianBlur stdDeviation="1.15"/>
                <feComposite in2="hardAlpha" operator="out"/>
                <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
                <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_1_19743"/>
                <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_1_19743" result="shape"/>
              </filter>
            </defs>
          </svg>
        </div>
      </div>

      <button className="play-pause-button" ref={buttonRef} onClick={handleClick}>
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

import { useEffect, useRef } from 'react'
import { animate } from 'animejs'
import './VideoPlayer.css'

interface VideoPlayerProps {
  isPlaying: boolean
}

const VideoPlayer = ({ isPlaying }: VideoPlayerProps) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const indicatorRef = useRef<HTMLDivElement>(null)
  const indicatorAnim = useRef<ReturnType<typeof animate> | null>(null)

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

  return (
    <div className="video-player" ref={containerRef}>
      <img
        className="tv-placeholder"
        src="https://placehold.co/1432x807/333333/ffffff?text=Video+Player"
        alt="Video Player Placeholder"
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
    </div>
  )
}

export default VideoPlayer

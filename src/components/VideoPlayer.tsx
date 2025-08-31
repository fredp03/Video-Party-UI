import { useEffect, useRef } from 'react'
import { animate as anime } from 'animejs'
import './VideoPlayer.css'

interface VideoPlayerProps {
  isPlaying: boolean
}

const VideoPlayer = ({ isPlaying }: VideoPlayerProps) => {
  const playerRef = useRef<HTMLDivElement>(null)
  const indicatorRef = useRef<HTMLDivElement>(null)

  // Subtle entrance animation for the player
  useEffect(() => {
    if (playerRef.current) {
      anime(playerRef.current, {
        opacity: [0, 1],
        scale: [0.97, 1],
        duration: 800,
        easing: 'easeOutQuad'
      })
    }
  }, [])

  // Pulsing indicator that showcases anime.js looping capabilities
  useEffect(() => {
    if (isPlaying && indicatorRef.current) {
      const animation = anime(indicatorRef.current, {
        opacity: [0.6, 1],
        scale: [1, 1.05],
        easing: 'easeInOutSine',
        direction: 'alternate',
        loop: true,
        duration: 700
      })

      return () => {
        animation.pause()
      }
    }
  }, [isPlaying])

  return (
    <div className="video-player" ref={playerRef}>
      <img
        className="tv-placeholder"
        src="https://placehold.co/1432x807/333333/ffffff?text=Video+Player"
        alt="Video Player Placeholder"
      />
      {isPlaying && (
        <div ref={indicatorRef} className="playing-indicator">
          Playing
        </div>
      )}
    </div>
  )
}

export default VideoPlayer

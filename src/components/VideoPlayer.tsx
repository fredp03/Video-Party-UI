import { useEffect, useRef } from 'react'
import { animate } from 'animejs'
import './VideoPlayer.css'

interface VideoPlayerProps {
  isPlaying: boolean
  src: string
  isChatVisible: boolean
  videoRef: React.RefObject<HTMLVideoElement | null>
}

const VideoPlayer = ({ isPlaying, src, isChatVisible, videoRef }: VideoPlayerProps) => {
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
    if (containerRef.current) {
      animate(containerRef.current, {
        scale: isChatVisible ? 0.98 : 1,
        translateX: isChatVisible ? -10 : 0,
        duration: 300,
        easing: 'easeOutQuad'
      })
    }
  }, [isChatVisible])

  useEffect(() => {
    const video = videoRef.current
    if (video) {
      if (isPlaying) {
        void video.play()
      } else {
        video.pause()
      }
    }

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
  }, [isPlaying, videoRef])

  return (
    <div className="video-player" ref={containerRef}>
      <video
        ref={videoRef}
        className="video-element"
        src={src}
        controls={false}
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

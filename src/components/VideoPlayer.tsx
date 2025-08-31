import { useEffect, useRef } from 'react'
import { animate } from 'animejs'
import './VideoPlayer.css'

interface VideoPlayerProps {
  isPlaying: boolean
  videoRef: React.MutableRefObject<HTMLVideoElement | null>
}

const VideoPlayer = ({ isPlaying, videoRef }: VideoPlayerProps) => {
  const containerRef = useRef<HTMLDivElement>(null)

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
    </div>
  )
}

export default VideoPlayer

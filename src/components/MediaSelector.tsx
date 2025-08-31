import { useEffect, useRef } from 'react'
import { animate } from 'animejs'
import './MediaSelector.css'

interface MediaSelectorProps {
  isVisible: boolean
}

const MediaSelector = ({ isVisible }: MediaSelectorProps) => {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (containerRef.current) {
      const el = containerRef.current
      if (isVisible) {
        el.style.display = 'flex'
        const fullHeight = el.scrollHeight
        animate(el, {
          height: [0, fullHeight],
          opacity: [0, 1],
          duration: 300,
          easing: 'easeOutQuad'
        })
      } else {
        const fullHeight = el.scrollHeight
        animate(el, {
          height: [fullHeight, 0],
          opacity: [1, 0],
          duration: 300,
          easing: 'easeInQuad',
          complete: () => {
            el.style.display = 'none'
          }
        })
      }
    }
  }, [isVisible])

  return (
    <div className="media-selector" ref={containerRef} style={{ display: 'none', overflow: 'hidden', flexDirection: 'column', gap: '8px' }}>
      <div className="media-item">Media Placeholder 1</div>
      <div className="media-item">Media Placeholder 2</div>
      <div className="media-item">Media Placeholder 3</div>
    </div>
  )
}

export default MediaSelector

import { useEffect, useRef } from 'react'
import { animate, stagger } from 'animejs'
import './MediaLibrary.css'

interface MediaLibraryProps {
  isVisible: boolean
}

const items = ['Sample Video 1', 'Sample Video 2', 'Sample Video 3']

const MediaLibrary = ({ isVisible }: MediaLibraryProps) => {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    if (isVisible) {
      el.style.display = 'block'
      const fullHeight = el.scrollHeight
      animate(el, {
        height: [0, fullHeight],
        opacity: [0, 1],
        easing: 'easeOutQuad',
        duration: 400,
        complete: () => {
          el.style.height = 'auto'
        }
      })
      const items = el.querySelectorAll('li')
      animate(items, {
        opacity: [0, 1],
        translateY: [-6, 0],
        delay: stagger(50),
        easing: 'easeOutQuad',
        duration: 300
      })
    } else {
      animate(el, {
        height: 0,
        opacity: 0,
        easing: 'easeInQuad',
        duration: 300,
        complete: () => {
          el.style.display = 'none'
        }
      })
    }
  }, [isVisible])

  return (
    <div ref={containerRef} className="media-library" style={{ display: 'none' }}>
      <ul>
        {items.map(item => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  )
}

export default MediaLibrary

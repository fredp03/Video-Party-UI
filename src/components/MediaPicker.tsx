import { useEffect, useRef } from 'react'
import { animate, stagger } from 'animejs'
import './MediaPicker.css'

interface MediaPickerProps {
  isVisible: boolean
  onRequestClose: () => void
  onClosed: () => void
  onSelect: (src: string) => void
}

const placeholders = [
  { title: 'Sample Video 1', src: 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4' },
  { title: 'Sample Video 2', src: 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.webm' },
  { title: 'Sample Video 3', src: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4' }
]

const MediaPicker = ({ isVisible, onRequestClose, onClosed, onSelect }: MediaPickerProps) => {
  const panelRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (panelRef.current) {
      if (isVisible) {
        panelRef.current.style.display = 'flex'
        animate(panelRef.current, {
          translateY: ['-10%', '0%'],
          opacity: [0, 1],
          easing: 'easeOutQuad',
          duration: 300
        })
        const items = panelRef.current.querySelectorAll('.media-item')
        animate(items, {
          opacity: [0, 1],
          translateY: [-8, 0],
          easing: 'easeOutQuad',
          delay: stagger(60)
        })
      } else {
        animate(panelRef.current, {
          translateY: ['0%', '-10%'],
          opacity: [1, 0],
          easing: 'easeInQuad',
          duration: 250,
          complete: () => {
            if (panelRef.current) {
              panelRef.current.style.display = 'none'
            }
            onClosed()
          }
        })
      }
    }
  }, [isVisible, onClosed])

  return (
    <div className="media-picker" ref={panelRef}>
      <button className="close-picker" onClick={onRequestClose}>
        Close
      </button>
      <div className="media-grid">
        {placeholders.map(item => (
          <div
            key={item.title}
            className="media-item"
            onClick={() => onSelect(item.src)}
          >
            {item.title}
          </div>
        ))}
      </div>
    </div>
  )
}

export default MediaPicker

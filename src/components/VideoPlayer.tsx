import './VideoPlayer.css'

interface VideoPlayerProps {
  isPlaying: boolean
}

const VideoPlayer = ({ isPlaying }: VideoPlayerProps) => {
  return (
    <div className="video-player">
      <img 
        className="tv-placeholder" 
        src="https://placehold.co/1432x807/333333/ffffff?text=Video+Player" 
        alt="Video Player Placeholder" 
      />
      {/* You can add a play indicator overlay here if needed */}
      {isPlaying && (
        <div className="playing-indicator" style={{
          position: 'absolute',
          top: '10px',
          right: '10px',
          background: 'rgba(0,0,0,0.7)',
          color: 'white',
          padding: '4px 8px',
          borderRadius: '4px',
          fontSize: '12px'
        }}>
          Playing
        </div>
      )}
    </div>
  )
}

export default VideoPlayer

import { Link } from 'react-router-dom'

function PlayerCard({ player }) {
  return (
    <Link to={`/player/${player.id}`} className="player-card">
      <h3 className="player-card-name">{player.name}</h3>
      <p className="player-card-nationality"> {player.nationality}</p>
      <div className="player-card-stats">
        <span> Pace: {player.pace}</span>
        <span> Shooting: {player.shooting}</span>
        <span> Passing: {player.passing}</span>
        <span> Dribbling: {player.dribbling}</span>
        <span> Defending: {player.defending}</span>
        <span> Physical: {player.physical}</span>
      </div>
    </Link>
  )
}

export default PlayerCard
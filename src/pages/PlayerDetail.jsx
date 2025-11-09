import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { supabase } from '../client'

function PlayerDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [player, setPlayer] = useState(null)

  useEffect(() => {
    fetchPlayer()
  }, [id])

  const fetchPlayer = async () => {
    const { data } = await supabase
      .from('Players')
      .select()
      .eq('id', id)

    if (data && data.length > 0) {
      setPlayer(data[0])
    }
  }

  if (!player) {
    return <div style={{ textAlign: 'center', padding: '50px' }}>Loading...</div>
  }

  const averageRating = Math.round(
    (player.pace + player.shooting + player.passing + player.dribbling + player.defending + player.physical) / 6
  )

  return (
    <div className="container">
      <div className="player-detail-card">
        <h1 className="player-detail-name">{player.name}</h1>
        <p className="player-detail-nationality">🌍 {player.nationality}</p>
        <div className="player-ovr">{averageRating} OVR</div>

        <div className="player-stats-grid">
          <div className="stat-item">
            <div className="stat-label">PACE</div>
            <div className="stat-value">{player.pace}</div>
          </div>
          <div className="stat-item">
            <div className="stat-label">SHOOTING</div>
            <div className="stat-value">{player.shooting}</div>
          </div>
          <div className="stat-item">
            <div className="stat-label">PASSING</div>
            <div className="stat-value">{player.passing}</div>
          </div>
          <div className="stat-item">
            <div className="stat-label">DRIBBLING</div>
            <div className="stat-value">{player.dribbling}</div>
          </div>
          <div className="stat-item">
            <div className="stat-label">DEFENDING</div>
            <div className="stat-value">{player.defending}</div>
          </div>
          <div className="stat-item">
            <div className="stat-label">PHYSICAL</div>
            <div className="stat-value">{player.physical}</div>
          </div>
        </div>

        <button
          onClick={() => navigate(`/edit/${player.id}`)}
          className="btn btn-primary"
          style={{ marginTop: '30px' }}
        >
          Edit Player
        </button>
      </div>
    </div>
  )
}

export default PlayerDetail
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '../client'
import PlayerCard from '../components/PlayerCard'

function Gallery() {
  const [players, setPlayers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchPlayers()
  }, [])

  const fetchPlayers = async () => {
    try {
      console.log('Fetching players...') // Debug log
      
      const { data, error } = await supabase
        .from('Players')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) {
        console.error('Error fetching players:', error)
        setError(error.message)
        setLoading(false)
        return
      }

      console.log('Fetched players:', data) // Debug log
      setPlayers(data || [])
      setLoading(false)
      
    } catch (err) {
      console.error('Unexpected error:', err)
      setError(err.message)
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="container">
        <div style={{ textAlign: 'center', padding: '50px' }}>
          <h2>Loading players...</h2>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container">
        <div style={{ textAlign: 'center', padding: '50px', color: 'red' }}>
          <h2>Error loading players</h2>
          <p>{error}</p>
          <p style={{ marginTop: '20px', fontSize: '0.9em' }}>
            Make sure Row Level Security is DISABLED on your Players table in Supabase
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="container">
      <h1 style={{ color: '#2a9d8f', textAlign: 'center', marginBottom: '30px' }}>Player Gallery</h1>
      
      {players.length === 0 ? (
        <div className="empty-state">
          <p>No players yet. Create your first player!</p>
          <Link to="/create" className="btn btn-primary">
            Create Player
          </Link>
        </div>
      ) : (
        <>
          <p style={{ textAlign: 'center', color: '#264653', marginBottom: '20px' }}>
            Total Players: {players.length}
          </p>
          <div className="gallery-grid">
            {players.map(player => (
              <PlayerCard key={player.id} player={player} />
            ))}
          </div>
        </>
      )}
    </div>
  )
}

export default Gallery
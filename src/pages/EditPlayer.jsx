import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { supabase } from '../client'

function EditPlayer() {
  const { id } = useParams()
  // const navigate = useNavigate()
  const [player, setPlayer] = useState(null)

  const nationalities = ['Spain', 'England', 'Brazil', 'USA', 'Germany', 'Italy', 'France', 'Egypt', 'Nigeria', 'Argentina']

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

  const handleChange = (e) => {
    const { name, value } = e.target
    setPlayer(prev => ({
      ...prev,
      [name]: name === 'name' || name === 'nationality' ? value : parseInt(value)
    }))
  }

  const handleNationalityClick = (nat) => {
    setPlayer(prev => ({ ...prev, nationality: nat }))
  }

  const updatePlayer = async (event) => {
    event.preventDefault()

    await supabase
      .from('Players')
      .update({
        name: player.name,
        nationality: player.nationality,
        pace: player.pace,
        shooting: player.shooting,
        passing: player.passing,
        dribbling: player.dribbling,
        defending: player.defending,
        physical: player.physical
      })
      .eq('id', id)

    window.location = "/gallery"
  }

  const deletePlayer = async (event) => {
    event.preventDefault()

    await supabase
      .from('Players')
      .delete()
      .eq('id', id)

    window.location = "/gallery"
  }

  if (!player) {
    return <div style={{ textAlign: 'center', padding: '50px' }}>Loading...</div>
  }

  return (
    <div className="form-container">
      <h1 className="form-title">Edit Player</h1>
      <div>
        <div className="form-group">
          <label className="form-label">Name:</label>
          <input
            type="text"
            name="name"
            value={player.name}
            onChange={handleChange}
            className="form-input"
            required
          />
        </div>

        <div className="form-group">
          <label className="form-label">Nationality:</label>
          <div className="nationality-buttons">
            {nationalities.map(nat => (
              <button
                key={nat}
                type="button"
                onClick={() => handleNationalityClick(nat)}
                className={`nationality-btn ${player.nationality === nat ? 'selected' : ''}`}
              >
                {nat}
              </button>
            ))}
          </div>
        </div>

        {['pace', 'shooting', 'passing', 'dribbling', 'defending', 'physical'].map(attr => (
          <div key={attr} className="slider-container">
            <div className="slider-label">
              <span style={{ textTransform: 'capitalize' }}>{attr}</span>
              <span>{player[attr]}</span>
            </div>
            <input
              type="range"
              name={attr}
              min="1"
              max="99"
              value={player[attr]}
              onChange={handleChange}
              className="slider"
            />
          </div>
        ))}

        <button onClick={updatePlayer} className="btn btn-primary" style={{ width: '100%', marginTop: '20px' }}>
          Update Player
        </button>

        <button onClick={deletePlayer} className="btn btn-danger" style={{ width: '100%', marginTop: '10px' }}>
          Delete Player
        </button>
      </div>
    </div>
  )
}

export default EditPlayer
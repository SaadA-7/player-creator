import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../client'

function CreatePlayer() {
  const navigate = useNavigate()
  const [player, setPlayer] = useState({
    name: '',
    nationality: '',
    pace: 50,
    shooting: 50,
    passing: 50,
    dribbling: 50,
    defending: 50,
    physical: 50
  })

  const nationalities = ['Spain', 'England', 'Brazil', 'USA', 'Germany', 'Italy', 'France', 'Egypt', 'Nigeria', 'Argentina']

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

  const createPlayer = async (event) => {
    event.preventDefault()
    
    // Validation
    if (!player.name.trim()) {
      alert('Please enter a player name')
      return
    }
    
    if (!player.nationality) {
      alert('Please select a nationality')
      return
    }

    try {
      console.log('Creating player:', player) // Debug log
      
      const { data, error } = await supabase
        .from('Players')
        .insert({
          name: player.name,
          nationality: player.nationality,
          pace: player.pace,
          shooting: player.shooting,
          passing: player.passing,
          dribbling: player.dribbling,
          defending: player.defending,
          physical: player.physical
        })
        .select()

      if (error) {
        console.error('Error creating player:', error)
        alert('Error creating player: ' + error.message)
        return
      }

      console.log('Player created successfully:', data) // Debug log
      navigate('/gallery')
      
    } catch (err) {
      console.error('Unexpected error:', err)
      alert('Unexpected error: ' + err.message)
    }
  }

  return (
    <div className="form-container">
      <h1 className="form-title">Create New Player</h1>
      <div>
        <div className="form-group">
          <label className="form-label">Name:</label>
          <input
            type="text"
            name="name"
            value={player.name}
            onChange={handleChange}
            className="form-input"
            placeholder="Enter player name"
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
          {player.nationality && (
            <p style={{ marginTop: '10px', color: '#2a9d8f', fontWeight: 'bold' }}>
              Selected: {player.nationality}
            </p>
          )}
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

        <button onClick={createPlayer} className="btn btn-primary" style={{ width: '100%', marginTop: '20px' }}>
          Create Player
        </button>
      </div>
    </div>
  )
}

export default CreatePlayer
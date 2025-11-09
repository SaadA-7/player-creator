import { Link } from 'react-router-dom'

function Home() {
  return (
    <div className="home-container">
      <h1 className="home-title"> Player Creator</h1>
      <p className="home-description">
        Build your ultimate soccer team with custom players!
      </p>
      <div className="button-group">
        <Link to="/create" className="btn btn-primary">
          Create New Player
        </Link>
        <Link to="/gallery" className="btn btn-secondary">
          View Gallery
        </Link>
      </div>
    </div>
  )
}

export default Home
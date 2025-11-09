import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import Home from './pages/Home'
import CreatePlayer from './pages/CreatePlayer'
import Gallery from './pages/Gallery'
import PlayerDetail from './pages/PlayerDetail'
import EditPlayer from './pages/EditPlayer'
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <div className="app-container">
        <nav className="navbar">
          <div className="nav-content">
            <Link to="/" className="nav-logo"> Player Creator</Link>
            <div className="nav-links">
              <Link to="/create" className="nav-link">Create</Link>
              <Link to="/gallery" className="nav-link">Gallery</Link>
            </div>
          </div>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create" element={<CreatePlayer />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/player/:id" element={<PlayerDetail />} />
          <Route path="/edit/:id" element={<EditPlayer />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import './App.css'
import Home from './Home'
import Search from './Search'
import About from './About'
import Footer from './Footer'

function App() {
  return (
    <Router>
        
    <nav className='header'>
      <Link className='header-link' to="/">
          Home          
      </Link>
      <Link className='header-link' to="/search">
          Search
      </Link>
      <Link className='header-link' to="/about">
          About
      </Link>
    </nav>

    <Routes>
      <Route path="/" element={<Home />}/>
      <Route path="/search" element={<Search />}/>
      <Route path='/about' element={<About />} />
    </Routes>

    <Footer />
</Router>

  );
}

export default App;

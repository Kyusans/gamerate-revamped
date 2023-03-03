import './App.css';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Home from './components/Home';
import NavBar from './components/NavBar';
import Login from './components/Login';
import About from './components/About';
import GameDetail from './components/GameDetail';
import AdminLogin from './components/admin/AdminLogin'
import AdminDashboard from './components/admin/AdminDashboard';

function App() {
  return (
    <>
      <nav>
        <NavBar />
      </nav>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/about" element={<About /> } />
          <Route path="/game" element={<GameDetail />} />
          <Route path="/admin/login" element={<AdminLogin /> } />
          <Route path="/admin/dashboard" element={<AdminDashboard /> } />
        </Routes>
      </Router>
    </>
  );
}

export default App;

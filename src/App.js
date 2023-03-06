import './App.css';
import { BrowserRouter , Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import NavBar from './components/NavBar';
import Login from './components/Login';
import About from './components/About';
import GameDetail from './components/GameDetail';
import AdminLogin from './components/admin/AdminLogin'
import AdminDashboard from './components/admin/AdminDashboard';
import AddNickName from './components/AddNickName';
import ShoutoutForm from './components/ShoutoutForm';
import Signup from './components/Signup';
import AdminSettings from './components/admin/AdminSettings';

function App() {
  return (
    <>
      <NavBar />

      <BrowserRouter basename='/itdays'>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/about" element={<About /> } />
          <Route path="/game" element={<GameDetail />} />
          <Route path="/admin/login" element={<AdminLogin /> } />
          <Route path="/admin/dashboard" element={<AdminDashboard /> } />
          <Route path="/shoutoutform" element={<ShoutoutForm />} />
          <Route path="/nickname" element={<AddNickName />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/admin/dashboard/settings" element={<AdminSettings />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

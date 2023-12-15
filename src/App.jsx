import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Login from './pages/Login';
import StarWars from './pages/Starwars';
import Modal from 'react-modal'; 
import './App.css';

Modal.setAppElement('#root'); 

function App() {
  return (
    <div className="flex flex-col min-h-screen App text-white">
      <Router>
        <AuthProvider>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/starwars" element={<StarWars />} />
            <Route path="/" element={<Navigate to="/login" />} />
          </Routes>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;

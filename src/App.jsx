import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import Home from './pages/Home.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import Community from './pages/Community.jsx';
import NotFound from './pages/NotFound.jsx';

const App = () => (
  <Routes>
    {/* Auth pages render without the navbar (full-screen design) */}
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register />} />

    {/* App shell with navbar */}
    <Route
      path="/"
      element={
        <>
          <Navbar />
          <Home />
        </>
      }
    />
    <Route
      path="/community"
      element={
        <ProtectedRoute>
          <Navbar />
          <Community />
        </ProtectedRoute>
      }
    />
    <Route path="*" element={<><Navbar /><NotFound /></>} />
  </Routes>
);

export default App;

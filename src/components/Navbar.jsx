import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import Avatar from './Avatar.jsx';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="nav">
      <div className="nav-inner">
        <Link to="/" className="nav-brand">
          <span>🎓</span>
          <span>MES <span className="g">DEVOIRS</span></span>
        </Link>

        <div className="nav-links">
          <NavLink to="/" className="nav-link" end>الرئيسية</NavLink>
          {user && <NavLink to="/community" className="nav-link">👥 فضاء الطلبة</NavLink>}

          {user ? (
            <div className="nav-user">
              <Avatar user={user} size="sm" />
              <button className="nav-logout" onClick={handleLogout}>خروج ←</button>
            </div>
          ) : (
            <>
              <NavLink to="/login" className="nav-link">دخول</NavLink>
              <NavLink to="/register" className="nav-link" style={{ background: 'var(--em)', color: '#fff' }}>
                إنشاء حساب
              </NavLink>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

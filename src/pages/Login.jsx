import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/community';

  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    setError('');
    setBusy(true);
    try {
      await login(form);
      navigate(from, { replace: true });
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="auth-wrap">
      <div className="ring ring-1" /><div className="ring ring-3" />
      <form className="auth-card" onSubmit={submit}>
        <span className="auth-logo">🎓</span>
        <h2>تسجيل الدخول</h2>
        <p className="sub">ادخل إلى فضاء الطلبة الخاص بـ MES DEVOIRS</p>

        {error && <div className="auth-err">❌ {error}</div>}

        <div className="field">
          <label>البريد الإلكتروني</label>
          <input type="email" name="email" value={form.email} onChange={onChange}
            placeholder="example@email.com" required />
        </div>
        <div className="field">
          <label>كلمة المرور</label>
          <input type="password" name="password" value={form.password} onChange={onChange}
            placeholder="••••••••" required />
        </div>

        <button className="auth-btn" type="submit" disabled={busy}>
          {busy ? '...جاري الدخول' : 'دخول ←'}
        </button>

        <p className="auth-alt">
          ليس لديك حساب؟ <Link to="/register">أنشئ حساباً جديداً</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;

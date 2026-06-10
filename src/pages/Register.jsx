import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

const Register = () => {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' });
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    setError('');
    if (form.password.length < 6) return setError('كلمة المرور يجب أن تكون 6 أحرف على الأقل');
    if (form.password !== form.confirm) return setError('كلمتا المرور غير متطابقتين');

    setBusy(true);
    try {
      await register({ name: form.name, email: form.email, password: form.password });
      navigate('/community', { replace: true });
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
        <span className="auth-logo">🌿</span>
        <h2>إنشاء حساب جديد</h2>
        <p className="sub">انضم إلى مجتمع طلبة MES DEVOIRS</p>

        {error && <div className="auth-err">❌ {error}</div>}

        <div className="field">
          <label>الاسم الكامل</label>
          <input type="text" name="name" value={form.name} onChange={onChange}
            placeholder="مثال: أمين بن علي" required />
        </div>
        <div className="field">
          <label>البريد الإلكتروني</label>
          <input type="email" name="email" value={form.email} onChange={onChange}
            placeholder="example@email.com" required />
        </div>
        <div className="field">
          <label>كلمة المرور</label>
          <input type="password" name="password" value={form.password} onChange={onChange}
            placeholder="6 أحرف على الأقل" required />
        </div>
        <div className="field">
          <label>تأكيد كلمة المرور</label>
          <input type="password" name="confirm" value={form.confirm} onChange={onChange}
            placeholder="••••••••" required />
        </div>

        <button className="auth-btn" type="submit" disabled={busy}>
          {busy ? '...جاري الإنشاء' : 'إنشاء الحساب ←'}
        </button>

        <p className="auth-alt">
          لديك حساب بالفعل؟ <Link to="/login">سجّل الدخول</Link>
        </p>
      </form>
    </div>
  );
};

export default Register;

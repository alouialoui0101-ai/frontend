import { Link } from 'react-router-dom';

const NotFound = () => (
  <div className="empty" style={{ minHeight: '60vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
    <span className="ic">🔍</span>
    <h2 style={{ fontFamily: 'Amiri, serif', color: 'var(--em)', marginBottom: 8 }}>404 — الصفحة غير موجودة</h2>
    <p style={{ marginBottom: 16 }}>يبدو أنك ضللت الطريق</p>
    <Link to="/" className="cta-btn" style={{ background: 'var(--em)', color: '#fff' }}>العودة للرئيسية</Link>
  </div>
);

export default NotFound;

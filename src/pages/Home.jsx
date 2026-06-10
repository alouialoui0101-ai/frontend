import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import Hero from '../components/Hero.jsx';

/* ── Subject config (ported from original data model) ── */
const BASE = [
  { id: 'prod', label: 'الإنتاج الكتابي', icon: '✍️', tag: 'عربية' },
  { id: 'eveil', label: 'الإيقاظ العلمي', icon: '🔬', tag: 'علوم' },
  { id: 'islam', label: 'التربية الإسلامية', icon: '🕌', tag: 'دين' },
  { id: 'khatt', label: 'الخط والإملاء', icon: '🖊️', tag: 'عربية' },
  { id: 'math', label: 'الرياضيات', icon: '📐', tag: 'رياضيات' },
  { id: 'qiraa', label: 'القراءة', icon: '📖', tag: 'عربية' },
];
const Y34 = [...BASE,
  { id: 'dict', label: 'Dictée', icon: '📝', tag: 'Français' },
  { id: 'expr', label: 'Expression Écrite', icon: '📄', tag: 'Français' },
  { id: 'lect', label: 'Lecture', icon: '📚', tag: 'Français' },
];
const Y56 = [...Y34,
  { id: 'ang', label: 'Anglais', icon: '🇬🇧', tag: 'English' },
  { id: 'hist', label: 'تاريخ', icon: '🏛️', tag: 'اجتماعيات' },
  { id: 'geo', label: 'جغرافيا', icon: '🌍', tag: 'اجتماعيات' },
  { id: 'civ', label: 'تربية مدنية', icon: '⚖️', tag: 'اجتماعيات' },
];
const CFG = { y1: BASE, y2: BASE, y3: Y34, y4: Y34, y5: Y56, y6: Y56 };
const YEARS = [
  { id: 'y1', label: 'السنة الأولى' },
  { id: 'y2', label: 'السنة الثانية' },
  { id: 'y3', label: 'السنة الثالثة' },
  { id: 'y4', label: 'السنة الرابعة' },
  { id: 'y5', label: 'السنة الخامسة' },
  { id: 'y6', label: 'السنة السادسة' },
];
const TRIMS = [
  { id: 't1', icon: '🍂', label: 'الثلاثي الأول' },
  { id: 't2', icon: '🌸', label: 'الثلاثي الثاني' },
  { id: 't3', icon: '☀️', label: 'الثلاثي الثالث' },
];

/* ── Teacher documents (مذكرات) ── */
const TEACHER_ITEMS = [
  { id: 't_ar_prep', icon: '📒', label: 'مذكرة عربية — التحضيري', tag: 'عربية' },
  { id: 't_ar_y1', icon: '📒', label: 'مذكرة عربية — السنة 1', tag: 'عربية' },
  { id: 't_ar_y2', icon: '📒', label: 'مذكرة عربية — السنة 2', tag: 'عربية' },
  { id: 't_ar_y3', icon: '📒', label: 'مذكرة عربية — السنة 3', tag: 'عربية' },
  { id: 't_ar_y4', icon: '📒', label: 'مذكرة عربية — السنة 4', tag: 'عربية' },
  { id: 't_ar_y5', icon: '📒', label: 'مذكرة عربية — السنة 5', tag: 'عربية' },
  { id: 't_ar_y6', icon: '📒', label: 'مذكرة عربية — السنة 6', tag: 'عربية' },
  { id: 't_fr_y2', icon: '📗', label: 'مذكرة فرنسية — السنة 2', tag: 'Français' },
  { id: 't_fr_y3', icon: '📗', label: 'مذكرة فرنسية — السنة 3', tag: 'Français' },
  { id: 't_fr_y4', icon: '📗', label: 'مذكرة فرنسية — السنة 4', tag: 'Français' },
  { id: 't_fr_y5', icon: '📗', label: 'مذكرة فرنسية — السنة 5', tag: 'Français' },
  { id: 't_fr_y6', icon: '📗', label: 'مذكرة فرنسية — السنة 6', tag: 'Français' },
  { id: 't_en_y5', icon: '📘', label: 'مذكرة أنجليزية — السنة 5', tag: 'English' },
  { id: 't_en_y6', icon: '📘', label: 'مذكرة أنجليزية — السنة 6', tag: 'English' },
];

/* ── Research (البحوث) ── */
const BOHOUTH_ITEMS = [
  { id: 'b_prep', icon: '🎒', label: 'بحوث التحضيري', tag: 'تحضيري' },
  { id: 'b_y1', icon: '1️⃣', label: 'بحوث السنة الأولى', tag: 'السنة 1' },
  { id: 'b_y2', icon: '2️⃣', label: 'بحوث السنة الثانية', tag: 'السنة 2' },
  { id: 'b_y3', icon: '3️⃣', label: 'بحوث السنة الثالثة', tag: 'السنة 3' },
  { id: 'b_y4', icon: '4️⃣', label: 'بحوث السنة الرابعة', tag: 'السنة 4' },
  { id: 'b_y5', icon: '5️⃣', label: 'بحوث السنة الخامسة', tag: 'السنة 5' },
  { id: 'b_y6', icon: '6️⃣', label: 'بحوث السنة السادسة', tag: 'السنة 6' },
];

/* Reusable subject/item card */
const Card = ({ item, i }) => (
  <div className="subj-card" style={{ animationDelay: `${i * 0.05}s` }}>
    <div className="card-top">
      <div className="icon-ring">{item.icon}</div>
      <div className="card-name">{item.label}</div>
      <span className="card-chip">{item.tag}</span>
    </div>
    <div style={{ padding: '13px 15px', borderTop: '1px solid #f0fdf4', textAlign: 'center', color: 'var(--text-l)', fontSize: '.78rem' }}>
      📂 قريباً
    </div>
  </div>
);

const Home = () => {
  const { user } = useAuth();
  const [view, setView] = useState('y1'); // 'y1'..'y6' | 'teacher' | 'bohouth'
  const [trim, setTrim] = useState('t1');

  const isYear = view.startsWith('y');

  const tabBtn = (id, label, color) => {
    const active = view === id;
    return (
      <button
        key={id}
        onClick={() => setView(id)}
        style={{
          padding: '11px 18px', borderRadius: 12, fontWeight: 700, fontSize: '.88rem',
          border: 'none', whiteSpace: 'nowrap',
          background: active ? (color?.bg || 'var(--em)') : (color?.softBg || 'var(--em-p)'),
          color: active ? '#fff' : (color?.text || 'var(--em)'),
        }}
      >
        {label}
      </button>
    );
  };

  return (
    <>
      <Hero totalFiles={0} />

      {/* Community CTA banner */}
      <div className="cta-banner">
        <div className="cta-inner">
          <h3>👥 فضاء تواصل الطلبة</h3>
          <p>
            {user
              ? 'تواصل مع زملائك، اطرح أسئلتك وشارك أفكارك في الفضاء المباشر'
              : 'سجّل الدخول للانضمام إلى مجتمع الطلبة والتواصل المباشر'}
          </p>
          <Link to={user ? '/community' : '/login'} className="cta-btn">
            {user ? 'ادخل إلى الفضاء ←' : 'سجّل الدخول للمشاركة ←'}
          </Link>
        </div>
      </div>

      <div className="content">
        {/* ── Top tab bar: 6 years + teacher + research ── */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, justifyContent: 'center', marginBottom: 26 }}>
          {YEARS.map((y) => tabBtn(y.id, y.label))}
          {tabBtn('teacher', '👩‍🏫 وثائق المعلم', {
            bg: 'linear-gradient(135deg,#b45309,#f59e0b)', softBg: 'var(--gold-p)', text: '#b45309',
          })}
          {tabBtn('bohouth', '🔍 البحوث', {
            bg: 'linear-gradient(135deg,#7e22ce,#a855f7)', softBg: '#f3e8ff', text: '#7e22ce',
          })}
        </div>

        {/* ── YEAR VIEW ── */}
        {isYear && (
          <>
            <div className="year-hdr">
              <div className="year-hdr-icon">📚</div>
              <div className="year-hdr-text">
                <h2>{YEARS.find((y) => y.id === view).label} ابتدائي</h2>
                <p>اختر الثلاثي لعرض التقييمات والوثائق</p>
              </div>
            </div>

            <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 34 }}>
              {TRIMS.map((t) => (
                <button
                  key={t.id}
                  onClick={() => setTrim(t.id)}
                  style={{
                    padding: '13px 28px', borderRadius: 16, fontWeight: 700, fontSize: '.93rem',
                    display: 'flex', alignItems: 'center', gap: 10,
                    border: `2px solid ${trim === t.id ? 'var(--em)' : 'rgba(13,110,79,.25)'}`,
                    background: trim === t.id ? 'linear-gradient(135deg,var(--em-d),var(--em-l))' : '#fff',
                    color: trim === t.id ? '#fff' : 'var(--text)',
                    boxShadow: '0 4px 18px rgba(13,110,79,.07)',
                  }}
                >
                  <span>{t.icon}</span><span>{t.label}</span>
                </button>
              ))}
            </div>

            <div className="subj-grid">
              {CFG[view].map((s, i) => <Card key={s.id} item={s} i={i} />)}
            </div>
          </>
        )}

        {/* ── TEACHER DOCUMENTS VIEW ── */}
        {view === 'teacher' && (
          <>
            <div className="year-hdr" style={{ background: 'linear-gradient(135deg,#78350f,#b45309,#f59e0b)' }}>
              <div className="year-hdr-icon">👩‍🏫</div>
              <div className="year-hdr-text">
                <h2>وثائق المعلم</h2>
                <p>مذكرات ووثائق بيداغوجية لجميع المستويات</p>
              </div>
            </div>
            <div className="subj-grid">
              {TEACHER_ITEMS.map((s, i) => <Card key={s.id} item={s} i={i} />)}
            </div>
          </>
        )}

        {/* ── RESEARCH VIEW ── */}
        {view === 'bohouth' && (
          <>
            <div className="year-hdr" style={{ background: 'linear-gradient(135deg,#4a044e,#7e22ce,#a855f7)' }}>
              <div className="year-hdr-icon">🔍</div>
              <div className="year-hdr-text">
                <h2>البحوث المدرسية</h2>
                <p>بحوث من التحضيري إلى السنة السادسة</p>
              </div>
            </div>
            <div className="subj-grid">
              {BOHOUTH_ITEMS.map((s, i) => <Card key={s.id} item={s} i={i} />)}
            </div>
          </>
        )}
      </div>

      <footer>
        <p>MES DEVOIRS — جميع الحقوق محفوظة © 2025</p>
        <p>موارد تعليمية للمرحلة الابتدائية · من السنة الأولى إلى السادسة</p>
      </footer>
    </>
  );
};

export default Home;

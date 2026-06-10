import { useEffect, useRef } from 'react';

/* Decorative hero ported from the original design (rings, blobs, twinkling stars) */
const Hero = ({ totalFiles = 0 }) => {
  const starsRef = useRef(null);

  useEffect(() => {
    const c = starsRef.current;
    if (!c || c.childElementCount) return;
    for (let i = 0; i < 32; i++) {
      const s = document.createElement('div');
      s.className = 'star';
      const sz = 2 + Math.random() * 5;
      s.style.cssText = `left:${Math.random() * 100}%;top:${Math.random() * 100}%;width:${sz}px;height:${sz}px;--d:${2 + Math.random() * 5}s;--dl:${Math.random() * 6}s`;
      c.appendChild(s);
    }
  }, []);

  return (
    <section className="hero">
      <div className="ring ring-1" /><div className="ring ring-2" />
      <div className="ring ring-3" /><div className="ring ring-4" />
      <div className="blob blob-1" /><div className="blob blob-2" />
      <div className="stars" ref={starsRef} />

      <span className="hero-logo">🎓</span>
      <div className="hero-badge"><span>🌿</span><span>منصة تعليمية متكاملة — التعليم الابتدائي</span></div>
      <h1>مرحباً بكم في <span className="g">MES DEVOIRS</span></h1>
      <p className="hero-sub">
        موارد تعليمية شاملة لجميع المستويات الابتدائية<br />
        تقييمات، وثائق، وفضاء تواصل بين الطلبة
      </p>

      <div className="hero-stats">
        <div className="stat"><span className="stat-n">6</span><div className="stat-l">مستويات</div></div>
        <div className="stat"><span className="stat-n">3</span><div className="stat-l">ثلاثيات</div></div>
        <div className="stat"><span className="stat-n">13</span><div className="stat-l">مادة دراسية</div></div>
        <div className="stat"><span className="stat-n">{totalFiles}</span><div className="stat-l">وثائق</div></div>
      </div>

      <div className="hero-wave">
        <svg viewBox="0 0 1440 65" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0,35 C360,65 1080,5 1440,35 L1440,65 L0,65 Z" fill="#fdfaf4" />
        </svg>
      </div>
    </section>
  );
};

export default Hero;

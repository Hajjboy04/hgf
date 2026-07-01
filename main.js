// ============================================================
// HGF — shared site behaviour
// ============================================================

document.addEventListener('DOMContentLoaded', () => {

  /* ---------- mobile nav toggle ---------- */
  const toggle = document.querySelector('.nav-toggle');
  const pill = document.querySelector('.nav-pill');
  if (toggle && pill){
    toggle.addEventListener('click', () => {
      pill.classList.toggle('open');
      toggle.setAttribute('aria-expanded', pill.classList.contains('open'));
    });
    pill.querySelectorAll('a').forEach(a => a.addEventListener('click', () => pill.classList.remove('open')));
  }

  /* ---------- hero slider (crossfade, auto-rotating) ---------- */
  const slides = document.querySelectorAll('.hero-slide');
  const dots = document.querySelectorAll('.hero-dots button');
  if (slides.length){
    let current = 0;
    let timer;
    const show = (i) => {
      slides.forEach(s => s.classList.remove('active'));
      dots.forEach(d => d.classList.remove('active'));
      slides[i].classList.add('active');
      if (dots[i]) dots[i].classList.add('active');
      current = i;
    };
    const next = () => show((current + 1) % slides.length);
    const start = () => { timer = setInterval(next, 5500); };
    const stop = () => clearInterval(timer);
    dots.forEach((d, i) => d.addEventListener('click', () => { show(i); stop(); start(); }));
    show(0);
    start();
  }

  /* ---------- activities carousel arrows ---------- */
  const track = document.querySelector('.carousel-track');
  const prevBtn = document.querySelector('[data-carousel="prev"]');
  const nextBtn = document.querySelector('[data-carousel="next"]');
  if (track && prevBtn && nextBtn){
    const scrollAmount = () => (track.querySelector('.activity-card')?.offsetWidth || 300) + 22;
    prevBtn.addEventListener('click', () => track.scrollBy({ left: -scrollAmount(), behavior: 'smooth' }));
    nextBtn.addEventListener('click', () => track.scrollBy({ left: scrollAmount(), behavior: 'smooth' }));
  }

  /* ---------- scroll reveal ---------- */
  const revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && revealEls.length){
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting){
          entry.target.classList.add('in');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    revealEls.forEach(el => io.observe(el));
  } else {
    revealEls.forEach(el => el.classList.add('in'));
  }

  /* ---------- leader photo fallback (shows initials if image missing) ---------- */
  document.querySelectorAll('.leader-photo img').forEach(img => {
    img.addEventListener('error', () => { img.style.display = 'none'; });
  });

});

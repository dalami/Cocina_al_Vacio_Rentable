// ── NAV scroll ──
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 60);
});

// ── FAQ ──
function toggleFaq(btn) {
  const item = btn.parentElement;
  const open = item.classList.contains('open');
  document.querySelectorAll('.faq-item.open').forEach(i => i.classList.remove('open'));
  if (!open) item.classList.add('open');
}

// ── SCROLL REVEAL ──
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      observer.unobserve(e.target);
    }
  });
}, { threshold: 0.08 });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// ── SMOOTH ANCHOR ──
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    e.preventDefault();
    const target = document.querySelector(a.getAttribute('href'));
    if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

// ── COUNTDOWN TIMERS ──
function getOrCreateExpiry() {
  let expiry = localStorage.getItem('promo_expiry');
  if (!expiry) {
    // 24 hours from first visit
    expiry = Date.now() + 24 * 60 * 60 * 1000;
    localStorage.setItem('promo_expiry', expiry);
  }
  return parseInt(expiry);
}

function pad(n) { return String(n).padStart(2, '0'); }

function updateCountdowns() {
  const expiry = getOrCreateExpiry();
  const now = Date.now();
  const diff = Math.max(0, expiry - now);

  const h = Math.floor(diff / 3600000);
  const m = Math.floor((diff % 3600000) / 60000);
  const s = Math.floor((diff % 60000) / 1000);

  // Main countdown
  const cdH = document.getElementById('cd-h');
  const cdM = document.getElementById('cd-m');
  const cdS = document.getElementById('cd-s');
  if (cdH) cdH.textContent = pad(h);
  if (cdM) cdM.textContent = pad(m);
  if (cdS) cdS.textContent = pad(s);

  // Bar countdown
  const cbH = document.getElementById('cb-h');
  const cbM = document.getElementById('cb-m');
  const cbS = document.getElementById('cb-s');
  if (cbH) cbH.textContent = pad(h);
  if (cbM) cbM.textContent = pad(m);
  if (cbS) cbS.textContent = pad(s);
}

updateCountdowns();
setInterval(updateCountdowns, 1000);

// ── POPUP SOCIAL PROOF ──
const popups = [
  { name: 'Valentina G.', city: 'Mendoza', action: 'compró el sistema hace 2 horas' },
  { name: 'Roberto M.', city: 'Rosario', action: 'compró el sistema hace 5 horas' },
  { name: 'Claudia P.', city: 'Mar del Plata', action: 'compró el sistema hace 8 horas' },
  { name: 'Diego F.', city: 'Córdoba', action: 'se acaba de inscribir' },
  { name: 'Silvia N.', city: 'Buenos Aires', action: 'compró el sistema hace 1 hora' },
];
let popupIndex = 0;

function showPopup() {
  const p = popups[popupIndex % popups.length];
  popupIndex++;

  const el = document.createElement('div');
  el.style.cssText = `
    position: fixed; bottom: 24px; left: 24px; z-index: 9000;
    background: #1A1A1A; border: 1px solid rgba(232,98,10,0.4);
    border-left: 4px solid #E8620A;
    padding: 1rem 1.5rem; max-width: 280px;
    box-shadow: 0 8px 40px rgba(0,0,0,0.6);
    transform: translateX(-120%); transition: transform 0.4s ease;
    font-family: 'Barlow', sans-serif;
  `;
  el.innerHTML = `
    <div style="font-size:0.65rem; color:#E8620A; letter-spacing:0.12em; text-transform:uppercase; margin-bottom:0.3rem; font-family:'Barlow Condensed',sans-serif; font-weight:700;">✅ COMPRA VERIFICADA</div>
    <div style="font-size:0.88rem; font-weight:600; color:#fff;">${p.name} · ${p.city}</div>
    <div style="font-size:0.78rem; color:#888; margin-top:0.1rem;">${p.action}</div>
  `;
  document.body.appendChild(el);

  setTimeout(() => { el.style.transform = 'translateX(0)'; }, 100);
  setTimeout(() => { el.style.transform = 'translateX(-120%)'; }, 4000);
  setTimeout(() => { el.remove(); }, 4500);
}

// Start popups after 5s, then every 12s
setTimeout(() => {
  showPopup();
  setInterval(showPopup, 12000);
}, 5000);

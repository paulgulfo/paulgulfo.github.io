document.addEventListener('DOMContentLoaded', () => {
  const navToggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');
  if (!navToggle || !navLinks) return;

  const panelClose = document.getElementById('panelClose');

  function setAria(opened) {
    navToggle.setAttribute('aria-expanded', opened ? 'true' : 'false');
    navLinks.setAttribute('aria-hidden', opened ? 'false' : 'true');
  }

  function openPanel() {
    navLinks.classList.add('open');
    setAria(true);
    document.body.style.overflow = 'hidden';
    if (panelClose) panelClose.style.display = 'block';
  }

  function closePanel() {
    navLinks.classList.remove('open');
    setAria(false);
    document.body.style.overflow = '';
    if (panelClose) panelClose.style.display = 'none';
  }

  navToggle.addEventListener('click', () => {
    if (navLinks.classList.contains('open')) closePanel(); else openPanel();
  });

  if (panelClose) {
    panelClose.addEventListener('click', closePanel);
    panelClose.style.display = navLinks.classList.contains('open') ? 'block' : 'none';
  }

  // Close when a link is clicked (mobile)
  navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    if (navLinks.classList.contains('open')) closePanel();
  }));

  // Close on Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navLinks.classList.contains('open')) closePanel();
  });

  // Ensure initial aria state
  setAria(false);
});
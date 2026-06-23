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

  function toggleSidebarState() {
    const opened = navLinks.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', opened ? 'true' : 'false');
    if (panelClose) panelClose.style.display = opened ? 'block' : 'none';
    document.body.style.overflow = opened ? 'hidden' : '';
  }

  // nav toggle (hamburger in header)
  navToggle.addEventListener('click', () => {
    toggleSidebarState();
  });

  function closeSidebar() {
    if (navLinks.classList.contains('open')) {
      navLinks.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
      if (panelClose) panelClose.style.display = 'none';
      document.body.style.overflow = '';
    }
  }

  if (panelClose) {
    // close panel when internal close button is clicked
    panelClose.addEventListener('click', (e) => {
      closeSidebar();
    });
    // initialize visual state
    panelClose.style.display = navLinks.classList.contains('open') ? 'block' : 'none';
  }

  document.querySelectorAll('.nav-links a').forEach(a => {
    a.addEventListener('click', () => {
      closeSidebar();
    });
  });

  // Close on Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navLinks.classList.contains('open')) {
      closeSidebar();
    }
  });

  // Ensure initial aria state
  setAria(false);
});
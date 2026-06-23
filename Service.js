document.addEventListener('DOMContentLoaded', () => {
  const navToggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');
  const panelClose = document.getElementById('panelClose');

  if (!navToggle || !navLinks) return;

  function setAria(open) {
    navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    navLinks.setAttribute('aria-hidden', open ? 'false' : 'true');
  }

  function openPanel() {
    navLinks.classList.add('open');
    setAria(true);
    document.body.style.overflow = 'hidden';
  }

  function closePanel() {
    navLinks.classList.remove('open');
    setAria(false);
    document.body.style.overflow = '';
  }

  navToggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.contains('open');
    if (isOpen) closePanel(); else openPanel();
  });

  if (panelClose) panelClose.addEventListener('click', closePanel);

  // Close when a navigation link is clicked (mobile behaviour)
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      // Small delay so navigation feels smooth
      setTimeout(() => {
        closePanel();
      }, 120);
    });
  });

  // Close on Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closePanel();
  });

  // Ensure initial aria state
  setAria(false);
});

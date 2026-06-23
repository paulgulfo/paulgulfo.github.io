document.addEventListener('DOMContentLoaded', () => {
  // Optional: init functions if available
  if (typeof initHeroParallax === 'function') initHeroParallax();
  if (typeof initObservers === 'function') initObservers();

  const navToggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');
  if (!navToggle || !navLinks) return;

  const panelClose = document.getElementById('panelClose');

  function toggleSidebarState() {
    const opened = navLinks.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', opened ? 'true' : 'false');
    if (panelClose) panelClose.style.display = opened ? 'block' : 'none';
    document.body.style.overflow = opened ? 'hidden' : '';
  }

  function closeSidebar() {
    if (navLinks.classList.contains('open')) {
      navLinks.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
      if (panelClose) panelClose.style.display = 'none';
      document.body.style.overflow = '';
    }
  }

  // nav toggle (hamburger in header)
  navToggle.addEventListener('click', toggleSidebarState);

  if (panelClose) {
    // close panel when internal close button is clicked
    panelClose.addEventListener('click', () => closeSidebar());
    // initialize visual state
    panelClose.style.display = navLinks.classList.contains('open') ? 'block' : 'none';
  }

  // Close on link click
  navLinks.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => closeSidebar());
  });

  // Close on Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeSidebar();
  });
});

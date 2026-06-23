(function () {
  document.addEventListener('DOMContentLoaded', function () {
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');
    const panelClose = document.getElementById('panelClose');
    const navLinkItems = navLinks ? navLinks.querySelectorAll('a') : [];

    function setAria(open) {
      if (navToggle) navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      if (navLinks) navLinks.setAttribute('aria-hidden', open ? 'false' : 'true');
    }

    function openPanel() {
      if (!navLinks) return;
      navLinks.classList.add('open');
      setAria(true);
      if (panelClose) panelClose.style.display = 'block';
      document.body.style.overflow = 'hidden';
      // move focus into panel for keyboard users
      const firstLink = navLinks.querySelector('a');
      if (firstLink) firstLink.focus();
    }

    function closePanel() {
      if (!navLinks) return;
      navLinks.classList.remove('open');
      setAria(false);
      if (panelClose) panelClose.style.display = 'none';
      document.body.style.overflow = '';
      if (navToggle) navToggle.focus();
    }

    function setSideState(opened) {
      if (!navLinks) return;
      if (opened) {
        navLinks.classList.add('open');
        if (navToggle) navToggle.setAttribute('aria-expanded', 'true');
        if (panelClose) panelClose.style.display = 'block';
        document.body.style.overflow = 'hidden';
      } else {
        navLinks.classList.remove('open');
        if (navToggle) navToggle.setAttribute('aria-expanded', 'false');
        if (panelClose) panelClose.style.display = 'none';
        document.body.style.overflow = '';
      }
    }

    function toggleSidebarState() {
      const opened = navLinks.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', opened ? 'true' : 'false');
      if (panelClose) panelClose.style.display = opened ? 'block' : 'none';
    }

    // nav toggle (hamburger in header)
    navToggle.addEventListener('click', () => {
      toggleSidebarState();
    });

    if (panelClose) {
      // close panel when internal close button is clicked
      panelClose.addEventListener('click', (e) => {
        if (navLinks.classList.contains('open')) {
          navLinks.classList.remove('open');
          navToggle.setAttribute('aria-expanded', 'false');
          panelClose.style.display = 'none';
        }
      });
      // initialize visual state
      panelClose.style.display = navLinks.classList.contains('open') ? 'block' : 'none';
    }

    document.querySelectorAll('.nav-links a').forEach(a => {
      a.addEventListener('click', () => {
        if (navLinks.classList.contains('open')) {
          navLinks.classList.remove('open');
          navToggle.setAttribute('aria-expanded', 'false');
          setSideState(false);
        }
      });
    });

    // Close on Escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && navLinks.classList.contains('open')) {
        navLinks.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
        setSideState(false);
      }
    });

    // initialize state
    if (panelClose) panelClose.style.display = 'none';
    setAria(false);
  });
})();
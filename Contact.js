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
      if (!navLinks) return;
      const opened = navLinks.classList.toggle('open');
      if (navToggle) navToggle.setAttribute('aria-expanded', opened ? 'true' : 'false');
      if (panelClose) panelClose.style.display = opened ? 'block' : 'none';
      document.body.style.overflow = opened ? 'hidden' : '';
    }

    if (navToggle) {
      navToggle.addEventListener('click', toggleSidebarState);
      navToggle.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          toggleSidebarState();
        }
      });
    }

    if (panelClose) panelClose.addEventListener('click', function (e) {
      if (navLinks.classList.contains('open')) {
        navLinks.classList.remove('open');
        if (navToggle) navToggle.setAttribute('aria-expanded', 'false');
        panelClose.style.display = 'none';
        setSideState(false);
      }
    });

    navLinkItems.forEach(function (link) {
      link.addEventListener('click', function () {
        if (navLinks.classList.contains('open')) {
          navLinks.classList.remove('open');
          if (navToggle) navToggle.setAttribute('aria-expanded', 'false');
          setSideState(false);
        }
      });
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && navLinks.classList.contains('open')) {
        navLinks.classList.remove('open');
        if (navToggle) navToggle.setAttribute('aria-expanded', 'false');
        setSideState(false);
      }
    });

    // initialize state
    if (panelClose) panelClose.style.display = 'none';
    setAria(false);
  });
})();

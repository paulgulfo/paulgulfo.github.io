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
const navToggle = document.querySelector('.nav-toggle');
		const navLinks = document.querySelector('.nav-links');
		if (navToggle && navLinks) {
			const panelClose = document.getElementById('panelClose');

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
        }
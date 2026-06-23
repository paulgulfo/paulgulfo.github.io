document.addEventListener('DOMContentLoaded', () => {
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

  navToggle.addEventListener('click', toggleSidebarState);
  if (panelClose) panelClose.addEventListener('click', () => {
    if (navLinks.classList.contains('open')) toggleSidebarState();
  });

  // Close on link click
  navLinks.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      if (navLinks.classList.contains('open')) toggleSidebarState();
    });
  });

  // Close on Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navLinks.classList.contains('open')) toggleSidebarState();
  });

  // Initialize
  if (panelClose) panelClose.style.display = navLinks.classList.contains('open') ? 'block' : 'none';
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
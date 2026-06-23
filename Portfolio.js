document.addEventListener('DOMContentLoaded', () => {
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');
    if (navToggle && navLinks) {
        const panelClose = document.getElementById('panelClose');

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

        if (panelClose) {
            // close panel when internal close button is clicked
            panelClose.addEventListener('click', (e) => {
                if (navLinks.classList.contains('open')) {
                    navLinks.classList.remove('open');
                    navToggle.setAttribute('aria-expanded', 'false');
                    panelClose.style.display = 'none';
                    document.body.style.overflow = '';
                }
            });
            // initialize visual state
            panelClose.style.display = navLinks.classList.contains('open') ? 'block' : 'none';
        }

        // Close on Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && navLinks.classList.contains('open')) {
                navLinks.classList.remove('open');
                navToggle.setAttribute('aria-expanded', 'false');
                if (panelClose) panelClose.style.display = 'none';
                document.body.style.overflow = '';
            }
        });

        // Close when a nav link is clicked (mobile behavior)
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                if (navLinks.classList.contains('open')) {
                    navLinks.classList.remove('open');
                    navToggle.setAttribute('aria-expanded', 'false');
                    if (panelClose) panelClose.style.display = 'none';
                    document.body.style.overflow = '';
                }
            });
        });
    }
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
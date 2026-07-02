// home.js - Continuous marquee carousel, parallax, and entrance animations
(function () {
	'use strict';

	class Carousel {
		constructor(root, opts = {}) {
			this.root = root;
			this.track = root.querySelector('.carousel-track');
			this.originalSlides = Array.from(root.querySelectorAll('.carousel-slide'));
			this.slides = [];
			this.prevBtn = root.querySelector('.carousel-btn.prev');
			this.nextBtn = root.querySelector('.carousel-btn.next');
			this.isPaused = false;

			// defaults
			this.speed = opts.speed || 80; // px/s
			this.offset = 0; // current scroll offset in px
			this.singleSetWidth = 0;
			this._rafId = null;
			this._lastTime = null;

			// read slider attributes if present
			const slider = this.root.querySelector('.slider');
			if (slider) {
				const sa = parseFloat(slider.dataset.scrollamount);
				if (!Number.isNaN(sa)) this.speed = sa;
				const left = parseFloat(slider.dataset.left);
				if (!Number.isNaN(left)) this.offset = left;
			}

			this.setup();
			this.attachEvents();
			this.startLoop();
		}

		setup() {
			// make two consecutive sets for seamless loop
			const track = this.track;
			track.innerHTML = '';
			const orig = this.originalSlides.map(n => n.cloneNode(true));
			orig.forEach(n => track.appendChild(n));
			orig.forEach(n => track.appendChild(n.cloneNode(true)));
			this.slides = Array.from(track.children);
			// let browser layout then measure
			requestAnimationFrame(() => {
				this.measureSingleSet();
			});
		}

		measureSingleSet() {
			const count = this.originalSlides.length || 1;
			let width = 0;
			const gap = parseFloat(getComputedStyle(this.track).gap) || 0;
			for (let i = 0; i < count; i++) {
				const el = this.slides[i];
				if (!el) continue;
				width += el.getBoundingClientRect().width + gap;
			}
			this.singleSetWidth = Math.max(1, width);
			// apply initial offset
			this.track.style.transform = `translateX(-${this.offset}px)`;
		}

		attachEvents() {
			// pause on pointer over slider area
			const slider = this.root.querySelector('.slider') || this.root;
			slider.addEventListener('pointerenter', () => (this.isPaused = true));
			slider.addEventListener('pointerleave', () => (this.isPaused = false));

			// pause on arrow hover/focus
			[this.prevBtn, this.nextBtn].forEach(btn => {
				if (!btn) return;
				btn.addEventListener('pointerenter', () => (this.isPaused = true));
				btn.addEventListener('pointerleave', () => (this.isPaused = false));
				btn.addEventListener('focus', () => (this.isPaused = true));
				btn.addEventListener('blur', () => (this.isPaused = false));
				// arrow click nudges the scroll by one slide width
				btn.addEventListener('click', (e) => {
					e.preventDefault();
					const slideW = this.slides[0] ? this.slides[0].getBoundingClientRect().width : 200;
					this.offset += btn.classList.contains('next') ? slideW : -slideW;
					this.offset = (this.offset + this.singleSetWidth) % this.singleSetWidth;
					this.track.style.transition = 'transform 0.35s ease';
					this.track.style.transform = `translateX(-${this.offset}px)`;
					setTimeout(() => (this.track.style.transition = ''), 360);
				});
			});

			// rebuild measurements on resize
			window.addEventListener('resize', () => {
				this.measureSingleSet();
			});
		}

		startLoop() {
			if (this._rafId) return;
			this._lastTime = null;
			const tick = (t) => {
				if (!this._lastTime) this._lastTime = t;
				const dt = (t - this._lastTime) / 1000;
				this._lastTime = t;
				if (!this.isPaused && this.singleSetWidth > 0) {
					this.offset += this.speed * dt;
					if (this.offset >= this.singleSetWidth) this.offset -= this.singleSetWidth;
					this.track.style.transform = `translateX(-${this.offset}px)`;
				}
				this._rafId = requestAnimationFrame(tick);
			};
			this._rafId = requestAnimationFrame(tick);
		}

		stopLoop() {
			if (!this._rafId) return;
			cancelAnimationFrame(this._rafId);
			this._rafId = null;
		}
	}

	// Parallax for hero image box (unchanged)
	function initHeroParallax() {
		const box = document.querySelector('.hero-image-box');
		if (!box) return;
		box.addEventListener('mousemove', (e) => {
			const rect = box.getBoundingClientRect();
			const x = (e.clientX - rect.left) / rect.width - 0.5;
			const y = (e.clientY - rect.top) / rect.height - 0.5;
			box.style.transform = `translate3d(${x * 8}px, ${y * 8}px, 0) rotate(${x * 1}deg)`;
		});
		box.addEventListener('mouseleave', () => (box.style.transform = 'translate3d(0,0,0)'));
	}

	// Intersection observer for subtle entrance animations (unchanged)
	function initObservers() {
		const observer = new IntersectionObserver((entries) => {
			entries.forEach(entry => {
				if (entry.isIntersecting) {
					entry.target.classList.add('inview');
					observer.unobserve(entry.target);
				}
			});
		}, { threshold: 0.12 });

		document.querySelectorAll('.animate-fade, .project-card, .service-card, .designer-card').forEach(el => {
			observer.observe(el);
		});
	}

	// Initialize everything
	document.addEventListener('DOMContentLoaded', () => {
		document.querySelectorAll('.carousel').forEach(node => {
new Carousel(node, {
    speed: 80
});			node.setAttribute('tabindex', '0');
		});

		initHeroParallax();
		initObservers();
// =========================
// Mobile Navigation Toggle
// =========================

const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelector(".nav-links");
const panelClose = document.getElementById("panelClose");

if (navToggle && navLinks) {

    function openMenu() {
        navLinks.classList.add("open");
        navToggle.setAttribute("aria-expanded", "true");
        navLinks.setAttribute("aria-hidden", "false");
    }

    function closeMenu() {
        navLinks.classList.remove("open");
        navToggle.setAttribute("aria-expanded", "false");
        navLinks.setAttribute("aria-hidden", "true");
    }

    // Toggle Menu
    navToggle.addEventListener("click", () => {
        if (navLinks.classList.contains("open")) {
            closeMenu();
        } else {
            openMenu();
        }
    });

    // Close Button
    if (panelClose) {
        panelClose.addEventListener("click", closeMenu);
    }

    // Close kapag pumili ng menu
    document.querySelectorAll(".nav-links a").forEach(link => {
        link.addEventListener("click", closeMenu);
    });

    // ESC key
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") {
            closeMenu();
        }
    });

    // Click outside
    document.addEventListener("click", (e) => {
        if (
            navLinks.classList.contains("open") &&
            !navLinks.contains(e.target) &&
            !navToggle.contains(e.target)
        ) {
            closeMenu();
        }
    });
	const navToggle=document.querySelector(".nav-toggle");

console.log(navToggle);

navToggle.addEventListener("click",()=>{

    console.log("MENU CLICKED");

});

} // <-- end if

}); // <-- end DOMContentLoaded

})(); // <-- end IIFE
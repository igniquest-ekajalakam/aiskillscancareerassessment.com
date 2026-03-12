/* ============================================================
   AI SKILL SCAN Career Assessment — Main JavaScript
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
    /* --------------------------------------------------------
       1. Sticky Header — add shadow on scroll
       -------------------------------------------------------- */
    const header = document.querySelector('.header');
    const onScroll = () => {
        if (window.scrollY > 10) {
            header.classList.add('header--scrolled');
        } else {
            header.classList.remove('header--scrolled');
        }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll(); // initial check

    /* --------------------------------------------------------
       2. Mobile Hamburger Menu
       -------------------------------------------------------- */
    const hamburger = document.querySelector('.hamburger');
    const nav = document.querySelector('.nav');
    const navOverlay = document.querySelector('.nav-overlay');

    const toggleMenu = () => {
        const isOpen = nav.classList.toggle('nav--open');
        hamburger.classList.toggle('hamburger--active');
        if (navOverlay) {
            navOverlay.classList.toggle('nav-overlay--visible', isOpen);
        }
        document.body.style.overflow = isOpen ? 'hidden' : '';
    };

    if (hamburger) {
        hamburger.addEventListener('click', toggleMenu);
    }

    if (navOverlay) {
        navOverlay.addEventListener('click', toggleMenu);
    }

    // Close menu when a nav link is clicked (mobile)
    document.querySelectorAll('.nav__link:not(.nav__dropdown-toggle)').forEach(link => {
        link.addEventListener('click', () => {
            if (nav.classList.contains('nav--open')) {
                toggleMenu();
            }
        });
    });

    /* --------------------------------------------------------
       3. Dropdown Menu for Assessments
       -------------------------------------------------------- */
    const dropdownToggle = document.querySelector('.nav__dropdown-toggle');
    const dropdown = document.querySelector('.nav__dropdown');

    if (dropdownToggle && dropdown) {
        dropdownToggle.addEventListener('click', (e) => {
            // Only prevent default and toggle on mobile
            if (window.innerWidth <= 768) {
                e.preventDefault();
                dropdown.classList.toggle('nav__dropdown--open');
            }
        });
    }

    // Close dropdown when clicking outside (desktop)
    document.addEventListener('click', (e) => {
        if (dropdown && !dropdown.contains(e.target)) {
            dropdown.classList.remove('nav__dropdown--open');
        }
    });

    /* --------------------------------------------------------
       4. Smooth Scroll for Anchor Links
       -------------------------------------------------------- */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            const targetId = anchor.getAttribute('href');
            if (targetId === '#') return;

            const targetEl = document.querySelector(targetId);
            if (targetEl) {
                e.preventDefault();
                const headerHeight = header.offsetHeight;
                const top = targetEl.getBoundingClientRect().top + window.scrollY - headerHeight - 16;
                window.scrollTo({ top, behavior: 'smooth' });
            }
        });
    });

    /* --------------------------------------------------------
       5. FAQ Accordion
       -------------------------------------------------------- */
    document.querySelectorAll('.faq-item__question').forEach(btn => {
        btn.addEventListener('click', () => {
            const item = btn.closest('.faq-item');
            const isOpen = item.classList.contains('faq-item--open');

            // Close all others
            document.querySelectorAll('.faq-item--open').forEach(openItem => {
                openItem.classList.remove('faq-item--open');
            });

            // Toggle current
            if (!isOpen) {
                item.classList.add('faq-item--open');
            }
        });
    });

    /* --------------------------------------------------------
       6. Contact Form Validation
       -------------------------------------------------------- */
    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            let isValid = true;

            // Clear previous errors
            contactForm.querySelectorAll('.form-group').forEach(group => {
                group.classList.remove('form-group--error');
            });

            // Validate Name
            const name = contactForm.querySelector('#name');
            if (name && name.value.trim() === '') {
                showError(name, 'Please enter your name.');
                isValid = false;
            }

            // Validate Email
            const email = contactForm.querySelector('#email');
            if (email) {
                const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (email.value.trim() === '') {
                    showError(email, 'Please enter your email address.');
                    isValid = false;
                } else if (!emailPattern.test(email.value.trim())) {
                    showError(email, 'Please enter a valid email address.');
                    isValid = false;
                }
            }

            // Validate Phone (optional but if filled must be valid)
            const phone = contactForm.querySelector('#phone');
            if (phone && phone.value.trim() !== '') {
                const phonePattern = /^[\d\s\-\+\(\)]{7,15}$/;
                if (!phonePattern.test(phone.value.trim())) {
                    showError(phone, 'Please enter a valid phone number.');
                    isValid = false;
                }
            }

            // Validate Message
            const message = contactForm.querySelector('#message');
            if (message && message.value.trim() === '') {
                showError(message, 'Please enter your message.');
                isValid = false;
            }

            if (isValid) {
                // Show success message
                const successMsg = contactForm.querySelector('.form-success');
                if (successMsg) {
                    successMsg.classList.add('form-success--visible');
                }
                contactForm.reset();

                // Hide success message after 5 seconds
                setTimeout(() => {
                    if (successMsg) {
                        successMsg.classList.remove('form-success--visible');
                    }
                }, 5000);
            }
        });
    }

    /**
     * Show error on a form field
     */
    function showError(input, message) {
        const group = input.closest('.form-group');
        if (group) {
            group.classList.add('form-group--error');
            const errorEl = group.querySelector('.error-msg');
            if (errorEl) {
                errorEl.textContent = message;
            }
        }
    }
});

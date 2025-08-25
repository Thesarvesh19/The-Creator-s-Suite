document.addEventListener('DOMContentLoaded', () => {

    // --- THEME SWITCH LOGIC ---
    const themeToggleBtn = document.getElementById('theme-toggle');
    if (localStorage.getItem('color-theme') === 'dark' || (!('color-theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        document.documentElement.classList.add('dark');
    } else {
        document.documentElement.classList.remove('dark');
    }
    themeToggleBtn.addEventListener('click', () => {
        document.documentElement.classList.toggle('dark');
        localStorage.setItem('color-theme', document.documentElement.classList.contains('dark') ? 'dark' : 'light');
    });

    // --- MOBILE MENU TOGGLE ---
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    mobileMenuButton.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });
    
    // --- HIDE MOBILE MENU ON LINK CLICK ---
    document.querySelectorAll('#mobile-menu a').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.add('hidden');
        });
    });

    // --- DATE & YEAR ---
    document.getElementById('current-year').textContent = new Date().getFullYear();
    document.getElementById('current-date').textContent = new Date().toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' });

    // --- 3D TILT CARD EFFECT ---
    document.querySelectorAll('.tilt-card').forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const { width, height } = rect;
            const rotateX = (y / height - 0.5) * -15;
            const rotateY = (x / width - 0.5) * 15;
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
        });
    });

    // --- INTERSECTION OBSERVER FOR ANIMATIONS ---
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Apply a staggered delay for timeline items
                if (entry.target.classList.contains('timeline-item')) {
                     entry.target.style.transitionDelay = `${index * 150}ms`;
                }
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.animated-element, .timeline-item').forEach(el => {
        if (el.classList.contains('animated-element')) {
            el.style.transform = 'translateY(30px)';
        }
        observer.observe(el);
    });

    // --- COPY EMAIL LOGIC ---
    const copyBtn = document.getElementById('copy-email');
    const copyIcon = document.getElementById('copy-icon');
    const emailToCopy = 'sarveshsoumil@email.com';
    copyBtn.addEventListener('click', () => {
        navigator.clipboard.writeText(emailToCopy).then(() => {
            copyIcon.classList.replace('fa-copy', 'fa-check');
            copyBtn.title = 'Copied!';
            setTimeout(() => {
                copyIcon.classList.replace('fa-check', 'fa-copy');
                copyBtn.title = 'Copy email';
            }, 2000);
        });
    });
    
    // --- BACK TO TOP BUTTON & HEADER STYLE ON SCROLL ---
    const backToTopButton = document.getElementById('back-to-top');
    const header = document.getElementById('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTopButton.classList.remove('hidden');
            backToTopButton.classList.add('flex');
            setTimeout(() => backToTopButton.style.transform = 'scale(1)', 10);
            header.classList.add('scrolled');
        } else {
            backToTopButton.style.transform = 'scale(0)';
            setTimeout(() => backToTopButton.classList.add('hidden'), 300);
            header.classList.remove('scrolled');
        }
    });
    backToTopButton.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // --- SMOOTH SCROLL FOR ANCHOR LINKS ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
});



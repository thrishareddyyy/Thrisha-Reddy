/* ============================================
   THRISHA REDDY VATTE — PORTFOLIO JS
   Particles · Typing · Scroll animations
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

    // ────────── Particle Background ──────────
    const canvas = document.getElementById('particles-canvas');
    const ctx = canvas.getContext('2d');
    let particles = [];
    let mouseX = 0, mouseY = 0;

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    window.addEventListener('mousemove', e => { mouseX = e.clientX; mouseY = e.clientY; });

    class Particle {
        constructor() { this.reset(); }
        reset() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.vx = (Math.random() - 0.5) * 0.4;
            this.vy = (Math.random() - 0.5) * 0.4;
            this.radius = Math.random() * 2 + 0.5;
            this.opacity = Math.random() * 0.5 + 0.1;
        }
        update() {
            this.x += this.vx;
            this.y += this.vy;
            if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
            if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
        }
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(99, 102, 241, ${this.opacity})`;
            ctx.fill();
        }
    }

    // Create particles (but keep them fewer for performance)
    const particleCount = Math.min(80, Math.floor(window.innerWidth / 15));
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }

    function drawLines() {
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 150) {
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.strokeStyle = `rgba(99, 102, 241, ${0.08 * (1 - dist / 150)})`;
                    ctx.lineWidth = 0.5;
                    ctx.stroke();
                }
            }
            // Draw line to mouse if close
            const dxm = particles[i].x - mouseX;
            const dym = particles[i].y - mouseY;
            const distM = Math.sqrt(dxm * dxm + dym * dym);
            if (distM < 200) {
                ctx.beginPath();
                ctx.moveTo(particles[i].x, particles[i].y);
                ctx.lineTo(mouseX, mouseY);
                ctx.strokeStyle = `rgba(6, 182, 212, ${0.15 * (1 - distM / 200)})`;
                ctx.lineWidth = 0.8;
                ctx.stroke();
            }
        }
    }

    function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(p => { p.update(); p.draw(); });
        drawLines();
        requestAnimationFrame(animateParticles);
    }
    animateParticles();


    // ────────── Hero Data Visualization SVG ──────────
    function createDataGlobe() {
        const svg = document.getElementById('data-globe');
        if (!svg) return;
        const ns = 'http://www.w3.org/2000/svg';
        const cx = 200, cy = 200, r = 140;

        // Outer ring
        const outerRing = document.createElementNS(ns, 'circle');
        outerRing.setAttribute('cx', cx);
        outerRing.setAttribute('cy', cy);
        outerRing.setAttribute('r', r);
        outerRing.setAttribute('fill', 'none');
        outerRing.setAttribute('stroke', 'rgba(99,102,241,0.15)');
        outerRing.setAttribute('stroke-width', '2');
        svg.appendChild(outerRing);

        // Orbiting rings
        for (let i = 0; i < 3; i++) {
            const ellipse = document.createElementNS(ns, 'ellipse');
            ellipse.setAttribute('cx', cx);
            ellipse.setAttribute('cy', cy);
            ellipse.setAttribute('rx', r - 10);
            ellipse.setAttribute('ry', 30 + i * 25);
            ellipse.setAttribute('fill', 'none');
            ellipse.setAttribute('stroke', i % 2 === 0 ? 'rgba(99,102,241,0.2)' : 'rgba(6,182,212,0.2)');
            ellipse.setAttribute('stroke-width', '1.5');
            ellipse.setAttribute('transform', `rotate(${60 * i} ${cx} ${cy})`);
            ellipse.setAttribute('stroke-dasharray', '8,6');

            // Animate rotation
            const anim = document.createElementNS(ns, 'animateTransform');
            anim.setAttribute('attributeName', 'transform');
            anim.setAttribute('type', 'rotate');
            anim.setAttribute('from', `${60 * i} ${cx} ${cy}`);
            anim.setAttribute('to', `${60 * i + 360} ${cx} ${cy}`);
            anim.setAttribute('dur', `${20 + i * 5}s`);
            anim.setAttribute('repeatCount', 'indefinite');
            ellipse.appendChild(anim);
            svg.appendChild(ellipse);
        }

        // Data nodes
        const nodeData = [
            { angle: 0, dist: 100, color: '#6366f1', size: 7 },
            { angle: 45, dist: 120, color: '#06b6d4', size: 5 },
            { angle: 90, dist: 80, color: '#8b5cf6', size: 8 },
            { angle: 135, dist: 130, color: '#6366f1', size: 4 },
            { angle: 180, dist: 110, color: '#06b6d4', size: 6 },
            { angle: 225, dist: 90, color: '#8b5cf6', size: 5 },
            { angle: 270, dist: 125, color: '#6366f1', size: 7 },
            { angle: 315, dist: 95, color: '#06b6d4', size: 6 },
        ];

        nodeData.forEach((node, i) => {
            const rad = node.angle * Math.PI / 180;
            const nx = cx + Math.cos(rad) * node.dist;
            const ny = cy + Math.sin(rad) * node.dist;

            // Glow
            const glow = document.createElementNS(ns, 'circle');
            glow.setAttribute('cx', nx);
            glow.setAttribute('cy', ny);
            glow.setAttribute('r', node.size + 6);
            glow.setAttribute('fill', node.color);
            glow.setAttribute('opacity', '0.15');
            svg.appendChild(glow);

            // Node
            const circle = document.createElementNS(ns, 'circle');
            circle.setAttribute('cx', nx);
            circle.setAttribute('cy', ny);
            circle.setAttribute('r', node.size);
            circle.setAttribute('fill', node.color);
            circle.setAttribute('opacity', '0.8');
            svg.appendChild(circle);

            // Pulse animation
            const animR = document.createElementNS(ns, 'animate');
            animR.setAttribute('attributeName', 'r');
            animR.setAttribute('values', `${node.size};${node.size + 3};${node.size}`);
            animR.setAttribute('dur', `${2 + i * 0.3}s`);
            animR.setAttribute('repeatCount', 'indefinite');
            circle.appendChild(animR);

            // Connecting lines
            const line = document.createElementNS(ns, 'line');
            line.setAttribute('x1', cx);
            line.setAttribute('y1', cy);
            line.setAttribute('x2', nx);
            line.setAttribute('y2', ny);
            line.setAttribute('stroke', node.color);
            line.setAttribute('stroke-width', '1');
            line.setAttribute('opacity', '0.1');
            svg.insertBefore(line, svg.firstChild);
        });

        // Center logo
        const centerCircle = document.createElementNS(ns, 'circle');
        centerCircle.setAttribute('cx', cx);
        centerCircle.setAttribute('cy', cy);
        centerCircle.setAttribute('r', '25');
        centerCircle.setAttribute('fill', 'rgba(99,102,241,0.2)');
        centerCircle.setAttribute('stroke', 'rgba(99,102,241,0.4)');
        centerCircle.setAttribute('stroke-width', '2');
        svg.appendChild(centerCircle);

        const centerText = document.createElementNS(ns, 'text');
        centerText.setAttribute('x', cx);
        centerText.setAttribute('y', cy + 6);
        centerText.setAttribute('text-anchor', 'middle');
        centerText.setAttribute('fill', '#818cf8');
        centerText.setAttribute('font-size', '18');
        centerText.setAttribute('font-family', 'JetBrains Mono, monospace');
        centerText.setAttribute('font-weight', '700');
        centerText.textContent = '📊';
        svg.appendChild(centerText);
    }
    createDataGlobe();


    // ────────── Typing Effect ──────────
    const roles = [
        'Data Analyst',
        'Visualization Specialist',
        'Python Developer',
        'Business Intelligence Analyst',
        'Machine Learning Enthusiast',
        'Data Storyteller'
    ];
    let roleIndex = 0, charIndex = 0, isDeleting = false;
    const typedEl = document.getElementById('typed-text');

    function typeEffect() {
        const currentRole = roles[roleIndex];
        if (!isDeleting) {
            typedEl.textContent = currentRole.substring(0, charIndex + 1);
            charIndex++;
            if (charIndex === currentRole.length) {
                setTimeout(() => { isDeleting = true; typeEffect(); }, 2000);
                return;
            }
        } else {
            typedEl.textContent = currentRole.substring(0, charIndex - 1);
            charIndex--;
            if (charIndex === 0) {
                isDeleting = false;
                roleIndex = (roleIndex + 1) % roles.length;
            }
        }
        setTimeout(typeEffect, isDeleting ? 40 : 80);
    }
    typeEffect();


    // ────────── Nav Scroll Effect ──────────
    const nav = document.getElementById('nav');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 80) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    });

    // Active nav link
    const sections = document.querySelectorAll('.section, .hero');
    const navLinks = document.querySelectorAll('.nav-links a[data-section]');

    const observerOptions = {
        root: null,
        rootMargin: '-20% 0px -60% 0px',
        threshold: 0
    };

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.id;
                navLinks.forEach(link => {
                    link.classList.toggle('active', link.getAttribute('data-section') === id);
                });
            }
        });
    }, observerOptions);

    sections.forEach(section => sectionObserver.observe(section));


    // ────────── Mobile Nav Toggle ──────────
    const navToggle = document.getElementById('nav-toggle');
    const navLinksContainer = document.getElementById('nav-links');

    navToggle.addEventListener('click', () => {
        navLinksContainer.classList.toggle('open');
        navToggle.classList.toggle('active');
    });

    navLinksContainer.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navLinksContainer.classList.remove('open');
            navToggle.classList.remove('active');
        });
    });


    // ────────── Stat Counter Animation ──────────
    function animateCounters() {
        const stats = document.querySelectorAll('.stat-number');
        stats.forEach(stat => {
            const target = parseInt(stat.getAttribute('data-target'));
            const duration = 2000;
            const startTime = performance.now();

            function update(currentTime) {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);
                // Ease out
                const easeOut = 1 - Math.pow(1 - progress, 3);
                stat.textContent = Math.floor(target * easeOut);
                if (progress < 1) {
                    requestAnimationFrame(update);
                }
            }
            requestAnimationFrame(update);
        });
    }

    // Observe hero stats
    const statsSection = document.querySelector('.hero-stats');
    if (statsSection) {
        const statsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounters();
                    statsObserver.disconnect();
                }
            });
        }, { threshold: 0.5 });
        statsObserver.observe(statsSection);
    }


    // ────────── Skill Bar Animation ──────────
    const skillFills = document.querySelectorAll('.skill-fill');
    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const fills = entry.target.querySelectorAll('.skill-fill');
                fills.forEach((fill, i) => {
                    setTimeout(() => {
                        fill.style.width = fill.getAttribute('data-width') + '%';
                    }, i * 100);
                });
                skillObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });

    document.querySelectorAll('.skill-category').forEach(cat => skillObserver.observe(cat));


    // ────────── Scroll Reveal Animation ──────────
    const revealElements = document.querySelectorAll(
        '.about-card, .highlight-card, .skill-category, .project-card, .timeline-item, .cert-card, .value-card, .contact-card, .contact-form'
    );

    revealElements.forEach(el => el.classList.add('animate-on-scroll'));

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, i) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, i * 60);
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    revealElements.forEach(el => revealObserver.observe(el));


    // ────────── Project Filter ──────────
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.getAttribute('data-filter');
            projectCards.forEach(card => {
                const categories = card.getAttribute('data-category');
                if (filter === 'all' || categories.includes(filter)) {
                    card.style.display = '';
                    card.style.animation = 'fadeInUp 0.5s var(--ease-smooth) both';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });


    // ────────── Contact Form ──────────
    const form = document.getElementById('contact-form');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;

            // mailto fallback
            const mailtoLink = `mailto:nagathrishavatte@gmail.com?subject=${encodeURIComponent(subject || 'Portfolio Contact')}&body=${encodeURIComponent(`From: ${name} (${email})\n\n${message}`)}`;
            window.location.href = mailtoLink;

            // Show success
            const btn = form.querySelector('button[type="submit"]');
            const originalText = btn.innerHTML;
            btn.innerHTML = '✓ Opening Email Client...';
            btn.style.background = 'linear-gradient(135deg, #10b981, #06b6d4)';
            setTimeout(() => {
                btn.innerHTML = originalText;
                btn.style.background = '';
                form.reset();
            }, 3000);
        });
    }


    // ────────── Smooth Scroll for anchor links ──────────
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            e.preventDefault();
            const target = document.querySelector(anchor.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

});

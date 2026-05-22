// Loading Screen
const loader = document.getElementById('loader');
const body = document.body;

window.addEventListener('load', () => {
    setTimeout(() => {
        loader.classList.add('hidden');
        body.classList.remove('loading');
    }, 1500);
});

// Custom Cursor
const cursorDot = document.getElementById('cursorDot');
const cursorOutline = document.getElementById('cursorOutline');

if (window.matchMedia('(min-width: 769px)').matches) {
    document.addEventListener('mousemove', (e) => {
        const posX = e.clientX;
        const posY = e.clientY;

        cursorDot.style.left = `${posX}px`;
        cursorDot.style.top = `${posY}px`;

        cursorOutline.animate({
            left: `${posX}px`,
            top: `${posY}px`
        }, { duration: 500, fill: 'forwards' });
    });

    // Magnetic effect for buttons
    const magneticBtns = document.querySelectorAll('.magnetic-btn');
    magneticBtns.forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            btn.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
        });

        btn.addEventListener('mouseleave', () => {
            btn.style.transform = 'translate(0, 0)';
        });
    });

    // Hover effects for cursor
    const hoverElements = document.querySelectorAll('a, button, .skill-card, .project-card, .cert-card');
    hoverElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursorOutline.style.width = '60px';
            cursorOutline.style.height = '60px';
            cursorOutline.style.borderColor = 'var(--primary-light)';
        });
        el.addEventListener('mouseleave', () => {
            cursorOutline.style.width = '40px';
            cursorOutline.style.height = '40px';
            cursorOutline.style.borderColor = 'var(--primary)';
        });
    });
}

// Particles Background
const canvas = document.getElementById('particlesCanvas');
const ctx = canvas.getContext('2d');

let particles = [];
const particleCount = 50;

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

function createParticles() {
    particles = [];
    for (let i = 0; i < particleCount; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            size: Math.random() * 2 + 0.5,
            speedX: (Math.random() - 0.5) * 0.5,
            speedY: (Math.random() - 0.5) * 0.5,
            opacity: Math.random() * 0.5 + 0.1
        });
    }
}

function drawParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach((particle, i) => {
        particle.x += particle.speedX;
        particle.y += particle.speedY;

        if (particle.x < 0 || particle.x > canvas.width) particle.speedX *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.speedY *= -1;

        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${particle.opacity})`;
        ctx.fill();

        // Draw connections
        for (let j = i + 1; j < particles.length; j++) {
            const dx = particles[j].x - particle.x;
            const dy = particles[j].y - particle.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 150) {
                ctx.beginPath();
                ctx.moveTo(particle.x, particle.y);
                ctx.lineTo(particles[j].x, particles[j].y);
                ctx.strokeStyle = `rgba(255, 255, 255, ${0.1 * (1 - distance / 150)})`;
                ctx.lineWidth = 0.5;
                ctx.stroke();
            }
        }
    });

    requestAnimationFrame(drawParticles);
}

resizeCanvas();
createParticles();
drawParticles();

window.addEventListener('resize', () => {
    resizeCanvas();
    createParticles();
});

// Navbar scroll effect
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Active nav link on scroll
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        if (scrollY >= sectionTop) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Mobile menu
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
const overlay = document.getElementById('overlay');
const mobileClose = document.getElementById('mobileClose');
const mobileLinks = document.querySelectorAll('.mobile-link');

function toggleMenu() {
    hamburger.classList.toggle('active');
    mobileMenu.classList.toggle('active');
    overlay.classList.toggle('active');
    document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
}

hamburger.addEventListener('click', toggleMenu);
overlay.addEventListener('click', toggleMenu);
mobileClose.addEventListener('click', toggleMenu);
mobileLinks.forEach(link => link.addEventListener('click', toggleMenu));

// Theme toggle
const themeToggle = document.getElementById('themeToggle');
const themeIcon = themeToggle.querySelector('i');

// Check for saved theme
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);
}

function updateThemeIcon(theme) {
    if (theme === 'dark') {
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
    } else {
        themeIcon.classList.remove('fa-sun');
        themeIcon.classList.add('fa-moon');
    }
}

themeToggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
});

// Scroll to top
const scrollTop = document.getElementById('scrollTop');
window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
        scrollTop.classList.add('visible');
    } else {
        scrollTop.classList.remove('visible');
    }
});

scrollTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Counter animation
const statNumbers = document.querySelectorAll('.stat-number');

function animateCounter(el) {
    const target = parseInt(el.getAttribute('data-target'));
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;

    const timer = setInterval(() => {
        current += step;
        if (current >= target) {
            el.textContent = target;
            clearInterval(timer);
        } else {
            el.textContent = Math.floor(current);
        }
    }, 16);
}

// Skill progress bars
const progressBars = document.querySelectorAll('.progress-bar');

function animateProgressBars() {
    progressBars.forEach(bar => {
        const progress = bar.getAttribute('data-progress');
        bar.style.width = `${progress}%`;
    });
}

// Contact form
const contactForm = document.getElementById('contactForm');
const toast = document.getElementById('toast');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = contactForm.querySelector('button');
    const originalText = btn.innerHTML;
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Mengirim...';
    btn.disabled = true;

    setTimeout(() => {
        btn.innerHTML = '<i class="fas fa-check"></i> Pesan Terkirim!';
        btn.style.background = 'var(--success)';
        contactForm.reset();

        // Show toast
        toast.classList.add('show');
        setTimeout(() => {
            toast.classList.remove('show');
        }, 3000);

        setTimeout(() => {
            btn.innerHTML = originalText;
            btn.style.background = '';
            btn.disabled = false;
        }, 3000);
    }, 1500);
});

// Download CV
// const downloadCV = document.getElementById('downloadCV');
// downloadCV.addEventListener('click', () => {
//     // Create a simple CV content
//     const cvContent = `
// M FITROH SODIKIN
// ================
// Lulusan S1 Teknik Informatika - Konsentrasi AI

// KONTAK
// ------
// Email: mfitrohsodikin@gmail.com
// Telepon: +62 899 7480 801
// Lokasi: Garut, Indonesia

// RINGKASAN
// ---------
// Lulusan S1 Teknik Informatika dengan konsentrasi Artificial Intelligence.
// Berpengalaman dalam pengolahan data, administrasi, pengoperasian komputer,
// dan teknologi informasi. Teliti, disiplin, dan cepat beradaptasi.

// KEAHLIAN
// --------
// - Microsoft Excel (Pivot Table, VLOOKUP, Dashboard)
// - Administrasi Dokumen & Manajemen Data
// - Pengolahan & Validasi Data
// - Pengembangan Web Dasar (HTML, CSS, JavaScript)
// - Sistem & Teknologi Informasi (IT Support, Helpdesk)
// - Artificial Intelligence & Machine Learning (Python)

// PENGALAMAN KERJA
// ----------------
// 1. IT Support (Magang) - PT Langgeng Sejahtera Kreasi Komputasi
//    2023 - 2024
//    - Pengembangan proyek deteksi angka meteran air analog berbasis AI
//    - Instalasi, pengecekan, dan troubleshooting perangkat komputer
//    - Input, pengolahan, dan validasi 100+ data proyek

// 2. Sortir & Staff Gudang (Magian) - PT Pos Indonesia
//    2019 - 2020
//    - Pengecekan, penyortiran, dan pencatatan barang
//    - Input dan rekap 200+ data barang/paket per minggu
//    - Memastikan kelancaran proses distribusi

// PENDIDIKAN
// ----------
// Institut Teknologi Garut
// S1 - Teknik Informatika (Konsentrasi AI)
// 2020 - 2024

// SERTIFIKAT
// ----------
// - Sertifikat Kompetensi Keahlian (Teknologi Informasi)
// - Pelatihan Excel Admin Keuangan

// Dibuat pada: ${new Date().toLocaleDateString('id-ID')}
//     `;

//     const blob = new Blob([cvContent], { type: 'text/plain' });
//     const url = URL.createObjectURL(blob);
//     const a = document.createElement('a');
//     a.href = url;
//     a.download = 'CV_M_Fitroh_Sodikin.txt';
//     document.body.appendChild(a);
//     a.click();
//     document.body.removeChild(a);
//     URL.revokeObjectURL(url);
// });

// Scroll reveal animation
const revealElements = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');

            // Animate counters if in hero stats
            const counters = entry.target.querySelectorAll('.stat-number');
            counters.forEach(counter => {
                if (!counter.classList.contains('animated')) {
                    counter.classList.add('animated');
                    animateCounter(counter);
                }
            });

            // Animate progress bars if in skills
            const bars = entry.target.querySelectorAll('.progress-bar');
            if (bars.length > 0) {
                setTimeout(animateProgressBars, 300);
            }
        }
    });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

revealElements.forEach(el => revealObserver.observe(el));

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({ top: offsetTop, behavior: 'smooth' });
        }
    });
});

// Parallax effect for hero shapes
window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    const shapes = document.querySelectorAll('.hero-bg-shapes .shape');
    shapes.forEach((shape, index) => {
        const speed = 0.1 + (index * 0.05);
        shape.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// Typing effect for hero subtitle (optional enhancement)
const heroSubtitle = document.querySelector('.hero-subtitle');
if (heroSubtitle) {
    const text = heroSubtitle.textContent;
    heroSubtitle.textContent = '';
    let i = 0;

    function typeWriter() {
        if (i < text.length) {
            heroSubtitle.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, 50);
        }
    }

    // Start typing after loader is hidden
    setTimeout(typeWriter, 2000);
}

// Add ripple effect to buttons
document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const ripple = document.createElement('span');
        ripple.style.cssText = `
            position: absolute;
            background: rgba(255, 255, 255, 0.3);
            border-radius: 50%;
            transform: scale(0);
            animation: ripple-effect 0.6s linear;
            pointer-events: none;
            left: ${x}px;
            top: ${y}px;
            width: 20px;
            height: 20px;
            margin-left: -10px;
            margin-top: -10px;
        `;

        this.style.position = 'relative';
        this.style.overflow = 'hidden';
        this.appendChild(ripple);

        setTimeout(() => ripple.remove(), 600);
    });
});

// Add ripple animation keyframes dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple-effect {
        to {
            transform: scale(20);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Keyboard navigation support
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
        toggleMenu();
    }
});

// Performance: Pause animations when tab is hidden
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        // Pause expensive animations
    } else {
        // Resume animations
    }
});

console.log('Portofolio M Fitroh Sodikin - Loaded successfully!');
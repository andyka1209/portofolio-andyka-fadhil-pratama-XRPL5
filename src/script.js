document.addEventListener('DOMContentLoaded', function() {
    // --- DEFINISI VARIABEL ---
    const header = document.querySelector('header');
    const navLinks = document.querySelectorAll('nav a');
    const heroTitle = document.querySelector('.hero-content h1');
    const revealCards = document.querySelectorAll('.glass-card, .skill-card, .project-card, .stat-card, .glass-card_contact-form-style');
    const glassCards = document.querySelectorAll('.glass-card, .glass-card_contact-form-style');
    const skillIcons = document.querySelectorAll('.skill-card i');
    const statsSection = document.querySelector('.stats-grid');
    const statNumbers = document.querySelectorAll('.stat-card h3');
    
    // Variabel Form
    const form = document.getElementById('my-form');
    const formButton = document.getElementById('my-form-button');
    const formStatus = document.getElementById('my-form-status');
    const inputNama = document.getElementById('nama');
    const inputEmail = document.getElementById('email');
    const inputMessage = document.getElementById('message');

    // --- VARIABEL HAMBURGER MENU ---
    const hamburger = document.querySelector('.hamburger');
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileMenuOverlay = document.querySelector('.mobile-menu-overlay');
    const mobileMenuLinks = document.querySelectorAll('.mobile-menu a');
    const body = document.body;

    // --- HAMBURGER MENU FUNCTIONALITY ---
    function toggleMobileMenu() {
        hamburger.classList.toggle('active');
        mobileMenu.classList.toggle('active');
        mobileMenuOverlay.classList.toggle('active');
        body.classList.toggle('menu-open');
    }

    // Event listener untuk hamburger button
    if (hamburger) {
        hamburger.addEventListener('click', function(e) {
            e.stopPropagation();
            toggleMobileMenu();
        });
    }

    // Event listener untuk overlay (close menu when clicking outside)
    if (mobileMenuOverlay) {
        mobileMenuOverlay.addEventListener('click', toggleMobileMenu);
    }

    // Close menu ketika link diklik
    mobileMenuLinks.forEach(link => {
        link.addEventListener('click', function() {
            toggleMobileMenu();
        });
    });

    // --- LOGIKA FILTER PROYEK ---
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // 1. Hapus class active dari semua tombol
            filterButtons.forEach(b => b.classList.remove('active'));
            // 2. Tambah class active ke tombol yang diklik
            btn.classList.add('active');

            // 3. Ambil value filter dari tombol yang diklik
            const filterValue = btn.getAttribute('data-filter');

            // 4. Filter Project Cards
            projectCards.forEach(card => {
                const category = card.getAttribute('data-category');

                if (filterValue === 'all' || filterValue === category) {
                    // Tampilkan card
                    card.style.display = 'block'; 
                    // Timeout kecil untuk memicu transisi CSS
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 50);
                } else {
                    // Sembunyikan card (animasi dulu baru hilang)
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });

    // --- SCROLL HEADER EFFECT ---
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.style.background = 'rgba(21, 16, 34, 0.95)';
            header.style.padding = '0.8rem 0';
        } else {
            header.style.background = 'rgba(21, 16, 34, 0.5)';
            header.style.padding = '1.2rem 0';
        }
    });

    // --- TYPING EFFECT ---
    if (heroTitle) {
        const text = heroTitle.textContent;
        heroTitle.textContent = '';
        heroTitle.style.opacity = '1';
        
        let i = 0;
        const typeText = () => {
            if (i < text.length) {
                heroTitle.textContent += text.charAt(i);
                i++;
                setTimeout(typeText, 50);
            }
        };
        setTimeout(typeText, 500);
    }

    // --- REVEAL ANIMATION ---
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    revealCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'all 0.6s ease';
        revealObserver.observe(card);
    });

    // --- SMOOTH SCROLL ---
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href.startsWith('#')) {
                e.preventDefault();
                const section = document.querySelector(href);
                if (section) {
                    section.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }
        });
    });

    // --- SKILL ICON HOVER ---
    skillIcons.forEach(icon => {
        icon.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.2) rotate(10deg)';
            this.style.transition = 'all 0.3s ease';
        });
        
        icon.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1) rotate(0deg)';
        });
    });

    // --- GLASSMOPHISM MOUSE EFFECT ---
    glassCards.forEach(card => {
        card.addEventListener('mousemove', function(e) {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
        });
    });

    // --- STATS ANIMATION ---
    let statsAnimated = false;
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !statsAnimated) {
                statsAnimated = true;
                statNumbers.forEach(stat => {
                    const text = stat.textContent;
                    const hasPercent = text.includes('%');
                    const hasPlus = text.includes('+');
                    const number = parseInt(text);
                    
                    if (!isNaN(number)) {
                        let current = 0;
                        const increment = number / 30;
                        
                        const timer = setInterval(() => {
                            current += increment;
                            
                            let suffix = ' Proyek+';
                            if(hasPlus) suffix = ' Bulan+';
                            if(hasPercent) suffix = '%';

                            if (current >= number) {
                                stat.textContent = number + suffix;
                                clearInterval(timer);
                            } else {
                                stat.textContent = Math.floor(current) + suffix;
                            }
                        }, 50);
                    }
                });
            }
        });
    }, { threshold: 0.5 });

    if (statsSection) {
        statsObserver.observe(statsSection);
    }

    // --- FORM HANDLING ---
    if (form) {
        form.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            let isValid = true;
            
            [inputNama, inputEmail, inputMessage].forEach(input => {
                if(input) input.classList.remove('input-error');
            });
            
            if (!inputNama.value.trim()) {
                inputNama.classList.add('input-error');
                isValid = false;
            }
            
            if (!inputEmail.value.trim() || !inputEmail.value.includes('@')) {
                inputEmail.classList.add('input-error');
                isValid = false;
            }
            
            if (!inputMessage.value.trim()) {
                inputMessage.classList.add('input-error');
                isValid = false;
            }
            
            if (!isValid) {
                formStatus.textContent = 'Mohon lengkapi semua field dengan benar!';
                formStatus.className = 'form-status error';
                formStatus.style.display = 'block';
                return;
            }
            
            formButton.textContent = 'Mengirim...';
            formButton.disabled = true;
            
            try {
                const response = await fetch(form.action, {
                    method: 'POST',
                    body: new FormData(form),
                    headers: { 'Accept': 'application/json' }
                });
                
                if (response.ok) {
                    formStatus.textContent = 'Pesan berhasil dikirim! Terima kasih.';
                    formStatus.className = 'form-status success';
                    formStatus.style.display = 'block';
                    form.reset();
                } else {
                    throw new Error('Gagal mengirim');
                }
            } catch (error) {
                formStatus.textContent = 'Terjadi kesalahan. Coba lagi nanti.';
                formStatus.className = 'form-status error';
                formStatus.style.display = 'block';
            } finally {
                formButton.textContent = 'Kirim Pesan';
                formButton.disabled = false;
            }
        });
    }
});

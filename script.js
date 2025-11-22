// Animasi saat scroll
window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    
    if (window.scrollY > 50) {
        header.style.background = 'rgba(21, 16, 34, 0.95)';
        header.style.padding = '0.8rem 0';
    } else {
        header.style.background = 'rgba(21, 16, 34, 0.5)';
        header.style.padding = '1.2rem 0';
    }
});

// Animasi elemen saat muncul di layar
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, {
    threshold: 0.1
});

// Tambahkan animasi ke semua card
document.addEventListener('DOMContentLoaded', function() {
    // PERUBAHAN DI SINI: Saya menambahkan .glass-card_contact-form-style
    const cards = document.querySelectorAll('.glass-card, .skill-card, .project-card, .stat-card, .glass-card_contact-form-style');
    
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'all 0.6s ease';
        observer.observe(card);
    });
    
    // Animasi typing untuk hero title
    const heroTitle = document.querySelector('.hero-content h1');
    if (heroTitle) {
        const text = heroTitle.textContent;
        heroTitle.textContent = '';
        heroTitle.style.opacity = '1';
        
        let i = 0;
        function typeText() {
            if (i < text.length) {
                heroTitle.textContent += text.charAt(i);
                i++;
                setTimeout(typeText, 50);
            }
        }
        setTimeout(typeText, 500);
    }
    
    // Smooth scroll untuk navigasi
    document.querySelectorAll('nav a').forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href.startsWith('#')) {
                e.preventDefault();
                const section = document.querySelector(href);
                if (section) {
                    section.scrollIntoView({ 
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
    
    // Animasi skill icons saat hover
    const skillIcons = document.querySelectorAll('.skill-card i');
    skillIcons.forEach(icon => {
        icon.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.2) rotate(10deg)';
            this.style.transition = 'all 0.3s ease';
        });
        
        icon.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1) rotate(0deg)';
        });
    });
    
    // Counter animasi untuk stats
    const statNumbers = document.querySelectorAll('.stat-card h3');
    let animated = false;
    
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !animated) {
                animated = true;
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
                            if (current >= number) {
                                stat.textContent = number + (hasPlus ? ' Bulan+' : hasPercent ? '%' : ' Proyek+');
                                clearInterval(timer);
                            } else {
                                stat.textContent = Math.floor(current) + (hasPlus ? ' Bulan+' : hasPercent ? '%' : ' Proyek+');
                            }
                        }, 50);
                    }
                });
            }
        });
    }, { threshold: 0.5 });
    
    const statsSection = document.querySelector('.stats-grid');
    if (statsSection) {
        statsObserver.observe(statsSection);
    }
    
    // Validasi form
    const form = document.getElementById('my-form');
    const formButton = document.getElementById('my-form-button');
    const formStatus = document.getElementById('my-form-status');
    
    if (form) {
        form.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const nama = document.getElementById('nama');
            const email = document.getElementById('email');
            const message = document.getElementById('message');
            
            let isValid = true;
            
            // Reset error states
            [nama, email, message].forEach(input => {
                input.classList.remove('input-error');
            });
            
            // Validasi
            if (nama.value.trim() === '') {
                nama.classList.add('input-error');
                isValid = false;
            }
            
            if (email.value.trim() === '' || !email.value.includes('@')) {
                email.classList.add('input-error');
                isValid = false;
            }
            
            if (message.value.trim() === '') {
                message.classList.add('input-error');
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


const glassCards = document.querySelectorAll('.glass-card, .glass-card_contact-form-style');
glassCards.forEach(card => {
    card.addEventListener('mousemove', function(e) {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);
    });
});
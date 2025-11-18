// Interactive Portfolio Effects
(function() {
    'use strict';

    // Wait for DOM to be ready
    function init() {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', startEffects);
        } else {
            startEffects();
        }
    }

    function startEffects() {
        // Add click effects to profile elements
        addClickEffects();
        
        // Add hover animations
        addHoverEffects();
        
        // Add typing animation to hero text
        addTypingAnimation();
        
        // Add skill bar animations
        addSkillAnimations();
        
        // Add particle effects
        addParticleSystem();
        
        // Add hamburger menu functionality
        addHamburgerMenu();
    }

    // Click effects for profile elements
    function addClickEffects() {

        // About section click effect
        const aboutSection = document.querySelector('.about');
        if (aboutSection) {
            aboutSection.addEventListener('click', function(e) {
                createClickBurst(e.clientX, e.clientY);
                addShakeEffect(this);
            });
        }

        // Service cards click effects
        const serviceCards = document.querySelectorAll('.card');
        serviceCards.forEach((card, index) => {
            card.addEventListener('click', function(e) {
                createClickBurst(e.clientX, e.clientY);
                addCardFlipEffect(this);
                
                // Add special effects based on card
                if (index === 0) { // Web development card
                    createCodeRain();
                } else if (index === 1) { // More About Me card
                    createProfileReveal();
                } else if (index === 2) { // Google development card
                    createGoogleEffect();
                }
            });
        });

        // Skills section click effect
        const skillsSection = document.querySelector('.skills_section');
        if (skillsSection) {
            skillsSection.addEventListener('click', function(e) {
                createClickBurst(e.clientX, e.clientY);
                animateSkillBars();
            });
        }

        // Contact section click effect
        const contactSection = document.querySelector('.contact-me');
        if (contactSection) {
            contactSection.addEventListener('click', function(e) {
                createClickBurst(e.clientX, e.clientY);
                createContactRipple(e);
            });
        }

        // Social links click effects
        const socialLinks = document.querySelectorAll('.social a');
        socialLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                createClickBurst(e.clientX, e.clientY);
                addSocialPulse(this);
            });
        });
    }

    // Create click burst effect
    function createClickBurst(x, y) {
        const burst = document.createElement('div');
        burst.style.cssText = `
            position: fixed;
            left: ${x}px;
            top: ${y}px;
            width: 20px;
            height: 20px;
            background: radial-gradient(circle, #73F2CE, #45C4B0);
            border-radius: 50%;
            pointer-events: none;
            z-index: 1000;
            animation: burst 0.6s ease-out forwards;
        `;
        
        document.body.appendChild(burst);
        
        setTimeout(() => {
            document.body.removeChild(burst);
        }, 600);
    }

    // Add CSS animations
    function addCSSAnimations() {
        const style = document.createElement('style');
        style.textContent = `
            @keyframes burst {
                0% {
                    transform: scale(0);
                    opacity: 1;
                }
                50% {
                    transform: scale(1.5);
                    opacity: 0.8;
                }
                100% {
                    transform: scale(3);
                    opacity: 0;
                }
            }
            
            @keyframes glow {
                0%, 100% {
                    box-shadow: 0 0 5px #73F2CE;
                }
                50% {
                    box-shadow: 0 0 20px #73F2CE, 0 0 30px #45C4B0;
                }
            }
            
            @keyframes shake {
                0%, 100% { transform: translateX(0); }
                25% { transform: translateX(-5px); }
                75% { transform: translateX(5px); }
            }
            
            @keyframes cardFlip {
                0% { transform: perspective(1000px) rotateY(0); }
                50% { transform: perspective(1000px) rotateY(180deg); }
                100% { transform: perspective(1000px) rotateY(360deg); }
            }
            
            @keyframes pulse {
                0%, 100% { transform: scale(1); }
                50% { transform: scale(1.1); }
            }
            
            @keyframes ripple {
                0% {
                    transform: scale(0);
                    opacity: 1;
                }
                100% {
                    transform: scale(4);
                    opacity: 0;
                }
            }
            
            .glow-effect {
                animation: glow 1s ease-in-out;
            }
            
            .shake-effect {
                animation: shake 0.5s ease-in-out;
            }
            
            .card-flip {
                animation: cardFlip 0.8s ease-in-out;
            }
            
            .pulse-effect {
                animation: pulse 0.5s ease-in-out;
            }
        `;
        document.head.appendChild(style);
    }

    // Add glow effect
    function addGlowEffect(element) {
        element.classList.add('glow-effect');
        setTimeout(() => {
            element.classList.remove('glow-effect');
        }, 1000);
    }

    // Add shake effect
    function addShakeEffect(element) {
        element.classList.add('shake-effect');
        setTimeout(() => {
            element.classList.remove('shake-effect');
        }, 500);
    }

    // Add card flip effect
    function addCardFlipEffect(element) {
        element.classList.add('card-flip');
        setTimeout(() => {
            element.classList.remove('card-flip');
        }, 800);
    }

    // Add social pulse effect
    function addSocialPulse(element) {
        element.classList.add('pulse-effect');
        setTimeout(() => {
            element.classList.remove('pulse-effect');
        }, 500);
    }

    // Hover effects
    function addHoverEffects() {
        const cards = document.querySelectorAll('.card');
        cards.forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-10px) scale(1.02)';
                this.style.transition = 'all 0.3s ease';
                this.style.boxShadow = '0 15px 35px rgba(115, 242, 206, 0.3)';
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) scale(1)';
                this.style.boxShadow = '0 5px 15px rgba(0,0,0,0.1)';
            });
        });
    }

    // Typing animation for hero text
    function addTypingAnimation() {
        const heroText = document.querySelector('.content h1');
        if (heroText) {
            const text = heroText.textContent;
            heroText.textContent = '';
            heroText.style.borderRight = '2px solid #73F2CE';
            
            let i = 0;
            const typeWriter = () => {
                if (i < text.length) {
                    heroText.textContent += text.charAt(i);
                    i++;
                    setTimeout(typeWriter, 100);
                } else {
                    heroText.style.borderRight = 'none';
                }
            };
            
            setTimeout(typeWriter, 1000);
        }
    }

    // Animate skill bars
    function animateSkillBars() {
        const skillBars = document.querySelectorAll('.bar span');
        skillBars.forEach((bar, index) => {
            setTimeout(() => {
                bar.style.animation = 'fillBar 1s ease-in-out forwards';
            }, index * 200);
        });
    }

    // Add skill bar animation CSS
    function addSkillBarCSS() {
        const style = document.createElement('style');
        style.textContent = `
            @keyframes fillBar {
                from { width: 0%; }
                to { width: var(--target-width); }
            }
        `;
        document.head.appendChild(style);
    }

    // Create code rain effect
    function createCodeRain() {
        const canvas = document.createElement('canvas');
        canvas.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 1000;
            background: rgba(0,0,0,0.1);
        `;
        document.body.appendChild(canvas);
        
        const ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        
        const chars = '01';
        const drops = [];
        const fontSize = 14;
        const columns = canvas.width / fontSize;
        
        for (let i = 0; i < columns; i++) {
            drops[i] = 1;
        }
        
        function draw() {
            ctx.fillStyle = 'rgba(0,0,0,0.05)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            
            ctx.fillStyle = '#73F2CE';
            ctx.font = fontSize + 'px monospace';
            
            for (let i = 0; i < drops.length; i++) {
                const text = chars[Math.floor(Math.random() * chars.length)];
                ctx.fillText(text, i * fontSize, drops[i] * fontSize);
                
                if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                    drops[i] = 0;
                }
                drops[i]++;
            }
        }
        
        const interval = setInterval(draw, 50);
        
        setTimeout(() => {
            clearInterval(interval);
            document.body.removeChild(canvas);
        }, 3000);
    }

    // Create profile reveal effect
    function createProfileReveal() {
        const aboutImg = document.querySelector('.about img');
        if (aboutImg) {
            aboutImg.style.animation = 'profileReveal 2s ease-in-out';
        }
        
        const style = document.createElement('style');
        style.textContent = `
            @keyframes profileReveal {
                0% { 
                    transform: scale(0) rotate(180deg);
                    opacity: 0;
                }
                50% {
                    transform: scale(1.1) rotate(0deg);
                    opacity: 0.8;
                }
                100% {
                    transform: scale(1) rotate(0deg);
                    opacity: 1;
                }
            }
        `;
        document.head.appendChild(style);
    }

    // Create Google effect
    function createGoogleEffect() {
        const colors = ['#4285F4', '#EA4335', '#FBBC05', '#34A853'];
        const elements = document.querySelectorAll('.card, .skill_bar, .social a');
        
        elements.forEach((el, index) => {
            setTimeout(() => {
                el.style.border = `3px solid ${colors[index % colors.length]}`;
                el.style.transition = 'all 0.3s ease';
                
                setTimeout(() => {
                    el.style.border = 'none';
                }, 1000);
            }, index * 100);
        });
    }

    // Create contact ripple effect
    function createContactRipple(e) {
        const ripple = document.createElement('div');
        const rect = e.currentTarget.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.cssText = `
            position: absolute;
            left: ${x}px;
            top: ${y}px;
            width: ${size}px;
            height: ${size}px;
            background: radial-gradient(circle, rgba(115, 242, 206, 0.3), transparent);
            border-radius: 50%;
            transform: scale(0);
            animation: ripple 0.6s ease-out;
            pointer-events: none;
        `;
        
        e.currentTarget.style.position = 'relative';
        e.currentTarget.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    }

    // Particle system
    function addParticleSystem() {
        const canvas = document.createElement('canvas');
        canvas.id = 'particle-canvas';
        canvas.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 1;
        `;
        document.body.appendChild(canvas);
        
        const ctx = canvas.getContext('2d');
        const particles = [];
        
        function resizeCanvas() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }
        
        function createParticle(x, y) {
            return {
                x: x,
                y: y,
                vx: (Math.random() - 0.5) * 2,
                vy: (Math.random() - 0.5) * 2,
                life: 1,
                size: Math.random() * 3 + 1,
                color: `hsl(${Math.random() * 60 + 160}, 70%, 60%)`
            };
        }
        
        function updateParticles() {
            for (let i = particles.length - 1; i >= 0; i--) {
                const p = particles[i];
                p.x += p.vx;
                p.y += p.vy;
                p.life -= 0.01;
                
                if (p.life <= 0) {
                    particles.splice(i, 1);
                }
            }
        }
        
        function drawParticles() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particles.forEach(p => {
                ctx.save();
                ctx.globalAlpha = p.life;
                ctx.fillStyle = p.color;
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fill();
                ctx.restore();
            });
        }
        
        function animate() {
            updateParticles();
            drawParticles();
            requestAnimationFrame(animate);
        }
        
        // Add particles on mouse move
        document.addEventListener('mousemove', (e) => {
            if (Math.random() < 0.1) {
                particles.push(createParticle(e.clientX, e.clientY));
            }
        });
        
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);
        animate();
    }

    // Add hamburger menu functionality - FINAL VERSION
    function addHamburgerMenu() {
        const hamburger = document.querySelector('.hamburger');
        const navMenu = document.querySelector('.nav-menu');
        const subscribeBtn = document.querySelector('.nav-btn');

        if (!hamburger || !navMenu) {
            console.error('❌ Hamburger or nav menu element not found!');
            return;
        }

        function openMenu() {
            navMenu.classList.add('active');
            hamburger.classList.add('active');
            hamburger.setAttribute('aria-expanded', 'true');
            document.body.style.overflow = 'hidden';
            document.documentElement.style.overflow = 'hidden';
        }

        function closeMenu() {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
            hamburger.setAttribute('aria-expanded', 'false');
            document.body.style.overflow = '';
            document.documentElement.style.overflow = '';
        }

        // Toggle menu on hamburger click
        hamburger.addEventListener('click', function (e) {
            e.preventDefault();
            e.stopPropagation();

            if (navMenu.classList.contains('active')) {
                closeMenu();
            } else {
                openMenu();
            }
        });

        // Close menu when clicking nav links
        const navLinks = document.querySelectorAll('.nav-menu li a');
        navLinks.forEach((link) => {
            link.addEventListener('click', closeMenu);
        });

        // Prevent closing when clicking inside menu
        navMenu.addEventListener('click', function (e) {
            e.stopPropagation();
        });

        // Close when clicking outside
        document.addEventListener('click', function (e) {
            if (!navMenu.classList.contains('active')) return;
            if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
                closeMenu();
            }
        });

        if (subscribeBtn) {
            subscribeBtn.addEventListener('click', closeMenu);
        }
    }

    // Initialize everything
    addCSSAnimations();
    addSkillBarCSS();
    init();
    addHamburgerMenu();
})();
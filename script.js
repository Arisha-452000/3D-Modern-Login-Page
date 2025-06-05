document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const loginForm = document.getElementById('loginForm');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const passwordToggle = document.querySelector('.password-toggle');
    const loginBox = document.querySelector('.login-box');
    const themeToggle = document.querySelector('.theme-toggle');
    const body = document.body;
    
    // Initialize Particles.js
    if (typeof particlesJS !== 'undefined') {
        particlesJS('particles-js', {
            particles: {
                number: { 
                    value: 80, 
                    density: { 
                        enable: true, 
                        value_area: 800 
                    } 
                },
                color: { value: '#6c63ff' },
                shape: { type: 'circle' },
                opacity: {
                    value: 0.5,
                    random: true,
                    anim: { enable: true, speed: 1, opacity_min: 0.1, sync: false }
                },
                size: {
                    value: 3,
                    random: true,
                    anim: { enable: true, speed: 2, size_min: 0.1, sync: false }
                },
                line_linked: {
                    enable: true,
                    distance: 150,
                    color: '#6c63ff',
                    opacity: 0.2,
                    width: 1
                },
                move: {
                    enable: true,
                    speed: 1,
                    direction: 'none',
                    random: true,
                    straight: false,
                    out_mode: 'out',
                    bounce: false
                }
            },
            interactivity: {
                detect_on: 'canvas',
                events: {
                    onhover: { enable: true, mode: 'grab' },
                    onclick: { enable: true, mode: 'push' },
                    resize: true
                },
                modes: {
                    grab: { distance: 140, line_linked: { opacity: 0.5 } },
                    push: { particles_nb: 4 }
                }
            },
            retina_detect: true
        });
    }


    // Theme Toggle
    themeToggle.addEventListener('click', () => {
        body.classList.toggle('dark-theme');
        // Save theme preference to localStorage
        const isDark = body.classList.contains('dark-theme');
        localStorage.setItem('darkTheme', isDark);
        
        // Update particle colors based on theme
        if (window.pJSDom && window.pJSDom.length > 0) {
            const newColor = isDark ? '#8a7fff' : '#6c63ff';
            window.pJSDom[0].pJS.particles.array.forEach(particle => {
                particle.color.value = newColor;
            });
        }
    });

    // Check for saved theme preference
    if (localStorage.getItem('darkTheme') === 'true') {
        body.classList.add('dark-theme');
    }

    // 3D Tilt Effect
    const handleTilt = (e) => {
        const { left, top, width, height } = loginBox.getBoundingClientRect();
        const x = (e.clientX - left) / width - 0.5;
        const y = (e.clientY - top) / height - 0.5;
        
        loginBox.style.transform = `
            perspective(1000px) 
            rotateX(${-y * 10}deg) 
            rotateY(${x * 10}deg) 
            translateY(-10px)
        `;
        
        // Parallax effect for floating elements
        const elements = document.querySelectorAll('.floating-element');
        elements.forEach((el, index) => {
            const speed = [0.5, 0.3, 0.2][index] || 0.1;
            el.style.transform = `translate(${x * 20 * speed}px, ${y * 20 * speed}px)`;
        });
    };
    
    const resetTilt = () => {
        loginBox.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
        
        // Reset floating elements
        document.querySelectorAll('.floating-element').forEach(el => {
            el.style.transform = 'translate(0, 0)';
        });
    };
    
    loginBox.addEventListener('mousemove', handleTilt);
    loginBox.addEventListener('mouseleave', resetTilt);
    
    // Password Toggle
    passwordToggle.addEventListener('click', (e) => {
        e.preventDefault();
        const type = passwordInput.type === 'password' ? 'text' : 'password';
        passwordInput.type = type;
        const icon = passwordToggle.querySelector('i');
        icon.classList.toggle('fa-eye');
        icon.classList.toggle('fa-eye-slash');
        
        // Add animation class
        icon.style.animation = 'none';
        void icon.offsetWidth; // Trigger reflow
        icon.style.animation = 'bounce 0.6s';
    });
    
    // Form Validation
    const validateEmail = (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    };
    
    const showError = (element, message) => {
        const formGroup = element.closest('.form-group');
        const errorElement = document.getElementById(`${element.id}-error`);
        
        formGroup.classList.add('error');
        errorElement.textContent = message;
        
        // Shake animation for error
        element.style.animation = 'shake 0.5s';
        setTimeout(() => {
            element.style.animation = '';
        }, 500);
    };
    
    const clearError = (element) => {
        const formGroup = element.closest('.form-group');
        const errorElement = document.getElementById(`${element.id}-error`);
        
        formGroup.classList.remove('error');
        errorElement.textContent = '';
    };
    
    // Input validation on blur
    emailInput.addEventListener('blur', () => {
        if (!emailInput.value.trim()) {
            showError(emailInput, 'Email is required');
        } else if (!validateEmail(emailInput.value.trim())) {
            showError(emailInput, 'Please enter a valid email');
        } else {
            clearError(emailInput);
        }
    });
    
    passwordInput.addEventListener('blur', () => {
        if (!passwordInput.value.trim()) {
            showError(passwordInput, 'Password is required');
        } else if (passwordInput.value.length < 6) {
            showError(passwordInput, 'Password must be at least 6 characters');
        } else {
            clearError(passwordInput);
        }
    });
    
    // Real-time validation while typing
    emailInput.addEventListener('input', () => {
        if (emailInput.value.trim() && validateEmail(emailInput.value.trim())) {
            clearError(emailInput);
        }
    });
    
    passwordInput.addEventListener('input', () => {
        if (passwordInput.value.trim() && passwordInput.value.length >= 6) {
            clearError(passwordInput);
        }
    });
    
    // Social Login Buttons
    const googleLoginBtn = document.querySelector('.social-btn.google');
    const githubLoginBtn = document.querySelector('.social-btn.github');
    
    // Google Login Handler
    if (googleLoginBtn) {
        googleLoginBtn.addEventListener('click', async (e) => {
            e.preventDefault();
            
            // Show loading state
            const originalContent = googleLoginBtn.innerHTML;
            googleLoginBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Continuing with Google...';
            googleLoginBtn.disabled = true;
            
            try {
                // Simulate API call with delay
                await new Promise(resolve => setTimeout(resolve, 1500));
                showSuccessMessage('Google');
            } catch (error) {
                console.error('Google login failed:', error);
                showError(emailInput, 'Google login failed. Please try again.');
                googleLoginBtn.innerHTML = originalContent;
                googleLoginBtn.disabled = false;
            }
        });
    }
    
    // GitHub Login Handler
    if (githubLoginBtn) {
        githubLoginBtn.addEventListener('click', async (e) => {
            e.preventDefault();
            
            // Show loading state
            const originalContent = githubLoginBtn.innerHTML;
            githubLoginBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Continuing with GitHub...';
            githubLoginBtn.disabled = true;
            
            try {
                // Simulate API call with delay
                await new Promise(resolve => setTimeout(resolve, 1500));
                showSuccessMessage('GitHub');
            } catch (error) {
                console.error('GitHub login failed:', error);
                showError(emailInput, 'GitHub login failed. Please try again.');
                githubLoginBtn.innerHTML = originalContent;
                githubLoginBtn.disabled = false;
            }
        });
    }
    
    // Form submission
    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            // Trigger validation for all fields
            const emailValid = !emailInput.value.trim() ? 
                (showError(emailInput, 'Email is required'), false) : 
                !validateEmail(emailInput.value.trim()) ? 
                (showError(emailInput, 'Please enter a valid email'), false) : 
                (clearError(emailInput), true);
                
            const passwordValid = !passwordInput.value.trim() ? 
                (showError(passwordInput, 'Password is required'), false) : 
                passwordInput.value.length < 6 ? 
                (showError(passwordInput, 'Password must be at least 6 characters'), false) : 
                (clearError(passwordInput), true);
            
            if (emailValid && passwordValid) {
                const submitButton = loginForm.querySelector('button[type="submit"]');
                const buttonText = submitButton.querySelector('span');
                const buttonIcon = submitButton.querySelector('i');
                const originalText = buttonText.textContent;
                
                // Show loading state
                submitButton.disabled = true;
                buttonText.textContent = 'Authenticating...';
                buttonIcon.className = 'fas fa-spinner fa-spin';
                
                try {
                    // Simulate API call with delay
                    await new Promise(resolve => setTimeout(resolve, 1500));
                    
                    // Show success state
                    buttonText.textContent = 'Success!';
                    buttonIcon.className = 'fas fa-check';
                    
                    // Show success message after a short delay
                    setTimeout(() => {
                        showSuccessMessage('Email');
                    }, 500);
                    
                } catch (error) {
                    // Handle error
                    buttonText.textContent = 'Error!';
                    buttonIcon.className = 'fas fa-times';
                    showError(emailInput, 'Login failed. Please try again.');
                    
                    // Reset button after delay
                    setTimeout(() => {
                        submitButton.disabled = false;
                        buttonText.textContent = originalText;
                        buttonIcon.className = 'fas fa-arrow-right';
                    }, 1500);
                }
            }
        });
    }
    
    // Helper function to show success message
    function showSuccessMessage(provider) {
        const loginBox = document.querySelector('.login-box');
        if (!loginBox) return;
        
        loginBox.innerHTML = `
            <div class="success-message">
                <svg viewBox="0 0 24 24" width="64" height="64" stroke="#4BB543" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                    <polyline points="22 4 12 14.01 9 11.01"></polyline>
                </svg>
                <h2>Welcome via ${provider}!</h2>
                <p>You have successfully logged in with ${provider}</p>
                <button class="back-to-login" id="backToLogin">Back to Login</button>
            </div>
        `;
        
        // Add event listener for back to login button
        const backButton = document.getElementById('backToLogin');
        if (backButton) {
            backButton.addEventListener('click', () => {
                window.location.reload();
            });
        }
    }
    
    // Add animation to social buttons on hover
    const socialButtons = document.querySelectorAll('.social-btn');
    socialButtons.forEach(button => {
        button.addEventListener('mouseenter', (e) => {
            const x = e.pageX - button.offsetLeft;
            const y = e.pageY - button.offsetTop;
            
            const span = document.createElement('span');
            span.className = 'ripple';
            span.style.left = `${x}px`;
            span.style.top = `${y}px`;
            
            // Remove existing ripples
            const existingRipples = button.querySelectorAll('.ripple');
            existingRipples.forEach(ripple => ripple.remove());
            
            button.appendChild(span);
            
            // Remove ripple after animation completes
            setTimeout(() => span.remove(), 1000);
        });
    });
    
    // Add animation to input focus
    const inputs = document.querySelectorAll('.form-group input');
    inputs.forEach(input => {
        input.addEventListener('focus', () => {
            const label = input.nextElementSibling;
            if (label && label.tagName === 'LABEL') {
                label.style.animation = 'labelFloat 0.3s ease-out forwards';
            }
        });
        
        // Animate label back if input is empty on blur
        input.addEventListener('blur', () => {
            if (!input.value) {
                const label = input.nextElementSibling;
                if (label && label.tagName === 'LABEL') {
                    label.style.animation = 'labelFloatBack 0.3s ease-out forwards';
                }
            }
        });
    });
    
    // Add keyframe animations
    const style = document.createElement('style');
    style.textContent = `
        @keyframes shake {
            0%, 100% { transform: translateX(0); }
            25% { transform: translateX(-5px); }
            75% { transform: translateX(5px); }
        }
        
        @keyframes bounce {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-5px); }
        }
        
        @keyframes labelFloat {
            to {
                transform: translateY(-28px) scale(0.9);
                color: var(--primary);
            }
        }
        
        @keyframes labelFloatBack {
            from {
                transform: translateY(-28px) scale(0.9);
                color: var(--primary);
            }
            to {
                transform: translateY(0) scale(1);
                color: var(--text-light);
            }
        }
        
        .ripple {
            position: absolute;
            background: rgba(255, 255, 255, 0.3);
            border-radius: 50%;
            transform: scale(0);
            animation: ripple 0.6s linear;
            pointer-events: none;
            width: 100px;
            height: 100px;
            margin-left: -50px;
            margin-top: -50px;
        }
        
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
});

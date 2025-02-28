document.addEventListener('DOMContentLoaded', function() {
    // Initialize Login/Signup Pages
    initPasswordToggle();
    initFormValidation();
    initPasswordStrength();
    initAuthAnimation();
    initSocialAuth();
});

// Toggle Password Visibility
function initPasswordToggle() {
    const toggleButtons = document.querySelectorAll('.toggle-password');
    
    toggleButtons.forEach(button => {
        button.addEventListener('click', function() {
            const input = this.previousElementSibling;
            const type = input.getAttribute('type') === 'password' ? 'text' : 'password';
            input.setAttribute('type', type);
            
            // Toggle the icon
            const icon = this.querySelector('i');
            if (type === 'text') {
                icon.className = 'fas fa-eye-slash';
            } else {
                icon.className = 'fas fa-eye';
            }
        });
    });
}

// Form Validation
function initFormValidation() {
    const loginForm = document.getElementById('login-form');
    const signupForm = document.getElementById('signup-form');
    const resetForm = document.getElementById('reset-form');
    
    // Login Form Validation
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = document.getElementById('email');
            const password = document.getElementById('password');
            let isValid = true;
            
            // Clear previous error styles
            clearErrors();
            
            // Validate email/username
            if (!email.value.trim()) {
                showError(email, 'Email or username is required');
                isValid = false;
            }
            
            // Validate password
            if (!password.value) {
                showError(password, 'Password is required');
                isValid = false;
            }
            
            if (isValid) {
                // Simulate form submission
                simulateAuth(loginForm, 'login');
            }
        });
    }
    
    // Signup Form Validation
    if (signupForm) {
        signupForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const username = document.getElementById('username');
            const email = document.getElementById('email');
            const password = document.getElementById('password');
            const confirmPassword = document.getElementById('confirm-password');
            const termsCheckbox = document.getElementById('terms');
            let isValid = true;
            
            // Clear previous error styles
            clearErrors();
            
            // Validate username
            if (!username.value.trim()) {
                showError(username, 'Username is required');
                isValid = false;
            } else if (username.value.trim().length < 3) {
                showError(username, 'Username must be at least 3 characters');
                isValid = false;
            }
            
            // Validate email
            if (!email.value.trim()) {
                showError(email, 'Email is required');
                isValid = false;
            } else if (!isValidEmail(email.value.trim())) {
                showError(email, 'Please enter a valid email address');
                isValid = false;
            }
            
            // Validate password
            if (!password.value) {
                showError(password, 'Password is required');
                isValid = false;
            } else if (password.value.length < 8) {
                showError(password, 'Password must be at least 8 characters');
                isValid = false;
            }
            
            // Validate confirm password
            if (password.value !== confirmPassword.value) {
                showError(confirmPassword, 'Passwords do not match');
                isValid = false;
            }
            
            // Validate terms agreement
            if (!termsCheckbox.checked) {
                const termsError = document.createElement('div');
                termsError.className = 'error-message visible';
                termsError.textContent = 'You must agree to the terms';
                termsCheckbox.parentElement.appendChild(termsError);
                isValid = false;
            }
            
            if (isValid) {
                // Simulate form submission
                simulateAuth(signupForm, 'signup');
            }
        });
    }
    
    // Password Reset Form Validation
    if (resetForm) {
        resetForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = document.getElementById('email');
            let isValid = true;
            
            // Clear previous error styles
            clearErrors();
            
            // Validate email
            if (!email.value.trim()) {
                showError(email, 'Email is required');
                isValid = false;
            } else if (!isValidEmail(email.value.trim())) {
                showError(email, 'Please enter a valid email address');
                isValid = false;
            }
            
            if (isValid) {
                // Show success message
                resetForm.style.display = 'none';
                document.querySelector('.reset-success').classList.add('visible');
            }
        });
    }
}

// Show Error Message
function showError(input, message) {
    const formGroup = input.closest('.form-group');
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message visible';
    errorDiv.textContent = message;
    
    formGroup.appendChild(errorDiv);
    input.classList.add('input-error');
}

// Clear Errors
function clearErrors() {
    document.querySelectorAll('.error-message').forEach(error => error.remove());
    document.querySelectorAll('.input-error').forEach(input => input.classList.remove('input-error'));
}

// Validate Email
function isValidEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

// Password Strength Meter
function initPasswordStrength() {
    const passwordInput = document.getElementById('password');
    const strengthMeter = document.querySelector('.strength-meter');
    const strengthText = document.querySelector('.strength-text');
    
    if (passwordInput && strengthMeter && strengthText) {
        passwordInput.addEventListener('input', function() {
            const strength = checkPasswordStrength(this.value);
            updateStrengthMeter(strength);
        });
    }
}

// Check Password Strength
function checkPasswordStrength(password) {
    // No password
    if (!password) {
        return 0;
    }
    
    let score = 0;
    
    // Add points for length
    if (password.length >= 8) score += 1;
    if (password.length >= 12) score += 1;
    
    // Add points for complexity
    if (/[A-Z]/.test(password)) score += 1; // Has uppercase
    if (/[a-z]/.test(password)) score += 1; // Has lowercase
    if (/[0-9]/.test(password)) score += 1; // Has number
    if (/[^A-Za-z0-9]/.test(password)) score += 1; // Has special char
    
    return score;
}

// Update Strength Meter
function updateStrengthMeter(score) {
    const strengthFill = document.querySelector('.strength-fill');
    const strengthText = document.querySelector('.strength-text');
    
    if (!strengthFill || !strengthText) return;
    
    // Reset classes
    strengthFill.className = 'strength-fill';
    
    // Update based on score
    if (score === 0) {
        strengthFill.style.width = '0';
        strengthText.textContent = '';
    } else if (score <= 2) {
        strengthFill.classList.add('weak');
        strengthText.textContent = 'Weak';
    } else if (score <= 4) {
        strengthFill.classList.add('medium');
        strengthText.textContent = 'Medium';
    } else if (score <= 5) {
        strengthFill.classList.add('strong');
        strengthText.textContent = 'Strong';
    } else {
        strengthFill.classList.add('very-strong');
        strengthText.textContent = 'Very Strong';
    }
}

// Simulate Authentication
function simulateAuth(form, type) {
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    
    // Show loading state
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
    
    // Simulate API call delay
    setTimeout(() => {
        if (type === 'login') {
            // Redirect to profile or home
            window.location.href = 'profile.html';
        } else if (type === 'signup') {
            // Redirect to login or onboarding
            window.location.href = 'login.html?registered=true';
        }
        
        // Reset button state (in case redirect fails)
        submitBtn.disabled = false;
        submitBtn.textContent = originalText;
    }, 1500);
}

// Initialize Auth Animation
function initAuthAnimation() {
    const loginAnimation = document.getElementById('login-animation');
    const signupAnimation = document.getElementById('signup-animation');
    
    if (loginAnimation) {
        createBallAnimation(loginAnimation, 10);
    }
    
    if (signupAnimation) {
        createBallAnimation(signupAnimation, 15);
    }
}

// Create Ball Animation
function createBallAnimation(container, ballCount) {
    // Create balls
    for (let i = 0; i < ballCount; i++) {
        const ball = document.createElement('div');
        ball.className = 'animated-ball';
        
        // Random size
        const size = Math.floor(Math.random() * 20) + 10; // 10-30px
        ball.style.width = `${size}px`;
        ball.style.height = `${size}px`;
        
        // Random position
        const x = Math.random() * 100;
        const y = Math.random() * 100;
        ball.style.left = `${x}%`;
        ball.style.top = `${y}%`;
        
        // Random color (white with opacity)
        const opacity = Math.random() * 0.5 + 0.2; // 0.2-0.7
        ball.style.backgroundColor = `rgba(255, 255, 255, ${opacity})`;
        
        // Random animation delay
        ball.style.animationDelay = `${Math.random() * 5}s`;
        
        // Append to container
        container.appendChild(ball);
    }
    
    // Add animation styles
    const style = document.createElement('style');
    style.textContent = `
        .animated-ball {
            position: absolute;
            border-radius: 50%;
            animation: float 10s infinite ease-in-out;
        }
        
        @keyframes float {
            0%, 100% {
                transform: translate(0, 0);
            }
            25% {
                transform: translate(20px, -30px);
            }
            50% {
                transform: translate(-10px, 20px);
            }
            75% {
                transform: translate(-30px, -10px);
            }
        }
    `;
    document.head.appendChild(style);
}

// Initialize Social Auth
function initSocialAuth() {
    const googleBtn = document.querySelector('.social-auth-button.google');
    const githubBtn = document.querySelector('.social-auth-button.github');
    
    if (googleBtn) {
        googleBtn.addEventListener('click', function() {
            // Simulate Google auth
            this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> <span>Connecting...</span>';
            
            setTimeout(() => {
                window.location.href = 'profile.html';
            }, 1500);
        });
    }
    
    if (githubBtn) {
        githubBtn.addEventListener('click', function() {
            // Simulate GitHub auth
            this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> <span>Connecting...</span>';
            
            setTimeout(() => {
                window.location.href = 'profile.html';
            }, 1500);
        });
    }
}

// Check for Registration Success
document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const registered = urlParams.get('registered');
    
    if (registered === 'true') {
        const loginForm = document.getElementById('login-form');
        if (loginForm) {
            const successMessage = document.createElement('div');
            successMessage.className = 'success-message';
            successMessage.innerHTML = `
                <div style="background-color: #e8f5e9; padding: 10px 15px; border-radius: 4px; margin-bottom: 20px; display: flex; align-items: center; gap: 10px;">
                    <i class="fas fa-check-circle" style="color: #4caf50;"></i>
                    <span>Registration successful! Please login with your credentials.</span>
                </div>
            `;
            
            loginForm.parentNode.insertBefore(successMessage, loginForm);
        }
    }
});
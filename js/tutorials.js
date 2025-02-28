document.addEventListener('DOMContentLoaded', function() {
    // Initialize Tutorials Page Interactions
    initTrackTabs();
    initTutorialModal();
    initProgressTracking();
    initInteractiveDemos();
});

// Track Tabs Functionality
function initTrackTabs() {
    const trackTabs = document.querySelectorAll('.track-tab');
    const allTutorialCards = document.querySelectorAll('.tutorial-card');
    
    trackTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // Update active tab
            trackTabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            
            // Get selected track
            const selectedTrack = this.getAttribute('data-track');
            
            // Show all tutorials or filter by track
            allTutorialCards.forEach(card => {
                if (selectedTrack === 'all' || card.getAttribute('data-track') === selectedTrack) {
                    card.style.display = 'block';
                    
                    // Add animation
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 50);
                } else {
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                    
                    // Add fade-out animation
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                }
            });
            
            // Show/hide sections based on selection
            const trackSections = document.querySelectorAll('.track-section');
            if (selectedTrack === 'all') {
                trackSections.forEach(section => {
                    section.style.display = 'block';
                });
            } else {
                trackSections.forEach(section => {
                    if (section.id === selectedTrack + '-track') {
                        section.style.display = 'block';
                    } else {
                        section.style.display = 'none';
                    }
                });
            }
        });
    });
    
    // Tutorial card click handler
    allTutorialCards.forEach(card => {
        card.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Get tutorial ID from the href
            const tutorialId = this.getAttribute('href').split('=')[1];
            
            // Open modal with tutorial content
            openTutorialModal(tutorialId);
        });
    });
}

// Tutorial Modal Functionality
function initTutorialModal() {
    const modal = document.querySelector('.tutorial-modal');
    const closeButton = modal.querySelector('.close-modal');
    
    // Close modal when button is clicked
    closeButton.addEventListener('click', function() {
        closeTutorialModal();
    });
    
    // Close modal when clicking outside content
    modal.addEventListener('click', function(event) {
        if (event.target === modal) {
            closeTutorialModal();
        }
    });
    
    // Close modal with Escape key
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && modal.style.display === 'block') {
            closeTutorialModal();
        }
    });
    
    // Video placeholder click handler
    const videoPlaceholder = modal.querySelector('.video-placeholder');
    if (videoPlaceholder) {
        videoPlaceholder.addEventListener('click', function() {
            // Replace placeholder with actual video (simulated here)
            this.innerHTML = `
                <div style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; background-color: #000; display: flex; align-items: center; justify-content: center; color: white;">
                    <i class="fas fa-play fa-3x" style="opacity: 0.3;"></i>
                    <p style="position: absolute; bottom: 20px; width: 100%; text-align: center; font-size: 14px;">Video playback simulated</p>
                </div>
            `;
        });
    }
    
    // Table of Contents links
    const tocLinks = modal.querySelectorAll('.tutorial-toc a');
    tocLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all links
            tocLinks.forEach(l => l.classList.remove('active'));
            
            // Add active class to clicked link
            this.classList.add('active');
            
            // In a real implementation, this would scroll to the corresponding section
            // Simulated here for preview purposes
            const targetSection = this.textContent;
            scrollToSection(targetSection);
        });
    });
    
    // Navigation buttons
    const prevButton = modal.querySelector('.prev-tutorial');
    const nextButton = modal.querySelector('.next-tutorial');
    
    if (prevButton) {
        prevButton.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Simulate loading previous tutorial
            closeTutorialModal();
            
            // Wait for animation to complete before opening new tutorial
            setTimeout(() => {
                // Extract tutorial ID from href
                const tutorialId = this.getAttribute('href').split('=')[1];
                openTutorialModal(tutorialId);
            }, 300);
        });
    }
    
    if (nextButton) {
        nextButton.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Simulate loading next tutorial
            closeTutorialModal();
            
            // Wait for animation to complete before opening new tutorial
            setTimeout(() => {
                // Extract tutorial ID from href
                const tutorialId = this.getAttribute('href').split('=')[1];
                openTutorialModal(tutorialId);
            }, 300);
        });
    }
    
    // Resource links hover effect
    const resourceLinks = modal.querySelectorAll('.tutorial-resources a');
    resourceLinks.forEach(link => {
        link.addEventListener('mouseover', function() {
            const icon = this.querySelector('i');
            icon.style.transform = 'scale(1.2)';
        });
        
        link.addEventListener('mouseout', function() {
            const icon = this.querySelector('i');
            icon.style.transform = '';
        });
    });
}

// Open Tutorial Modal
function openTutorialModal(tutorialId) {
    const modal = document.querySelector('.tutorial-modal');
    
    // In a real implementation, this would fetch tutorial content based on ID
    // Just showing/hiding for preview purposes
    
    // Update modal title based on tutorial ID (simplified for preview)
    let title = "Tutorial Content";
    switch(tutorialId) {
        case "1":
            title = "Introduction to the Interface";
            break;
        case "2":
            title = "Creating Your First Simulation";
            break;
        case "3":
            title = "Understanding Physics Parameters";
            break;
        case "4":
            title = "Working with Interactive Objects";
            break;
        default:
            title = "Tutorial " + tutorialId;
    }
    
    modal.querySelector('.modal-title').textContent = title;
    
    // Display modal with animation
    modal.style.display = 'block';
    modal.style.opacity = '0';
    setTimeout(() => {
        modal.style.opacity = '1';
    }, 10);
    
    // Update navigation buttons based on tutorial ID
    updateNavButtons(parseInt(tutorialId));
}

// Update Navigation Buttons
function updateNavButtons(currentId) {
    const prevButton = document.querySelector('.prev-tutorial');
    const nextButton = document.querySelector('.next-tutorial');
    
    // Simple prev/next logic for preview
    if (currentId > 1) {
        prevButton.style.display = 'flex';
        prevButton.setAttribute('href', `tutorial-detail.html?id=${currentId - 1}`);
        
        // Update the text based on previous tutorial
        let prevTitle = "Tutorial " + (currentId - 1);
        switch(currentId - 1) {
            case 1:
                prevTitle = "Introduction to the Interface";
                break;
            case 2:
                prevTitle = "Creating Your First Simulation";
                break;
            case 3:
                prevTitle = "Understanding Physics Parameters";
                break;
            case 4:
                prevTitle = "Working with Interactive Objects";
                break;
        }
        prevButton.querySelector('span').innerHTML = `Previous<br>${prevTitle}`;
    } else {
        prevButton.style.display = 'none';
    }
    
    if (currentId < 9) {  // Assuming 9 tutorials total
        nextButton.style.display = 'flex';
        nextButton.setAttribute('href', `tutorial-detail.html?id=${currentId + 1}`);
        
        // Update the text based on next tutorial
        let nextTitle = "Tutorial " + (currentId + 1);
        switch(currentId + 1) {
            case 2:
                nextTitle = "Creating Your First Simulation";
                break;
            case 3:
                nextTitle = "Understanding Physics Parameters";
                break;
            case 4:
                nextTitle = "Working with Interactive Objects";
                break;
            case 5:
                nextTitle = "Advanced Collision Mechanics";
                break;
        }
        nextButton.querySelector('span').innerHTML = `Next<br>${nextTitle}`;
    } else {
        nextButton.style.display = 'none';
    }
}

// Close Tutorial Modal
function closeTutorialModal() {
    const modal = document.querySelector('.tutorial-modal');
    
    // Add fade-out animation
    modal.style.opacity = '0';
    
    // Wait for animation to complete before hiding
    setTimeout(() => {
        modal.style.display = 'none';
    }, 300);
}

// Scroll to section within tutorial
function scrollToSection(sectionName) {
    // In a real implementation, this would scroll to the section
    // Simulated here for preview
    console.log("Scrolling to section:", sectionName);
    
    // Create animation effect
    const sections = document.querySelectorAll('.tutorial-section');
    sections.forEach(section => {
        const heading = section.querySelector('h3');
        if (heading && heading.textContent.includes(sectionName)) {
            section.style.backgroundColor = 'rgba(76, 132, 255, 0.1)';
            setTimeout(() => {
                section.style.backgroundColor = '';
                section.scrollIntoView({ behavior: 'smooth' });
            }, 300);
        }
    });
}

// Progress Tracking
function initProgressTracking() {
    // Tutorial progress overview
    updateProgressOverview();
    
    // Mark tutorials as completed when clicked (simplified for preview)
    const tutorialCards = document.querySelectorAll('.tutorial-card:not(.completed)');
    
    tutorialCards.forEach(card => {
        card.addEventListener('click', function() {
            // Apply completed status when tutorial modal is closed
            document.querySelector('.close-modal').addEventListener('click', function onCloseOnce() {
                markTutorialCompleted(card);
                this.removeEventListener('click', onCloseOnce);
            });
        });
    });
}

// Mark Tutorial as Completed
function markTutorialCompleted(cardElement) {
    // Only proceed if the card is not already completed
    if (!cardElement.classList.contains('completed')) {
        // Add completed class
        cardElement.classList.add('completed');
        
        // Add completion badge
        const badge = document.createElement('div');
        badge.className = 'completion-badge';
        badge.innerHTML = '<i class="fas fa-check-circle"></i>';
        cardElement.appendChild(badge);
        
        // Update the tutorial number background color
        const tutorialNumber = cardElement.querySelector('.tutorial-number');
        tutorialNumber.style.backgroundColor = '#4caf50';
        
        // Update overall progress
        updateProgressOverview();
        
        // Show congratulation message
        showCompletionMessage();
    }
}

// Update Progress Overview
function updateProgressOverview() {
    const completedCount = document.querySelectorAll('.tutorial-card.completed').length;
    const totalCount = document.querySelectorAll('.tutorial-card').length;
    const completionPercentage = Math.round((completedCount / totalCount) * 100);
    
    // Update counters
    document.querySelector('.completed-count').textContent = completedCount;
    document.querySelector('.total-count').textContent = totalCount;
    
    // Update progress bar
    const progressBar = document.querySelector('.progress-overview .progress-fill');
    progressBar.style.width = completionPercentage + '%';
    
    // Update percentage text
    document.querySelector('.progress-percentage span').textContent = completionPercentage + '% Complete';
    
    // Update next tutorial card if needed
    if (completedCount < totalCount) {
        // Find the first non-completed tutorial
        const nextTutorial = document.querySelector('.tutorial-card:not(.completed)');
        if (nextTutorial) {
            const tutorialId = nextTutorial.getAttribute('href').split('=')[1];
            const tutorialTitle = nextTutorial.querySelector('h3').textContent;
            const tutorialDesc = nextTutorial.querySelector('p').textContent;
            
            // Update the "Continue Learning" card
            const nextTutorialCard = document.querySelector('.next-tutorial-card');
            nextTutorialCard.setAttribute('href', `tutorial-detail.html?id=${tutorialId}`);
            nextTutorialCard.querySelector('h4').textContent = tutorialTitle;
            nextTutorialCard.querySelector('p').textContent = tutorialDesc;
        }
    } else {
        // All tutorials completed
        const nextTutorialSection = document.querySelector('.next-tutorial');
        nextTutorialSection.innerHTML = `
            <h3>Congratulations!</h3>
            <div class="completion-message">
                <div class="completion-icon"><i class="fas fa-trophy"></i></div>
                <p>You've completed all available tutorials. Ready to create your own simulations?</p>
                <a href="creator.html" class="button primary-button">Start Creating</a>
            </div>
        `;
    }
}

// Show Completion Message
function showCompletionMessage() {
    const notification = document.createElement('div');
    notification.style.position = 'fixed';
    notification.style.bottom = '20px';
    notification.style.right = '20px';
    notification.style.backgroundColor = '#4caf50';
    notification.style.color = 'white';
    notification.style.padding = '15px 20px';
    notification.style.borderRadius = '4px';
    notification.style.boxShadow = '0 2px 10px rgba(0,0,0,0.2)';
    notification.style.zIndex = '1000';
    notification.style.display = 'flex';
    notification.style.alignItems = 'center';
    notification.style.gap = '10px';
    notification.style.transform = 'translateY(100px)';
    notification.style.opacity = '0';
    notification.style.transition = 'all 0.3s ease';
    notification.innerHTML = '<i class="fas fa-check-circle"></i> Tutorial completed! Your progress has been saved.';
    
    document.body.appendChild(notification);
    
    // Animate notification
    setTimeout(() => {
        notification.style.transform = 'translateY(0)';
        notification.style.opacity = '1';
    }, 100);
    
    // Remove after delay
    setTimeout(() => {
        notification.style.transform = 'translateY(100px)';
        notification.style.opacity = '0';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 4000);
}

// Interactive Demos
function initInteractiveDemos() {
    // Gravity demo sliders
    const gravityX = document.getElementById('gravity-x');
    const gravityY = document.getElementById('gravity-y');
    
    if (gravityX && gravityY) {
        // Update value displays
        const updateValue = (slider) => {
            const valueDisplay = slider.nextElementSibling;
            valueDisplay.textContent = slider.value;
        };
        
        gravityX.addEventListener('input', function() {
            updateValue(this);
            updateGravityDemo(parseFloat(gravityX.value), parseFloat(gravityY.value));
        });
        
        gravityY.addEventListener('input', function() {
            updateValue(this);
            updateGravityDemo(parseFloat(gravityX.value), parseFloat(gravityY.value));
        });
        
        // Reset button
        const resetButton = document.querySelector('.reset-demo');
        if (resetButton) {
            resetButton.addEventListener('click', function() {
                gravityX.value = 0;
                gravityY.value = 9.8;
                updateValue(gravityX);
                updateValue(gravityY);
                
                // Reset and recreate demo
                initGravityDemo();
            });
        }
        
        // Initialize demo
        initGravityDemo();
    }
}

// Initialize Gravity Demo
function initGravityDemo() {
    const demoCanvas = document.querySelector('.demo-canvas');
    
    if (!demoCanvas) return;
    
    // Clear existing content
    demoCanvas.innerHTML = '';
    
    // Create a placeholder ball for the demo
    const ball = document.createElement('div');
    ball.style.position = 'absolute';
    ball.style.width = '20px';
    ball.style.height = '20px';
    ball.style.backgroundColor = 'white';
    ball.style.borderRadius = '50%';
    ball.style.top = '20px';
    ball.style.left = '50%';
    ball.style.transform = 'translateX(-50%)';
    ball.style.boxShadow = '0 0 10px rgba(255,255,255,0.5)';
    demoCanvas.appendChild(ball);
    
    // Store ball data
    demoCanvas.dataset.ballX = parseInt(demoCanvas.offsetWidth / 2);
    demoCanvas.dataset.ballY = 20;
    demoCanvas.dataset.ballVx = 0;
    demoCanvas.dataset.ballVy = 0;
    
    // Start animation
    animateGravityDemo();
}

// Update Gravity Demo
function updateGravityDemo(gravityX, gravityY) {
    const demoCanvas = document.querySelector('.demo-canvas');
    if (!demoCanvas) return;
    
    // Update gravity values
    demoCanvas.dataset.gravityX = gravityX;
    demoCanvas.dataset.gravityY = gravityY;
}

// Animate Gravity Demo
function animateGravityDemo() {
    const demoCanvas = document.querySelector('.demo-canvas');
    
    if (!demoCanvas) return;
    
    // Get current ball data
    let x = parseFloat(demoCanvas.dataset.ballX || demoCanvas.offsetWidth / 2);
    let y = parseFloat(demoCanvas.dataset.ballY || 20);
    let vx = parseFloat(demoCanvas.dataset.ballVx || 0);
    let vy = parseFloat(demoCanvas.dataset.ballVy || 0);
    
    // Get gravity values (default to 0, 9.8 if not set)
    const gravityX = parseFloat(demoCanvas.dataset.gravityX || 0);
    const gravityY = parseFloat(demoCanvas.dataset.gravityY || 9.8);
    
    // Update velocity based on gravity
    vx += gravityX * 0.02;
    vy += gravityY * 0.02;
    
    // Update position
    x += vx;
    y += vy;
    
    // Boundary checking
    const ballSize = 20;
    const canvasWidth = demoCanvas.offsetWidth;
    const canvasHeight = demoCanvas.offsetHeight;
    
    if (x < ballSize / 2) {
        x = ballSize / 2;
        vx *= -0.8; // Bounce with energy loss
    } else if (x > canvasWidth - ballSize / 2) {
        x = canvasWidth - ballSize / 2;
        vx *= -0.8; // Bounce with energy loss
    }
    
    if (y < ballSize / 2) {
        y = ballSize / 2;
        vy *= -0.8; // Bounce with energy loss
    } else if (y > canvasHeight - ballSize / 2) {
        y = canvasHeight - ballSize / 2;
        vy *= -0.8; // Bounce with energy loss
        
        // Apply friction when on floor
        vx *= 0.95;
    }
    
    // Update ball position
    const ball = demoCanvas.querySelector('div');
    if (ball) {
        ball.style.left = x + 'px';
        ball.style.top = y + 'px';
        ball.style.transform = 'none';
    }
    
    // Store updated values
    demoCanvas.dataset.ballX = x;
    demoCanvas.dataset.ballY = y;
    demoCanvas.dataset.ballVx = vx;
    demoCanvas.dataset.ballVy = vy;
    
    // Continue animation
    requestAnimationFrame(animateGravityDemo);
}
document.addEventListener('DOMContentLoaded', function() {
    // Initialize Creator Page UI Interactions
    initModeTabs();
    initPanelInteractions();
    initSliderControls();
    initToggleButtons();
    initPlaceholderSimulation();
    initCodeEditorEffects();
    initTimelineControls();
    animateUiElements();
});

// Mode Tab Switching
function initModeTabs() {
    const modeTabs = document.querySelectorAll('.mode-tab');
    const creatorModes = document.querySelectorAll('.creator-mode');
    
    modeTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // Update active tab
            modeTabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            
            // Show corresponding mode content
            const modeToShow = this.getAttribute('data-mode');
            creatorModes.forEach(mode => {
                mode.classList.remove('active');
                if (mode.classList.contains(modeToShow + '-mode')) {
                    mode.classList.add('active');
                }
            });
            
            // Add transition effect
            creatorModes.forEach(mode => {
                if (mode.classList.contains('active')) {
                    mode.style.opacity = 0;
                    setTimeout(() => {
                        mode.style.opacity = 1;
                    }, 50);
                }
            });
        });
    });
}

// Panel Interactions (collapsible sections, toggles)
function initPanelInteractions() {
    // Code Preview Toggle
    const toggleCodePreview = document.querySelector('.toggle-code-preview');
    const codePreview = document.querySelector('.code-preview');
    
    if (toggleCodePreview && codePreview) {
        toggleCodePreview.addEventListener('click', function() {
            codePreview.classList.toggle('collapsed');
            
            // Animate icon rotation
            const icon = this.querySelector('i');
            if (codePreview.classList.contains('collapsed')) {
                icon.style.transform = 'rotate(0deg)';
            } else {
                icon.style.transform = 'rotate(180deg)';
            }
        });
    }
    
    // Debug Info Toggle
    const toggleDebug = document.querySelector('.toggle-debug');
    const debugInfo = document.querySelector('.debug-info');
    
    if (toggleDebug && debugInfo) {
        toggleDebug.addEventListener('click', function() {
            debugInfo.classList.toggle('collapsed');
            
            // Animate icon rotation
            const icon = this.querySelector('i');
            if (debugInfo.classList.contains('collapsed')) {
                icon.style.transform = 'rotate(0deg)';
            } else {
                icon.style.transform = 'rotate(180deg)';
            }
        });
    }
    
    // Block Category Tabs
    const blockTabs = document.querySelectorAll('.block-tab');
    const blockCategories = document.querySelectorAll('.block-category');
    
    blockTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // Update active tab
            blockTabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            
            // Show corresponding category
            const categoryToShow = this.getAttribute('data-category');
            blockCategories.forEach(category => {
                category.classList.remove('active');
                if (category.classList.contains(categoryToShow)) {
                    category.classList.add('active');
                    
                    // Add fade-in effect
                    category.style.opacity = 0;
                    setTimeout(() => {
                        category.style.opacity = 1;
                    }, 50);
                }
            });
        });
    });
    
    // Hierarchy Tree Interaction
    const treeHeaders = document.querySelectorAll('.tree-item-header');
    
    treeHeaders.forEach(header => {
        header.addEventListener('click', function() {
            const treeItem = this.parentElement;
            treeItem.classList.toggle('expanded');
            
            // Animate caret icon
            const caret = this.querySelector('i:first-child');
            if (treeItem.classList.contains('expanded')) {
                caret.className = 'fas fa-caret-down';
            } else {
                caret.className = 'fas fa-caret-right';
            }
        });
    });
}

// Slider Controls Interactions
function initSliderControls() {
    const sliders = document.querySelectorAll('input[type="range"]');
    
    sliders.forEach(slider => {
        // Update value display on change
        const valueDisplay = slider.nextElementSibling;
        slider.addEventListener('input', function() {
            if (valueDisplay && valueDisplay.classList.contains('value')) {
                valueDisplay.textContent = this.value;
                
                // Add highlight effect to value
                valueDisplay.style.color = '#4c84ff';
                setTimeout(() => {
                    valueDisplay.style.color = '';
                }, 500);
            }
        });
        
        // Add hover effect
        slider.addEventListener('mouseover', function() {
            this.style.boxShadow = '0 0 0 2px rgba(76, 132, 255, 0.3)';
        });
        
        slider.addEventListener('mouseout', function() {
            this.style.boxShadow = '';
        });
    });
}

// Toggle Button Interactions
function initToggleButtons() {
    // Performance Indicator Toggle
    const togglePerf = document.querySelector('.toggle-perf');
    const perfDetails = document.querySelector('.perf-details');
    
    if (togglePerf && perfDetails) {
        togglePerf.addEventListener('click', function() {
            perfDetails.style.display = perfDetails.style.display === 'block' ? 'none' : 'block';
            
            // Toggle between compact and detailed view
            if (perfDetails.style.display === 'block') {
                perfDetails.classList.toggle('compact');
            }
        });
    }
    
    // Simulation Controls (Build/Run Mode)
    const buildMode = document.querySelector('.build-mode');
    const runMode = document.querySelector('.run-mode');
    
    if (buildMode && runMode) {
        buildMode.addEventListener('click', function() {
            this.classList.add('active');
            runMode.classList.remove('active');
        });
        
        runMode.addEventListener('click', function() {
            this.classList.add('active');
            buildMode.classList.remove('active');
            
            // Add run animation to placeholder
            const placeholder = document.querySelector('.placeholder-simulation');
            if (placeholder) {
                placeholder.innerHTML = '<i class="fas fa-cube fa-3x"></i><p>Simulation running...</p>';
                placeholder.querySelector('i').style.animation = 'pulse 1s infinite';
            }
        });
    }
    
    // Resource Monitor Toggle
    const toggleResourceMonitor = document.querySelector('.toggle-resource-monitor');
    
    if (toggleResourceMonitor) {
        toggleResourceMonitor.addEventListener('click', function() {
            this.classList.toggle('active');
            
            // Change icon color when active
            if (this.classList.contains('active')) {
                this.style.color = '#4c84ff';
            } else {
                this.style.color = '';
            }
        });
    }
}

// Create a simple placeholder animation in the main canvas
function initPlaceholderSimulation() {
    const placeholderSim = document.querySelector('.placeholder-simulation');
    
    if (!placeholderSim) return;
    
    // Create animated placeholder
    const balls = [];
    const ballCount = 5;
    
    // Clear existing content
    placeholderSim.innerHTML = '';
    
    // Create balls
    for (let i = 0; i < ballCount; i++) {
        const ball = document.createElement('div');
        ball.style.position = 'absolute';
        ball.style.width = '20px';
        ball.style.height = '20px';
        ball.style.borderRadius = '50%';
        ball.style.backgroundColor = `hsl(${Math.random() * 360}, 80%, 60%)`;
        
        // Random position
        const x = Math.random() * 200 - 100;
        const y = Math.random() * 200 - 100;
        
        // Random velocity
        const vx = (Math.random() - 0.5) * 2;
        const vy = (Math.random() - 0.5) * 2;
        
        ball.style.transform = `translate(${x}px, ${y}px)`;
        placeholderSim.appendChild(ball);
        
        balls.push({
            element: ball,
            x: x,
            y: y,
            vx: vx,
            vy: vy
        });
    }
    
    // Animate balls
    function animateBalls() {
        balls.forEach(ball => {
            // Update position
            ball.x += ball.vx;
            ball.y += ball.vy;
            
            // Simple boundary checking
            if (Math.abs(ball.x) > 100) {
                ball.vx *= -1;
                ball.x = ball.x > 0 ? 100 : -100;
            }
            
            if (Math.abs(ball.y) > 100) {
                ball.vy *= -1;
                ball.y = ball.y > 0 ? 100 : -100;
            }
            
            // Apply new position
            ball.element.style.transform = `translate(${ball.x}px, ${ball.y}px)`;
        });
        
        requestAnimationFrame(animateBalls);
    }
    
    // Start animation
    animateBalls();
}

// Code Editor Effects
function initCodeEditorEffects() {
    const codeTabs = document.querySelectorAll('.file-tab');
    
    codeTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            codeTabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
        });
    });
    
    // Run Button Effect
    const runButton = document.querySelector('.run-button');
    
    if (runButton) {
        runButton.addEventListener('click', function() {
            // Add running animation
            this.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
            
            // Add console output
            const consoleContent = document.querySelector('.console-content');
            if (consoleContent) {
                const timestamp = new Date().toLocaleTimeString();
                consoleContent.innerHTML += `<div class="log-entry">[${timestamp}] Running simulation...</div>`;
                
                // Auto-scroll to bottom
                consoleContent.scrollTop = consoleContent.scrollHeight;
                
                // After a delay, restore button and add more console output
                setTimeout(() => {
                    this.innerHTML = '<i class="fas fa-play"></i>';
                    consoleContent.innerHTML += `<div class="log-entry">[${timestamp}] Simulation initialized with 50 balls</div>`;
                    consoleContent.innerHTML += `<div class="log-entry">[${timestamp}] Physics engine started</div>`;
                    consoleContent.innerHTML += `<div class="log-entry">[${timestamp}] FPS: 60</div>`;
                    consoleContent.scrollTop = consoleContent.scrollHeight;
                }, 1000);
            }
        });
    }
    
    // Documentation Button
    const docsButton = document.querySelector('.docs-button');
    const docsPanel = document.querySelector('.docs-quick-access');
    const closeDocsButton = document.querySelector('.close-docs');
    
    if (docsButton && docsPanel && closeDocsButton) {
        docsButton.addEventListener('click', function() {
            docsPanel.style.display = 'block';
            docsPanel.style.opacity = 0;
            setTimeout(() => {
                docsPanel.style.opacity = 1;
            }, 50);
        });
        
        closeDocsButton.addEventListener('click', function() {
            docsPanel.style.opacity = 0;
            setTimeout(() => {
                docsPanel.style.display = 'none';
            }, 300);
        });
    }
}

// Timeline Control Interactions
function initTimelineControls() {
    const playPauseButton = document.querySelector('.play-pause');
    const speedButtons = document.querySelectorAll('.speed-button');
    const tierButtons = document.querySelectorAll('.tier-button');
    
    if (playPauseButton) {
        playPauseButton.addEventListener('click', function() {
            const icon = this.querySelector('i');
            if (icon.classList.contains('fa-play')) {
                icon.className = 'fas fa-pause';
                this.title = 'Pause';
            } else {
                icon.className = 'fas fa-play';
                this.title = 'Play';
            }
        });
    }
    
    // Speed Control Buttons
    speedButtons.forEach(button => {
        button.addEventListener('click', function() {
            speedButtons.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // Add highlight pulse effect
            this.style.transform = 'scale(1.1)';
            setTimeout(() => {
                this.style.transform = '';
            }, 200);
        });
    });
    
    // Performance Tier Buttons
    tierButtons.forEach(button => {
        button.addEventListener('click', function() {
            tierButtons.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // Add highlight pulse effect
            this.style.transform = 'scale(1.1)';
            setTimeout(() => {
                this.style.transform = '';
            }, 200);
        });
    });
}

// Animate UI Elements
function animateUiElements() {
    // Project Name Input Focus Effect
    const projectName = document.querySelector('.project-name');
    
    if (projectName) {
        projectName.addEventListener('focus', function() {
            this.style.backgroundColor = '#3a3a3a';
            this.select();
        });
        
        projectName.addEventListener('blur', function() {
            this.style.backgroundColor = '';
        });
    }
    
    // Button Hover Effects
    const actionButtons = document.querySelectorAll('.action-button');
    
    actionButtons.forEach(button => {
        if (button.disabled) return;
        
        button.addEventListener('mouseover', function() {
            this.style.transform = 'translateY(-2px)';
            this.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.2)';
        });
        
        button.addEventListener('mouseout', function() {
            this.style.transform = '';
            this.style.boxShadow = '';
        });
    });
    
    // Save Button Effect
    const saveButton = document.querySelector('.save-button');
    
    if (saveButton) {
        saveButton.addEventListener('click', function() {
            // Change save status
            const saveStatus = document.querySelector('.save-status');
            if (saveStatus) {
                saveStatus.classList.remove('unsaved');
                saveStatus.classList.add('saved');
                saveStatus.innerHTML = '<i class="fas fa-circle"></i> Saved';
                
                // Temporarily disable button during save
                this.disabled = true;
                this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Saving...';
                
                // Enable export and share buttons after save
                setTimeout(() => {
                    const exportButton = document.querySelector('.export-button');
                    const shareButton = document.querySelector('.share-button');
                    
                    if (exportButton) exportButton.disabled = false;
                    if (shareButton) shareButton.disabled = false;
                    
                    // Restore save button
                    this.disabled = false;
                    this.innerHTML = '<i class="fas fa-save"></i> Save';
                }, 1000);
            }
        });
    }
    
    // AI Generator Prompt Suggestions
    const suggestionChips = document.querySelectorAll('.suggestion-chip');
    const promptInput = document.querySelector('.prompt-input-container textarea');
    
    if (suggestionChips.length && promptInput) {
        suggestionChips.forEach(chip => {
            chip.addEventListener('click', function() {
                promptInput.value = this.textContent;
                promptInput.focus();
                
                // Highlight effect
                this.style.backgroundColor = '#4c84ff';
                this.style.color = 'white';
                
                setTimeout(() => {
                    this.style.backgroundColor = '';
                    this.style.color = '';
                }, 500);
            });
        });
    }
    
    // Generate Button Effect
    const generateButton = document.querySelector('.generate-button');
    
    if (generateButton) {
        generateButton.addEventListener('click', function() {
            this.innerHTML = 'Generating <i class="fas fa-spinner fa-spin"></i>';
            this.disabled = true;
            
            // Simulate generation - update after delay
            setTimeout(() => {
                this.innerHTML = 'Generate <i class="fas fa-bolt"></i>';
                this.disabled = false;
                
                // Update history
                const historyList = document.querySelector('.history-list');
                const promptText = document.querySelector('.prompt-input-container textarea').value;
                
                if (historyList && promptText) {
                    const newItem = document.createElement('li');
                    newItem.textContent = promptText;
                    historyList.insertBefore(newItem, historyList.firstChild);
                    
                    // Add highlight effect to new item
                    newItem.style.backgroundColor = '#3b5ef3';
                    setTimeout(() => {
                        newItem.style.backgroundColor = '';
                    }, 1000);
                }
                
                // Show animation in placeholder
                initPlaceholderSimulation();
            }, 2000);
        });
    }
}
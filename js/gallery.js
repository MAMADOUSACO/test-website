document.addEventListener('DOMContentLoaded', function() {
    // Initialize Gallery Page Interactions
    initFilterButtons();
    initFilterDropdowns();
    initSimulationCards();
    initPreviewModal();
    initLikeButtons();
    initComments();
    initLoadMore();
});

// Filter Button Interactions
function initFilterButtons() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons in the same group
            const filterGroup = this.closest('.filter-group');
            filterGroup.querySelectorAll('.filter-btn').forEach(btn => {
                btn.classList.remove('active');
            });
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Update active filters
            updateActiveFilters();
            
            // Apply filters to gallery grid (with animation)
            applyFilters();
        });
    });
}

// Filter Dropdown Interactions
function initFilterDropdowns() {
    const dropdownItems = document.querySelectorAll('.dropdown-content a');
    
    dropdownItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all items in the same dropdown
            const dropdown = this.closest('.dropdown-content');
            dropdown.querySelectorAll('a').forEach(a => {
                a.classList.remove('active');
            });
            
            // Add active class to clicked item
            this.classList.add('active');
            
            // Update dropdown toggle text
            const dropdownToggle = this.closest('.dropdown').querySelector('.filter-dropdown-toggle span, .sort-dropdown-toggle span');
            if (dropdownToggle) {
                dropdownToggle.textContent = this.textContent;
            }
            
            // Update active filters
            updateActiveFilters();
            
            // Apply filters to gallery grid
            applyFilters();
        });
    });
}

// Update Active Filters Display
function updateActiveFilters() {
    const activeFiltersContainer = document.querySelector('.active-filters');
    activeFiltersContainer.innerHTML = '';
    
    // Get active primary filter
    const activePrimaryFilter = document.querySelector('.primary-filters .filter-btn.active');
    if (activePrimaryFilter) {
        addFilterTag(activeFiltersContainer, activePrimaryFilter.textContent);
    }
    
    // Get active category filter
    const activeCategoryFilter = document.querySelector('[data-category].active');
    if (activeCategoryFilter && activeCategoryFilter.getAttribute('data-category') !== 'all') {
        addFilterTag(activeFiltersContainer, activeCategoryFilter.textContent);
    }
    
    // Get active complexity filter
    const activeComplexityFilter = document.querySelector('[data-complexity].active');
    if (activeComplexityFilter && activeComplexityFilter.getAttribute('data-complexity') !== 'all') {
        addFilterTag(activeFiltersContainer, activeComplexityFilter.textContent);
    }
    
    // Get active performance filter
    const activePerformanceFilter = document.querySelector('[data-performance].active');
    if (activePerformanceFilter && activePerformanceFilter.getAttribute('data-performance') !== 'all') {
        addFilterTag(activeFiltersContainer, activePerformanceFilter.textContent);
    }
}

// Add Filter Tag
function addFilterTag(container, text) {
    const filterTag = document.createElement('div');
    filterTag.className = 'filter-tag';
    filterTag.innerHTML = `
        <span>${text}</span>
        <button class="remove-filter"><i class="fas fa-times"></i></button>
    `;
    
    // Add event listener to remove filter
    filterTag.querySelector('.remove-filter').addEventListener('click', function() {
        // Find corresponding filter and reset it
        if (document.querySelector('.primary-filters .filter-btn.active')?.textContent === text) {
            document.querySelector('.primary-filters .filter-btn:first-child').click();
        } else if (document.querySelector('[data-category].active')?.textContent === text) {
            document.querySelector('[data-category="all"]').click();
        } else if (document.querySelector('[data-complexity].active')?.textContent === text) {
            document.querySelector('[data-complexity="all"]').click();
        } else if (document.querySelector('[data-performance].active')?.textContent === text) {
            document.querySelector('[data-performance="all"]').click();
        }
    });
    
    container.appendChild(filterTag);
}

// Apply Filters to Gallery Grid
function applyFilters() {
    const cards = document.querySelectorAll('.simulation-card');
    
    // Get active filters
    const activeCategory = document.querySelector('[data-category].active')?.getAttribute('data-category') || 'all';
    const activeComplexity = document.querySelector('[data-complexity].active')?.getAttribute('data-complexity') || 'all';
    const activePerformance = document.querySelector('[data-performance].active')?.getAttribute('data-performance') || 'all';
    
    // Get active sort
    const activeSort = document.querySelector('[data-sort].active')?.getAttribute('data-sort') || 'likes';
    
    // Apply filters with animation
    cards.forEach(card => {
        // Initially hide all cards with fade-out
        card.style.opacity = '0';
        card.style.transform = 'scale(0.9)';
        
        setTimeout(() => {
            // Filter by category
            const cardCategory = card.getAttribute('data-category');
            const categoryMatch = activeCategory === 'all' || cardCategory === activeCategory;
            
            // Filter by complexity
            const cardComplexity = card.getAttribute('data-complexity');
            const complexityMatch = activeComplexity === 'all' || cardComplexity === activeComplexity;
            
            // Filter by performance
            const cardPerformance = card.getAttribute('data-performance');
            const performanceMatch = activePerformance === 'all' || cardPerformance === activePerformance;
            
            // Apply all filters
            if (categoryMatch && complexityMatch && performanceMatch) {
                card.style.display = 'block';
                // Animate cards back in
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'scale(1)';
                }, 50);
            } else {
                setTimeout(() => {
                    card.style.display = 'none';
                }, 200);
            }
        }, 200);
    });
    
    // Apply sorting (in a real implementation, this would be more sophisticated)
    sortCards(activeSort);
}

// Sort Cards by Criteria
function sortCards(sortCriteria) {
    const galleryGrid = document.querySelector('.gallery-grid');
    const cards = Array.from(galleryGrid.querySelectorAll('.simulation-card'));
    
    // Sort based on criteria (this is simplified for the preview)
    cards.sort((a, b) => {
        if (sortCriteria === 'likes') {
            const aLikes = parseInt(a.querySelector('.stat:nth-child(2) span').textContent);
            const bLikes = parseInt(b.querySelector('.stat:nth-child(2) span').textContent);
            return bLikes - aLikes;
        } else if (sortCriteria === 'views') {
            const aViews = parseInt(a.querySelector('.stat:nth-child(1) span').textContent);
            const bViews = parseInt(b.querySelector('.stat:nth-child(1) span').textContent);
            return bViews - aViews;
        } else if (sortCriteria === 'cloned') {
            const aClones = parseInt(a.querySelector('.stat:nth-child(3) span').textContent);
            const bClones = parseInt(b.querySelector('.stat:nth-child(3) span').textContent);
            return bClones - aClones;
        }
        // For 'updated', we would use dates
        return 0;
    });
    
    // Reorder the DOM elements
    cards.forEach(card => {
        galleryGrid.appendChild(card);
    });
}

// Simulation Card Interactions
function initSimulationCards() {
    const cards = document.querySelectorAll('.simulation-card');
    
    cards.forEach(card => {
        // Open preview modal when run button is clicked
        const runButtons = card.querySelectorAll('.run-btn, .preview-action-btn');
        runButtons.forEach(button => {
            button.addEventListener('click', function() {
                openPreviewModal(card);
            });
        });
        
        // Clone button effect
        const cloneButton = card.querySelector('.clone-btn');
        if (cloneButton) {
            cloneButton.addEventListener('click', function() {
                // Add "cloning" animation
                this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Cloning...';
                
                // Restore after delay
                setTimeout(() => {
                    this.innerHTML = '<i class="fas fa-clone"></i> Clone';
                    
                    // Show success message
                    const notification = document.createElement('div');
                    notification.style.position = 'fixed';
                    notification.style.bottom = '20px';
                    notification.style.right = '20px';
                    notification.style.backgroundColor = '#4caf50';
                    notification.style.color = 'white';
                    notification.style.padding = '10px 20px';
                    notification.style.borderRadius = '4px';
                    notification.style.boxShadow = '0 2px 10px rgba(0,0,0,0.2)';
                    notification.style.zIndex = '1000';
                    notification.style.transform = 'translateY(100px)';
                    notification.style.opacity = '0';
                    notification.style.transition = 'all 0.3s ease';
                    notification.innerHTML = '<i class="fas fa-check-circle"></i> Simulation cloned successfully! Redirecting to editor...';
                    document.body.appendChild(notification);
                    
                    setTimeout(() => {
                        notification.style.transform = 'translateY(0)';
                        notification.style.opacity = '1';
                    }, 10);
                    
                    setTimeout(() => {
                        notification.style.transform = 'translateY(100px)';
                        notification.style.opacity = '0';
                        setTimeout(() => {
                            notification.remove();
                        }, 300);
                    }, 3000);
                }, 1000);
            });
        }
    });
}

// Preview Modal Functionality
function initPreviewModal() {
    const modal = document.querySelector('.preview-modal');
    const closeButton = modal.querySelector('.close-modal');
    
    // Close modal when button is clicked
    closeButton.addEventListener('click', function() {
        closePreviewModal();
    });
    
    // Close modal when clicking outside content
    modal.addEventListener('click', function(event) {
        if (event.target === modal) {
            closePreviewModal();
        }
    });
    
    // Close modal with Escape key
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && modal.style.display === 'block') {
            closePreviewModal();
        }
    });
    
    // Playback controls
    const playPauseButton = modal.querySelector('.play-pause');
    const restartButton = modal.querySelector('.restart');
    const fullscreenButton = modal.querySelector('.fullscreen');
    const speedButtons = modal.querySelectorAll('.speed-btn');
    
    // Play/Pause toggle
    if (playPauseButton) {
        playPauseButton.addEventListener('click', function() {
            const icon = this.querySelector('i');
            if (icon.classList.contains('fa-pause')) {
                icon.className = 'fas fa-play';
            } else {
                icon.className = 'fas fa-pause';
            }
        });
    }
    
    // Restart button
    if (restartButton) {
        restartButton.addEventListener('click', function() {
            // Add rotation animation
            this.style.transform = 'rotate(360deg)';
            this.style.transition = 'transform 0.5s ease';
            
            setTimeout(() => {
                this.style.transform = '';
            }, 500);
        });
    }
    
    // Fullscreen button
    if (fullscreenButton) {
        fullscreenButton.addEventListener('click', function() {
            const simulationCanvas = modal.querySelector('.simulation-canvas');
            
            if (!document.fullscreenElement) {
                simulationCanvas.requestFullscreen().catch(err => {
                    console.error('Error attempting to enable fullscreen:', err);
                });
                this.innerHTML = '<i class="fas fa-compress"></i>';
            } else {
                document.exitFullscreen();
                this.innerHTML = '<i class="fas fa-expand"></i>';
            }
        });
    }
    
    // Speed buttons
    speedButtons.forEach(button => {
        button.addEventListener('click', function() {
            speedButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
        });
    });
    
    // Action buttons
    const runFullscreenBtn = modal.querySelector('.run-fullscreen-btn');
    const cloneEditBtn = modal.querySelector('.clone-edit-btn');
    const downloadBtn = modal.querySelector('.download-btn');
    const socialButtons = modal.querySelectorAll('.social-btn');
    
    // Run in fullscreen action
    if (runFullscreenBtn) {
        runFullscreenBtn.addEventListener('click', function() {
            const simulationCanvas = modal.querySelector('.simulation-canvas');
            
            if (!document.fullscreenElement) {
                simulationCanvas.requestFullscreen().catch(err => {
                    console.error('Error attempting to enable fullscreen:', err);
                });
            }
        });
    }
    
    // Clone and edit action
    if (cloneEditBtn) {
        cloneEditBtn.addEventListener('click', function() {
            this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Redirecting...';
            
            // Simulate redirect after delay
            setTimeout(() => {
                // In a real implementation, this would redirect to the creator page
                this.innerHTML = '<i class="fas fa-clone"></i> Clone and Edit';
            }, 1000);
        });
    }
    
    // Download action
    if (downloadBtn) {
        downloadBtn.addEventListener('click', function() {
            this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Preparing download...';
            
            // Simulate download after delay
            setTimeout(() => {
                this.innerHTML = '<i class="fas fa-download"></i> Download Recording';
                
                // Create notification
                const notification = document.createElement('div');
                notification.style.position = 'fixed';
                notification.style.bottom = '20px';
                notification.style.right = '20px';
                notification.style.backgroundColor = '#4caf50';
                notification.style.color = 'white';
                notification.style.padding = '10px 20px';
                notification.style.borderRadius = '4px';
                notification.style.boxShadow = '0 2px 10px rgba(0,0,0,0.2)';
                notification.style.zIndex = '1000';
                notification.style.transform = 'translateY(100px)';
                notification.style.opacity = '0';
                notification.style.transition = 'all 0.3s ease';
                notification.innerHTML = '<i class="fas fa-check-circle"></i> Download started!';
                document.body.appendChild(notification);
                
                setTimeout(() => {
                    notification.style.transform = 'translateY(0)';
                    notification.style.opacity = '1';
                }, 10);
                
                setTimeout(() => {
                    notification.style.transform = 'translateY(100px)';
                    notification.style.opacity = '0';
                    setTimeout(() => {
                        notification.remove();
                    }, 300);
                }, 3000);
            }, 1500);
        });
    }
    
    // Social share buttons
    socialButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Add pulse effect
            this.style.transform = 'scale(1.2)';
            setTimeout(() => {
                this.style.transform = '';
            }, 200);
            
            // Get platform from icon
            const platform = this.querySelector('i').className.includes('twitter') ? 'Twitter' :
                            this.querySelector('i').className.includes('facebook') ? 'Facebook' :
                            this.querySelector('i').className.includes('reddit') ? 'Reddit' : 'Link';
            
            if (platform === 'Link') {
                // Show "copied to clipboard" notification
                const notification = document.createElement('div');
                notification.style.position = 'absolute';
                notification.style.bottom = '50px';
                notification.style.left = '50%';
                notification.style.transform = 'translateX(-50%)';
                notification.style.backgroundColor = '#333';
                notification.style.color = 'white';
                notification.style.padding = '8px 16px';
                notification.style.borderRadius = '4px';
                notification.style.fontSize = '14px';
                notification.innerHTML = 'Link copied to clipboard!';
                this.parentElement.appendChild(notification);
                
                setTimeout(() => {
                    notification.style.opacity = '0';
                    setTimeout(() => {
                        notification.remove();
                    }, 300);
                }, 2000);
            }
        });
    });
}

// Open Preview Modal
function openPreviewModal(card) {
    const modal = document.querySelector('.preview-modal');
    
    // Get simulation details from card
    const title = card.querySelector('.simulation-title').textContent;
    const creatorName = card.querySelector('.creator-name').textContent;
    const description = card.querySelector('.simulation-description').textContent;
    const previewColor = card.querySelector('.preview-thumbnail').style.backgroundColor;
    
    // Update modal content
    modal.querySelector('.modal-title').textContent = title;
    modal.querySelector('.creator-name').textContent = creatorName;
    modal.querySelector('.description-section p:first-child').textContent = description;
    
    // Show loading state in simulation canvas
    const placeholderSim = modal.querySelector('.placeholder-simulation');
    placeholderSim.innerHTML = '<i class="fas fa-spinner fa-spin fa-3x"></i><p>Loading simulation...</p>';
    
    // Display modal with animation
    modal.style.display = 'block';
    modal.style.opacity = '0';
    setTimeout(() => {
        modal.style.opacity = '1';
    }, 10);
    
    // Simulate loading and display a demo simulation
    setTimeout(() => {
        // Create a simple animation to replace the loading spinner
        placeholderSim.innerHTML = '';
        placeholderSim.style.backgroundColor = previewColor;
        
        // Create some demo balls
        for (let i = 0; i < 15; i++) {
            createDemoBall(placeholderSim);
        }
    }, 1500);
}

// Create Demo Ball for Simulation Preview
function createDemoBall(container) {
    const ball = document.createElement('div');
    ball.style.position = 'absolute';
    ball.style.width = Math.floor(Math.random() * 40 + 20) + 'px';
    ball.style.height = ball.style.width;
    ball.style.backgroundColor = `hsl(${Math.random() * 360}, 80%, 60%)`;
    ball.style.borderRadius = '50%';
    ball.style.boxShadow = '0 2px 5px rgba(0,0,0,0.2)';
    
    // Random position
    const containerRect = container.getBoundingClientRect();
    const size = parseInt(ball.style.width);
    const maxX = containerRect.width - size;
    const maxY = containerRect.height - size;
    
    ball.style.left = Math.floor(Math.random() * maxX) + 'px';
    ball.style.top = Math.floor(Math.random() * maxY) + 'px';
    
    // Store velocity as data attributes
    ball.dataset.vx = (Math.random() - 0.5) * 4;
    ball.dataset.vy = (Math.random() - 0.5) * 4;
    
    container.appendChild(ball);
    
    // Only start animation if we don't have one already
    if (!container.dataset.animating) {
        container.dataset.animating = 'true';
        animateDemoBalls(container);
    }
}

// Animate Demo Balls
function animateDemoBalls(container) {
    const balls = container.querySelectorAll('div');
    const containerRect = container.getBoundingClientRect();
    
    balls.forEach(ball => {
        // Get current position and velocity
        let x = parseInt(ball.style.left);
        let y = parseInt(ball.style.top);
        let vx = parseFloat(ball.dataset.vx);
        let vy = parseFloat(ball.dataset.vy);
        const size = parseInt(ball.style.width);
        
        // Update position
        x += vx;
        y += vy;
        
        // Boundary checking
        if (x <= 0 || x >= containerRect.width - size) {
            vx *= -1;
            x = x <= 0 ? 0 : containerRect.width - size;
        }
        
        if (y <= 0 || y >= containerRect.height - size) {
            vy *= -1;
            y = y <= 0 ? 0 : containerRect.height - size;
        }
        
        // Update position and velocity
        ball.style.left = x + 'px';
        ball.style.top = y + 'px';
        ball.dataset.vx = vx;
        ball.dataset.vy = vy;
    });
    
    // Continue animation if modal is still open
    if (document.querySelector('.preview-modal').style.display === 'block') {
        requestAnimationFrame(() => animateDemoBalls(container));
    } else {
        container.dataset.animating = '';
    }
}

// Close Preview Modal
function closePreviewModal() {
    const modal = document.querySelector('.preview-modal');
    
    // Add fade-out animation
    modal.style.opacity = '0';
    
    // Wait for animation to complete before hiding
    setTimeout(() => {
        modal.style.display = 'none';
        
        // Clean up any animation
        const placeholderSim = modal.querySelector('.placeholder-simulation');
        placeholderSim.innerHTML = '<i class="fas fa-spinner fa-spin fa-3x"></i><p>Loading simulation...</p>';
        placeholderSim.style.backgroundColor = '';
    }, 300);
}

// Like Button Functionality
function initLikeButtons() {
    const likeButtons = document.querySelectorAll('.like-btn');
    
    likeButtons.forEach(button => {
        button.addEventListener('click', function() {
            this.classList.toggle('active');
            
            const icon = this.querySelector('i');
            if (this.classList.contains('active')) {
                icon.className = 'fas fa-heart';
                
                // Animate button
                this.style.transform = 'scale(1.2)';
                setTimeout(() => {
                    this.style.transform = '';
                }, 200);
                
                // Update stat counter (simplified)
                const statCounter = this.closest('.simulation-card').querySelector('.stat:nth-child(2) span');
                if (statCounter) {
                    let likes = parseInt(statCounter.textContent);
                    statCounter.textContent = (likes + 1).toString();
                }
            } else {
                icon.className = 'far fa-heart';
                
                // Update stat counter (simplified)
                const statCounter = this.closest('.simulation-card').querySelector('.stat:nth-child(2) span');
                if (statCounter) {
                    let likes = parseInt(statCounter.textContent);
                    statCounter.textContent = (likes - 1).toString();
                }
            }
        });
    });
}

// Comments Section Functionality
function initComments() {
    const commentForm = document.querySelector('.comment-form');
    const commentTextarea = commentForm?.querySelector('textarea');
    const postButton = commentForm?.querySelector('.post-comment-btn');
    const commentsList = document.querySelector('.comments-list');
    const replyButtons = document.querySelectorAll('.reply-btn');
    
    // Post new comment
    if (postButton && commentTextarea && commentsList) {
        postButton.addEventListener('click', function() {
            const commentText = commentTextarea.value.trim();
            
            if (commentText) {
                // Create new comment element
                const newComment = document.createElement('div');
                newComment.className = 'comment';
                newComment.innerHTML = `
                    <img src="images/avatars/user-avatar.jpg" alt="Your avatar" class="comment-avatar">
                    <div class="comment-content">
                        <div class="comment-header">
                            <span class="commenter-name">You</span>
                            <span class="comment-time">Just now</span>
                        </div>
                        <p class="comment-text">${commentText}</p>
                        <div class="comment-actions">
                            <button class="comment-action-btn"><i class="fas fa-thumbs-up"></i> 0</button>
                            <button class="comment-action-btn"><i class="fas fa-thumbs-down"></i> 0</button>
                            <button class="comment-action-btn reply-btn">Reply</button>
                        </div>
                    </div>
                `;
                
                // Add to the top of the list
                commentsList.insertBefore(newComment, commentsList.firstChild);
                
                // Clear textarea
                commentTextarea.value = '';
                
                // Add reply functionality to new buttons
                newComment.querySelectorAll('.reply-btn').forEach(button => {
                    button.addEventListener('click', createReplyForm);
                });
                
                // Update comment count
                const commentsHeading = document.querySelector('.comments-section h3');
                if (commentsHeading) {
                    const currentCount = parseInt(commentsHeading.textContent.match(/\d+/)[0]);
                    commentsHeading.textContent = `Comments (${currentCount + 1})`;
                }
                
                // Scroll to new comment
                newComment.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }
    
    // Reply to comment functionality
    replyButtons.forEach(button => {
        button.addEventListener('click', createReplyForm);
    });
}

// Create Reply Form
function createReplyForm() {
    // Remove any existing reply forms
    document.querySelectorAll('.reply-form').forEach(form => form.remove());
    
    const comment = this.closest('.comment');
    const commentContent = this.closest('.comment-content');
    
    // Create reply form
    const replyForm = document.createElement('div');
    replyForm.className = 'comment-form reply-form';
    replyForm.innerHTML = `
        <img src="images/avatars/user-avatar.jpg" alt="Your avatar" class="comment-avatar">
        <textarea placeholder="Write a reply..."></textarea>
        <div class="reply-form-actions">
            <button class="cancel-reply-btn">Cancel</button>
            <button class="post-reply-btn">Reply</button>
        </div>
    `;
    
    // Add after comment actions
    commentContent.appendChild(replyForm);
    
    // Focus textarea
    replyForm.querySelector('textarea').focus();
    
    // Cancel reply
    replyForm.querySelector('.cancel-reply-btn').addEventListener('click', function() {
        replyForm.remove();
    });
    
    // Post reply
    replyForm.querySelector('.post-reply-btn').addEventListener('click', function() {
        const replyText = replyForm.querySelector('textarea').value.trim();
        
        if (replyText) {
            // Create new reply
            const newReply = document.createElement('div');
            newReply.className = 'comment reply';
            newReply.innerHTML = `
                <img src="images/avatars/user-avatar.jpg" alt="Your avatar" class="comment-avatar">
                <div class="comment-content">
                    <div class="comment-header">
                        <span class="commenter-name">You</span>
                        <span class="comment-time">Just now</span>
                    </div>
                    <p class="comment-text">${replyText}</p>
                    <div class="comment-actions">
                        <button class="comment-action-btn"><i class="fas fa-thumbs-up"></i> 0</button>
                        <button class="comment-action-btn"><i class="fas fa-thumbs-down"></i> 0</button>
                        <button class="comment-action-btn reply-btn">Reply</button>
                    </div>
                </div>
            `;
            
            // Add after the original comment
            commentContent.appendChild(newReply);
            
            // Remove reply form
            replyForm.remove();
            
            // Update comment count
            const commentsHeading = document.querySelector('.comments-section h3');
            if (commentsHeading) {
                const currentCount = parseInt(commentsHeading.textContent.match(/\d+/)[0]);
                commentsHeading.textContent = `Comments (${currentCount + 1})`;
            }
            
            // Add reply functionality to new reply
            newReply.querySelector('.reply-btn').addEventListener('click', createReplyForm);
        }
    });
}

// Load More Functionality
function initLoadMore() {
    const loadMoreBtn = document.querySelector('.load-more-btn');
    const loadMoreCommentsBtn = document.querySelector('.load-more-comments-btn');
    
    // Load more simulations
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', function() {
            this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Loading...';
            
            // Simulate loading delay
            setTimeout(() => {
                this.innerHTML = 'Load More Simulations';
                
                // In a real implementation, this would fetch more simulations
                // For the preview, we'll just show a message
                const message = document.createElement('div');
                message.style.textAlign = 'center';
                message.style.padding = '20px';
                message.style.color = 'var(--neutral-600)';
                message.innerHTML = 'No more simulations to load.';
                
                this.parentElement.appendChild(message);
                this.style.display = 'none';
            }, 1500);
        });
    }
    
    // Load more comments
    if (loadMoreCommentsBtn) {
        loadMoreCommentsBtn.addEventListener('click', function() {
            this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Loading...';
            
            // Simulate loading delay
            setTimeout(() => {
                this.innerHTML = 'Load More Comments';
                
                // In a real implementation, this would fetch more comments
                // For the preview, we'll just show a message
                const message = document.createElement('div');
                message.style.textAlign = 'center';
                message.style.padding = '20px';
                message.style.color = 'var(--neutral-600)';
                message.innerHTML = 'No more comments to load.';
                
                this.parentElement.appendChild(message);
                this.style.display = 'none';
            }, 1500);
        });
    }
}
document.addEventListener('DOMContentLoaded', function() {
    // Initialize Featured Simulations Page
    initCategoryTabs();
    initSortSelect();
    initLoadMore();
    initSimulationCards();
    initNominationModal();
});

// Category Tabs
function initCategoryTabs() {
    const categoryTabs = document.querySelectorAll('.category-tab');
    const simulationCards = document.querySelectorAll('.simulation-card');
    
    categoryTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // Update active tab
            categoryTabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            
            // Get selected category
            const selectedCategory = this.getAttribute('data-category');
            
            // Show all simulations or filter by category
            simulationCards.forEach(card => {
                if (selectedCategory === 'all' || card.getAttribute('data-category') === selectedCategory) {
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
            
            // Update featured count
            updateFeaturedCount();
        });
    });
}

// Sort Select
function initSortSelect() {
    const sortSelect = document.getElementById('sort-select');
    
    if (sortSelect) {
        sortSelect.addEventListener('change', function() {
            const sortValue = this.value;
            const featuredGrid = document.querySelector('.featured-grid');
            const cards = Array.from(featuredGrid.querySelectorAll('.simulation-card'));
            
            // Sort cards based on selected criteria
            sortCards(cards, sortValue);
            
            // Apply sorting with animation
            cards.forEach(card => {
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';
                
                setTimeout(() => {
                    featuredGrid.appendChild(card);
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, 300);
            });
        });
    }
}

// Sort Cards
function sortCards(cards, sortCriteria) {
    cards.sort((a, b) => {
        if (sortCriteria === 'recent') {
            // In a real implementation, this would use actual dates
            // For demo, we'll use random sorting
            return Math.random() - 0.5;
        } else if (sortCriteria === 'popular') {
            // Sort by views
            const aViews = parseInt(a.querySelector('.stats span:first-child').textContent.replace(/[^0-9]/g, ''));
            const bViews = parseInt(b.querySelector('.stats span:first-child').textContent.replace(/[^0-9]/g, ''));
            return bViews - aViews;
        } else if (sortCriteria === 'educational') {
            // Prioritize educational category
            const aIsEducational = a.getAttribute('data-category') === 'educational';
            const bIsEducational = b.getAttribute('data-category') === 'educational';
            return bIsEducational - aIsEducational;
        }
        
        return 0;
    });
}

// Update Featured Count
function updateFeaturedCount() {
    const visibleCards = document.querySelectorAll('.simulation-card[style*="display: block"], .simulation-card:not([style*="display"])').length;
    const totalCards = document.querySelectorAll('.simulation-card').length;
    const countElement = document.querySelector('.featured-count span');
    
    if (countElement) {
        countElement.textContent = `Showing ${visibleCards} of ${totalCards} featured simulations`;
    }
}

// Load More Button
function initLoadMore() {
    const loadMoreBtn = document.querySelector('.load-more-btn');
    
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', function() {
            // Show loading state
            this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Loading...';
            this.disabled = true;
            
            // Simulate loading delay
            setTimeout(() => {
                // In a real implementation, this would load more simulations from the server
                // For the demo, we'll just hide the button
                this.innerHTML = 'Load More Featured Simulations';
                this.disabled = false;
                this.style.display = 'none';
                
                // Add a message
                const message = document.createElement('p');
                message.textContent = 'No more featured simulations to load.';
                message.style.textAlign = 'center';
                message.style.color = 'var(--neutral-600)';
                this.parentElement.appendChild(message);
            }, 1500);
        });
    }
}

// Simulation Card Interactions
function initSimulationCards() {
    const previewButtons = document.querySelectorAll('.preview-btn');
    const favoriteButtons = document.querySelectorAll('.favorite-btn');
    const moreButtons = document.querySelectorAll('.more-btn');
    
    // Preview buttons
    previewButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.stopPropagation();
            
            // Get card data
            const card = this.closest('.simulation-card');
            const title = card.querySelector('.card-title').textContent;
            
            // Show loading toast
            showToast(`Loading "${title}"...`, 'info');
            
            // In a real implementation, this would navigate to the simulation player
            setTimeout(() => {
                window.location.href = `player.html?id=${encodeURIComponent(title.toLowerCase().replace(/\s+/g, '_'))}`;
            }, 1000);
        });
    });
    
    // Favorite buttons
    favoriteButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.stopPropagation();
            
            // Toggle favorite state
            const isFavorite = this.classList.contains('active');
            const card = this.closest('.simulation-card');
            const title = card.querySelector('.card-title').textContent;
            
            if (isFavorite) {
                this.classList.remove('active');
                this.innerHTML = '<i class="far fa-heart"></i>';
                showToast(`Removed "${title}" from favorites`, 'info');
            } else {
                this.classList.add('active');
                this.innerHTML = '<i class="fas fa-heart"></i>';
                showToast(`Added "${title}" to favorites`, 'success');
                
                // Add heart animation
                const heart = document.createElement('div');
                heart.className = 'floating-heart';
                heart.innerHTML = '<i class="fas fa-heart"></i>';
                heart.style.position = 'absolute';
                heart.style.top = '50%';
                heart.style.left = '50%';
                heart.style.transform = 'translate(-50%, -50%)';
                heart.style.color = '#e91e63';
                heart.style.fontSize = '3rem';
                heart.style.opacity = '0';
                heart.style.transition = 'all 0.5s ease';
                heart.style.pointerEvents = 'none';
                
                this.parentElement.appendChild(heart);
                
                // Animate heart
                setTimeout(() => {
                    heart.style.opacity = '1';
                    heart.style.transform = 'translate(-50%, -50%) scale(1.5)';
                }, 10);
                
                setTimeout(() => {
                    heart.style.opacity = '0';
                    heart.style.transform = 'translate(-50%, -50%) scale(0.5)';
                }, 500);
                
                setTimeout(() => {
                    heart.remove();
                }, 1000);
            }
        });
    });
    
    // More buttons
    moreButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.stopPropagation();
            
            // In a real implementation, this would show a dropdown menu
            const card = this.closest('.simulation-card');
            const title = card.querySelector('.card-title').textContent;
            
            // For demo, we'll just show a toast
            showToast(`More options for "${title}"`, 'info');
        });
    });
}

// Nomination Modal
function initNominationModal() {
    const nominateBtn = document.querySelector('.nominate-btn');
    const modalOverlay = document.getElementById('nomination-modal');
    const closeBtn = modalOverlay.querySelector('.close-modal');
    const cancelBtn = modalOverlay.querySelector('.cancel-btn');
    const submitBtn = modalOverlay.querySelector('.submit-btn');
    
    // Open modal
    nominateBtn.addEventListener('click', function() {
        modalOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
    
    // Close modal functions
    const closeModal = () => {
        modalOverlay.classList.remove('active');
        document.body.style.overflow = '';
    };
    
    closeBtn.addEventListener('click', closeModal);
    cancelBtn.addEventListener('click', closeModal);
    
    // Close when clicking outside
    modalOverlay.addEventListener('click', function(e) {
        if (e.target === modalOverlay) {
            closeModal();
        }
    });
    
    // Submit nomination
    submitBtn.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Get form values
        const form = this.closest('form');
        const simulationUrl = form.querySelector('input[type="text"]').value;
        const reason = form.querySelector('textarea').value;
        
        // Simple validation
        if (!simulationUrl || !reason) {
            showToast('Please fill in all required fields', 'error');
            return;
        }
        
        // Show submitting state
        this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Submitting...';
        this.disabled = true;
        
        // Simulate API call
        setTimeout(() => {
            // Reset button
            this.innerHTML = 'Submit Nomination';
            this.disabled = false;
            
            // Show success and close modal
            showToast('Nomination submitted successfully!', 'success');
            closeModal();
            
            // Reset form
            form.reset();
        }, 1500);
    });
}

// Toast Notification
function showToast(message, type = 'info') {
    // Create toast element
    const toast = document.createElement('div');
    toast.className = 'toast-notification ' + type;
    
    // Set icon based on type
    let icon = 'info-circle';
    if (type === 'success') icon = 'check-circle';
    if (type === 'error') icon = 'exclamation-circle';
    
    toast.innerHTML = `
        <i class="fas fa-${icon}"></i>
        <span>${message}</span>
    `;
    
    // Style the toast
    Object.assign(toast.style, {
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        backgroundColor: type === 'success' ? '#4caf50' : type === 'error' ? '#f44336' : '#2196f3',
        color: 'white',
        padding: '12px 20px',
        borderRadius: '4px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.2)',
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        zIndex: '9999',
        transform: 'translateY(100px)',
        opacity: '0',
        transition: 'all 0.3s ease'
    });
    
    // Add to document
    document.body.appendChild(toast);
    
    // Animate in
    setTimeout(() => {
        toast.style.transform = 'translateY(0)';
        toast.style.opacity = '1';
    }, 10);
    
    // Remove after delay
    setTimeout(() => {
        toast.style.transform = 'translateY(100px)';
        toast.style.opacity = '0';
        
        // Remove element after animation
        setTimeout(() => {
            toast.remove();
        }, 300);
    }, 3000);
}

// Initialize page
document.addEventListener('DOMContentLoaded', function() {
    // Set initial counts
    updateFeaturedCount();
    
    // CSS for floating heart animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes float-up {
            0% {
                opacity: 0;
                transform: translate(-50%, -50%) scale(0.5);
            }
            50% {
                opacity: 1;
                transform: translate(-50%, -80%) scale(1.5);
            }
            100% {
                opacity: 0;
                transform: translate(-50%, -120%) scale(0.5);
            }
        }
        
        .floating-heart {
            animation: float-up 1s forwards;
        }
    `;
    document.head.appendChild(style);
});
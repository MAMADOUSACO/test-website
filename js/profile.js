document.addEventListener('DOMContentLoaded', function() {
    // Initialize Profile Page Interactions
    initProfileTabs();
    initViewToggle();
    initMoreOptions();
    initEditProfile();
    initLoadMore();
    initSocialLinks();
    initAchievementInteractions();
    initSimulationActions();
});

// Profile Tabs Functionality
function initProfileTabs() {
    const navTabs = document.querySelectorAll('.nav-tab');
    const tabContents = document.querySelectorAll('.profile-tab-content');
    
    navTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // Update active tab
            navTabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            
            // Show corresponding tab content
            const tabToShow = this.getAttribute('data-tab');
            tabContents.forEach(content => {
                content.classList.remove('active');
                if (content.id === tabToShow + '-tab') {
                    content.classList.add('active');
                    
                    // Add fade-in animation
                    content.style.opacity = '0';
                    setTimeout(() => {
                        content.style.opacity = '1';
                    }, 10);
                }
            });
            
            // Update URL hash (without page reload)
            history.replaceState(null, null, '#' + tabToShow);
        });
    });
    
    // Check for URL hash on page load
    if (location.hash) {
        const tabId = location.hash.substring(1);
        const tabToActivate = document.querySelector(`.nav-tab[data-tab="${tabId}"]`);
        if (tabToActivate) {
            tabToActivate.click();
        }
    }
}

// View Toggle (Grid/List) Functionality
function initViewToggle() {
    const viewButtons = document.querySelectorAll('.view-btn');
    
    viewButtons.forEach(button => {
        button.addEventListener('click', function() {
            const viewType = this.getAttribute('data-view');
            const tabContent = this.closest('.profile-tab-content');
            
            // Update active button
            const toggleContainer = this.closest('.view-toggle');
            toggleContainer.querySelectorAll('.view-btn').forEach(btn => {
                btn.classList.remove('active');
            });
            this.classList.add('active');
            
            // Handle view switching
            if (tabContent.id === 'simulations-tab') {
                toggleSimulationsView(viewType);
            } else if (tabContent.id === 'favorites-tab') {
                toggleFavoritesView(viewType);
            }
        });
    });
}

// Toggle Simulations View (Grid/List)
function toggleSimulationsView(viewType) {
    const container = document.querySelector('.simulations-container');
    
    if (viewType === 'grid') {
        // If grid already exists, just show it
        if (container.querySelector('.simulations-grid')) {
            container.querySelector('.simulations-grid').style.display = 'grid';
            if (container.querySelector('.simulations-list')) {
                container.querySelector('.simulations-list').style.display = 'none';
            }
        } else {
            // Otherwise, transform list to grid
            transformToGrid(container, '.simulations-grid');
        }
    } else if (viewType === 'list') {
        // If list already exists, just show it
        if (container.querySelector('.simulations-list')) {
            container.querySelector('.simulations-list').style.display = 'flex';
            if (container.querySelector('.simulations-grid')) {
                container.querySelector('.simulations-grid').style.display = 'none';
            }
        } else {
            // Otherwise, transform grid to list
            transformToList(container, '.simulations-grid');
        }
    }
}

// Toggle Favorites View (Grid/List)
function toggleFavoritesView(viewType) {
    const container = document.querySelector('.favorites-container');
    
    if (viewType === 'grid') {
        // If grid already exists, just show it
        if (container.querySelector('.favorites-grid')) {
            container.querySelector('.favorites-grid').style.display = 'grid';
            if (container.querySelector('.favorites-list')) {
                container.querySelector('.favorites-list').style.display = 'none';
            }
        } else {
            // Otherwise, transform list to grid
            transformToGrid(container, '.favorites-grid');
        }
    } else if (viewType === 'list') {
        // If list already exists, just show it
        if (container.querySelector('.favorites-list')) {
            container.querySelector('.favorites-list').style.display = 'flex';
            if (container.querySelector('.favorites-grid')) {
                container.querySelector('.favorites-grid').style.display = 'none';
            }
        } else {
            // Otherwise, transform grid to list
            transformToList(container, '.favorites-grid');
        }
    }
}

// Transform Grid to List View
function transformToList(container, gridSelector) {
    const grid = container.querySelector(gridSelector);
    
    if (!grid) return;
    
    // Create list container
    const list = document.createElement('div');
    list.className = gridSelector.replace('grid', 'list');
    list.style.display = 'flex';
    
    // For each card in the grid, create a list item
    const cards = grid.querySelectorAll('.simulation-card');
    cards.forEach(card => {
        // Extract data from card
        const title = card.querySelector('.card-title').textContent;
        const thumbnailStyle = card.querySelector('.preview-thumbnail').getAttribute('style');
        const isPublic = card.querySelector('.privacy-badge.public') !== null;
        const isPrivate = card.querySelector('.privacy-badge.private') !== null;
        const isUnlisted = card.querySelector('.privacy-badge.unlisted') !== null;
        
        let privacyClass = '';
        let privacyIcon = '';
        
        if (isPublic) {
            privacyClass = 'public';
            privacyIcon = 'globe';
        } else if (isPrivate) {
            privacyClass = 'private';
            privacyIcon = 'lock';
        } else if (isUnlisted) {
            privacyClass = 'unlisted';
            privacyIcon = 'link';
        }
        
        const dateText = card.querySelector('.date')?.textContent || '';
        const creatorText = card.querySelector('.creator')?.textContent || '';
        
        // Create stats HTML
        const statsHtml = Array.from(card.querySelectorAll('.stats span')).map(span => span.outerHTML).join('');
        
        // Create list item HTML
        list.innerHTML += `
            <div class="list-item">
                <div class="list-item-thumbnail">
                    <div class="preview-thumbnail" ${thumbnailStyle}></div>
                    <div class="preview-overlay">
                        <div class="preview-actions">
                            <button class="preview-btn"><i class="fas fa-play"></i></button>
                            <button class="edit-btn"><i class="fas fa-edit"></i></button>
                            <button class="more-btn"><i class="fas fa-ellipsis-h"></i></button>
                        </div>
                    </div>
                    ${privacyClass ? `<div class="privacy-badge ${privacyClass}">
                        <i class="fas fa-${privacyIcon}"></i>
                    </div>` : ''}
                </div>
                <div class="list-item-details">
                    <div class="list-item-header">
                        <h3 class="card-title">${title}</h3>
                        <span class="date">${dateText}</span>
                    </div>
                    <p class="list-item-description">A physics simulation demonstrating gravitational attraction and orbital mechanics.</p>
                    <div class="list-item-footer">
                        <div class="list-item-meta">
                            ${creatorText ? `<span class="creator">${creatorText}</span>` : ''}
                            <div class="stats">
                                ${statsHtml}
                            </div>
                        </div>
                        <div class="list-item-actions">
                            <button class="card-btn run-btn"><i class="fas fa-play"></i> Run</button>
                            <button class="card-btn edit-btn"><i class="fas fa-edit"></i> Edit</button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    });
    
    // Hide grid and append list
    grid.style.display = 'none';
    container.appendChild(list);
    
    // Init new buttons in list view
    initSimulationActions();
}

// Transform List to Grid View
function transformToGrid(container, listSelector) {
    // This function would convert list items back to grid cards if needed
    // For demo purposes, we'll just hide the list and show the grid if it exists
    
    const list = container.querySelector(listSelector.replace('grid', 'list'));
    const grid = container.querySelector(listSelector);
    
    if (list) {
        list.style.display = 'none';
    }
    
    if (grid) {
        grid.style.display = 'grid';
    }
}

// More Options Dropdown
function initMoreOptions() {
    const moreButtons = document.querySelectorAll('.more-btn');
    const dropdown = document.querySelector('.more-options-dropdown');
    
    moreButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.stopPropagation();
            
            // Position dropdown near the clicked button
            const rect = this.getBoundingClientRect();
            dropdown.style.top = (rect.bottom + window.scrollY + 5) + 'px';
            dropdown.style.left = (rect.left + window.scrollX - 150) + 'px'; // Align right side of dropdown
            
            // Show dropdown
            dropdown.classList.add('active');
            
            // Store reference to the clicked card for later use
            dropdown.dataset.targetCard = this.closest('.simulation-card')?.dataset.id || 
                                        this.closest('.list-item')?.dataset.id || '';
        });
    });
    
    // Close dropdown when clicking anywhere else
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.more-options-dropdown') && !e.target.closest('.more-btn')) {
            dropdown.classList.remove('active');
        }
    });
    
    // Dropdown button actions
    const renameBtn = dropdown.querySelector('.rename-btn');
    const duplicateBtn = dropdown.querySelector('.duplicate-btn');
    const downloadBtn = dropdown.querySelector('.download-btn');
    const shareBtn = dropdown.querySelector('.share-btn');
    const archiveBtn = dropdown.querySelector('.archive-btn');
    const deleteBtn = dropdown.querySelector('.delete-btn');
    
    renameBtn?.addEventListener('click', function() {
        dropdown.classList.remove('active');
        handleRename();
    });
    
    duplicateBtn?.addEventListener('click', function() {
        dropdown.classList.remove('active');
        handleDuplicate();
    });
    
    downloadBtn?.addEventListener('click', function() {
        dropdown.classList.remove('active');
        handleDownload();
    });
    
    shareBtn?.addEventListener('click', function() {
        dropdown.classList.remove('active');
        handleShare();
    });
    
    archiveBtn?.addEventListener('click', function() {
        dropdown.classList.remove('active');
        handleArchive();
    });
    
    deleteBtn?.addEventListener('click', function() {
        dropdown.classList.remove('active');
        handleDelete();
    });
}

// Handle dropdown actions (simplified for demo)
function handleRename() {
    const newName = prompt('Enter new name for this simulation:');
    if (newName && newName.trim() !== '') {
        showNotification('Simulation renamed to: ' + newName);
    }
}

function handleDuplicate() {
    showNotification('Simulation duplicated! Redirecting to editor...');
}

function handleDownload() {
    showNotification('Preparing download...');
    setTimeout(() => {
        showNotification('Download complete!');
    }, 1500);
}

function handleShare() {
    const shareUrl = 'https://ballsim.com/s/' + Math.random().toString(36).substring(2, 8);
    navigator.clipboard.writeText(shareUrl).then(() => {
        showNotification('Share link copied to clipboard!');
    }).catch(() => {
        showNotification('Failed to copy link. URL: ' + shareUrl);
    });
}

function handleArchive() {
    if (confirm('Are you sure you want to archive this simulation?')) {
        showNotification('Simulation archived');
    }
}

function handleDelete() {
    if (confirm('Are you sure you want to delete this simulation? This action cannot be undone.')) {
        showNotification('Simulation deleted', 'error');
    }
}

// Show notification
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = 'notification ' + type;
    notification.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
        <span>${message}</span>
    `;
    
    notification.style.position = 'fixed';
    notification.style.bottom = '20px';
    notification.style.right = '20px';
    notification.style.backgroundColor = type === 'success' ? '#4caf50' : '#f44336';
    notification.style.color = 'white';
    notification.style.padding = '10px 20px';
    notification.style.borderRadius = '4px';
    notification.style.boxShadow = '0 2px 10px rgba(0,0,0,0.2)';
    notification.style.zIndex = '1000';
    notification.style.display = 'flex';
    notification.style.alignItems = 'center';
    notification.style.gap = '10px';
    notification.style.transform = 'translateY(100px)';
    notification.style.opacity = '0';
    notification.style.transition = 'all 0.3s ease';
    
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

// Edit Profile Modal
function initEditProfile() {
    const editProfileBtn = document.querySelector('.edit-profile-btn');
    const modalOverlay = document.querySelector('.modal-overlay');
    const modal = document.querySelector('.profile-edit-modal');
    const closeModalBtn = modal?.querySelector('.close-modal');
    const cancelBtn = modal?.querySelector('.cancel-btn');
    const saveBtn = modal?.querySelector('.form-actions .save-btn');
    
    // Open modal
    editProfileBtn?.addEventListener('click', function() {
        modalOverlay.classList.add('active');
    });
    
    // Close modal functions
    const closeModal = () => {
        modalOverlay.classList.remove('active');
    };
    
    closeModalBtn?.addEventListener('click', closeModal);
    cancelBtn?.addEventListener('click', closeModal);
    
    // Close when clicking outside the modal
    modalOverlay?.addEventListener('click', function(e) {
        if (e.target === modalOverlay) {
            closeModal();
        }
    });
    
    // Save profile changes
    saveBtn?.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Get form values
        const form = this.closest('form');
        const username = form.querySelector('#username').value;
        const bio = form.querySelector('#bio').value;
        
        // Simple validation
        if (!username || username.trim() === '') {
            alert('Username cannot be empty');
            return;
        }
        
        // Update profile (in a real app, this would be an API call)
        document.querySelector('.profile-name').textContent = username;
        document.querySelector('.profile-bio p').textContent = bio;
        
        // Show success message and close modal
        showNotification('Profile updated successfully');
        closeModal();
    });
    
    // Character counter for bio
    const bioTextarea = document.querySelector('#bio');
    const charCounter = document.querySelector('.character-count');
    
    if (bioTextarea && charCounter) {
        bioTextarea.addEventListener('input', function() {
            const maxLength = 150;
            const currentLength = this.value.length;
            charCounter.textContent = `${currentLength}/${maxLength}`;
            
            if (currentLength > maxLength) {
                charCounter.style.color = '#f44336';
            } else {
                charCounter.style.color = '';
            }
        });
    }
    
    // Social links management
    const addSocialLinkBtn = document.querySelector('.add-social-link-btn');
    const socialLinksEditor = document.querySelector('.social-links-editor');
    
    addSocialLinkBtn?.addEventListener('click', function() {
        const socialTypes = [
            { name: 'youtube', icon: 'youtube', color: '#ff0000' },
            { name: 'twitter', icon: 'twitter', color: '#1da1f2' },
            { name: 'instagram', icon: 'instagram', color: '' },
            { name: 'tiktok', icon: 'tiktok', color: 'black' },
            { name: 'facebook', icon: 'facebook', color: '#1877f2' },
            { name: 'twitch', icon: 'twitch', color: '#9146ff' }
        ];
        
        // Use one that's not already in the form
        const existingTypes = Array.from(socialLinksEditor.querySelectorAll('.social-link-field')).map(
            field => field.querySelector('.social-icon').classList[1]
        );
        
        const availableTypes = socialTypes.filter(type => !existingTypes.includes(type.name));
        
        if (availableTypes.length === 0) {
            showNotification('Maximum number of social links reached', 'error');
            return;
        }
        
        const newType = availableTypes[0];
        
        const newField = document.createElement('div');
        newField.className = 'social-link-field';
        newField.innerHTML = `
            <div class="social-icon ${newType.name}" style="${newType.color ? 'background-color: ' + newType.color : ''}">
                <i class="fab fa-${newType.icon}"></i>
            </div>
            <input type="text" placeholder="${newType.name.charAt(0).toUpperCase() + newType.name.slice(1)} profile URL">
            <button class="remove-link-btn"><i class="fas fa-times"></i></button>
        `;
        
        // Insert before the add button
        socialLinksEditor.insertBefore(newField, this);
        
        // Init remove button
        newField.querySelector('.remove-link-btn').addEventListener('click', function() {
            newField.remove();
        });
    });
    
    // Init existing remove buttons
    document.querySelectorAll('.remove-link-btn').forEach(button => {
        button.addEventListener('click', function() {
            this.closest('.social-link-field').remove();
        });
    });
}

// Load More Button Functionality
function initLoadMore() {
    const loadMoreButtons = document.querySelectorAll('.load-more-btn');
    
    loadMoreButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Show loading state
            this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Loading...';
            this.disabled = true;
            
            // Simulate loading delay
            setTimeout(() => {
                // Reset button
                this.innerHTML = 'Load More';
                this.disabled = false;
                
                // Show notification that there's no more content
                this.parentElement.insertAdjacentHTML('beforeend', `
                    <div style="text-align: center; margin-top: 20px; color: var(--neutral-600);">
                        No more items to display
                    </div>
                `);
                
                // Hide the button
                this.style.display = 'none';
            }, 1500);
        });
    });
}

// Social Links Interaction
function initSocialLinks() {
    const addLinkBtn = document.querySelector('.add-link-btn');
    
    addLinkBtn?.addEventListener('click', function() {
        // Sample social media links
        const socialMedia = [
            { name: 'Discord', icon: 'discord' },
            { name: 'Twitch', icon: 'twitch' },
            { name: 'Facebook', icon: 'facebook' },
            { name: 'GitHub', icon: 'github' }
        ];
        
        // Get all existing icons
        const existingIcons = Array.from(document.querySelectorAll('.social-link i')).map(
            icon => icon.className.replace('fab fa-', '')
        );
        
        // Find a social media option that's not already shown
        const availableOptions = socialMedia.filter(option => !existingIcons.includes(option.icon));
        
        if (availableOptions.length === 0) {
            showNotification('Maximum number of social links reached', 'error');
            return;
        }
        
        // Add a new social media link
        const newSocial = availableOptions[0];
        const newLink = document.createElement('a');
        newLink.href = '#';
        newLink.className = 'social-link';
        newLink.innerHTML = `<i class="fab fa-${newSocial.icon}"></i>`;
        
        // Insert before the add button
        this.parentNode.insertBefore(newLink, this);
        
        showNotification(`${newSocial.name} link added! Click to edit.`);
    });
}

// Achievement Interactions
function initAchievementInteractions() {
    // Achievement filter
    const achievementFilter = document.querySelector('.filter-select');
    
    achievementFilter?.addEventListener('change', function() {
        const filterValue = this.value;
        const achievements = document.querySelectorAll('.achievement-item');
        
        achievements.forEach(item => {
            switch (filterValue) {
                case 'all':
                    item.style.display = 'flex';
                    break;
                case 'unlocked':
                    item.style.display = item.classList.contains('unlocked') ? 'flex' : 'none';
                    break;
                case 'locked':
                    item.style.display = item.classList.contains('locked') ? 'flex' : 'none';
                    break;
                case 'progress':
                    item.style.display = item.classList.contains('in-progress') ? 'flex' : 'none';
                    break;
            }
        });
    });
}

// Simulation Actions
function initSimulationActions() {
    // Preview buttons
    const previewButtons = document.querySelectorAll('.preview-btn, .run-btn');
    
    previewButtons.forEach(button => {
        button.addEventListener('click', function() {
            // In a real app, this would open the simulation
            showNotification('Opening simulation in player...');
            
            // Redirect after a short delay
            setTimeout(() => {
                // Simulating navigation to a player page
                // window.location.href = 'player.html?id=123';
                console.log('Redirecting to player...');
            }, 1000);
        });
    });
    
    // Edit buttons
    const editButtons = document.querySelectorAll('.edit-btn, button.edit-btn');
    
    editButtons.forEach(button => {
        button.addEventListener('click', function() {
            // In a real app, this would open the simulation in the editor
            showNotification('Opening simulation in editor...');
            
            // Redirect after a short delay
            setTimeout(() => {
                // Simulating navigation to the creator page
                // window.location.href = 'creator.html?id=123';
                console.log('Redirecting to creator...');
            }, 1000);
        });
    });
    
    // Favorite buttons
    const favoriteButtons = document.querySelectorAll('.favorite-btn');
    
    favoriteButtons.forEach(button => {
        button.addEventListener('click', function() {
            this.classList.toggle('active');
            
            if (this.classList.contains('active')) {
                this.innerHTML = '<i class="fas fa-heart"></i>';
                showNotification('Added to favorites');
            } else {
                this.innerHTML = '<i class="far fa-heart"></i>';
                showNotification('Removed from favorites');
            }
        });
    });
    
    // Create New button
    const createNewBtn = document.querySelector('.create-new-btn');
    
    createNewBtn?.addEventListener('click', function() {
        showNotification('Creating new simulation...');
        
        // Redirect after a short delay
        setTimeout(() => {
            // Simulating navigation to the creator page
            // window.location.href = 'creator.html';
            console.log('Redirecting to creator...');
        }, 1000);
    });
}
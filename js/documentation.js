document.addEventListener('DOMContentLoaded', function() {
    // Initialize Documentation Page
    initTableOfContents();
    initSmoothScrolling();
    initBackToTop();
    initFeedbackForm();
    initSearch();
    highlightCurrentSection();
    initDocNavigationButtons();
});

// Table of Contents Functionality
function initTableOfContents() {
    const tocItems = document.querySelectorAll('.has-children > .toc-link');
    
    tocItems.forEach(item => {
        // Check if the section is active or has an active child
        const parent = item.parentElement;
        const hasActiveChild = parent.querySelector('.toc-sublink.active');
        const isActive = item.classList.contains('active');
        
        // If not active and no active children, collapse it
        if (!isActive && !hasActiveChild) {
            parent.classList.add('collapsed');
        }
        
        // Add click event to toggle
        item.addEventListener('click', function(e) {
            e.preventDefault();
            const parent = this.parentElement;
            parent.classList.toggle('collapsed');
            
            // If expanding, scroll to the link
            if (!parent.classList.contains('collapsed')) {
                setTimeout(() => {
                    // Scroll to target section
                    const targetId = this.getAttribute('href').substring(1);
                    const targetSection = document.getElementById(targetId);
                    if (targetSection) {
                        targetSection.scrollIntoView({
                            behavior: 'smooth'
                        });
                    }
                }, 100);
            }
        });
    });
    
    // Handle clicks on sublinks
    const tocSublinks = document.querySelectorAll('.toc-sublink');
    tocSublinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all links
            document.querySelectorAll('.toc-link, .toc-sublink').forEach(l => {
                l.classList.remove('active');
            });
            
            // Add active class to clicked link and its parent
            this.classList.add('active');
            const parentLink = this.closest('.has-children').querySelector('.toc-link');
            parentLink.classList.add('active');
            
            // Scroll to target section
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth'
                });
            }
            
            // Update URL hash
            history.pushState(null, null, '#' + targetId);
        });
    });
    
    // Handle clicks on main section links
    const tocLinks = document.querySelectorAll('.toc-link:not(.has-children > .toc-link)');
    tocLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all links
            document.querySelectorAll('.toc-link, .toc-sublink').forEach(l => {
                l.classList.remove('active');
            });
            
            // Add active class to clicked link
            this.classList.add('active');
            
            // Scroll to target section
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth'
                });
            }
            
            // Update URL hash
            history.pushState(null, null, '#' + targetId);
        });
    });
}

// Smooth Scrolling for All Internal Links
function initSmoothScrolling() {
    // Get all links that start with #
    const internalLinks = document.querySelectorAll('a[href^="#"]:not(.toc-link):not(.toc-sublink)');
    
    internalLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth'
                });
                
                // Update URL hash
                history.pushState(null, null, '#' + targetId);
                
                // Update active state in the TOC
                updateActiveTOCLink(targetId);
            }
        });
    });
}

// Update Active TOC Link Based on ID
function updateActiveTOCLink(id) {
    // Remove active class from all links
    document.querySelectorAll('.toc-link, .toc-sublink').forEach(l => {
        l.classList.remove('active');
    });
    
    // Find and activate the corresponding TOC link
    const tocLink = document.querySelector(`.toc-link[href="#${id}"]`);
    const tocSublink = document.querySelector(`.toc-sublink[href="#${id}"]`);
    
    if (tocLink) {
        tocLink.classList.add('active');
        
        // Expand parent if it's collapsed
        const parent = tocLink.closest('.has-children');
        if (parent) {
            parent.classList.remove('collapsed');
        }
    }
    
    if (tocSublink) {
        tocSublink.classList.add('active');
        
        // Activate parent link and ensure it's expanded
        const parentItem = tocSublink.closest('.has-children');
        if (parentItem) {
            parentItem.classList.remove('collapsed');
            const parentLink = parentItem.querySelector('.toc-link');
            if (parentLink) {
                parentLink.classList.add('active');
            }
        }
    }
}

// Back to Top Button
function initBackToTop() {
    const backToTopButton = document.querySelector('.back-to-top');
    
    if (!backToTopButton) return;
    
    // Show/hide button based on scroll position
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            backToTopButton.classList.add('visible');
        } else {
            backToTopButton.classList.remove('visible');
        }
    });
    
    // Scroll to top when clicked
    backToTopButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Feedback Form
function initFeedbackForm() {
    const feedbackButtons = document.querySelectorAll('.feedback-btn');
    const feedbackForm = document.querySelector('.feedback-form');
    const sendFeedbackBtn = document.querySelector('.send-feedback-btn');
    
    if (!feedbackButtons.length || !feedbackForm) return;
    
    feedbackButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Hide buttons, show form
            document.querySelector('.feedback-buttons').style.display = 'none';
            feedbackForm.style.display = 'block';
            
            // Focus on textarea
            feedbackForm.querySelector('textarea').focus();
            
            // Store selection (yes/no)
            feedbackForm.dataset.feedback = this.classList.contains('yes') ? 'positive' : 'negative';
        });
    });
    
    // Handle form submission
    if (sendFeedbackBtn) {
        sendFeedbackBtn.addEventListener('click', function() {
            const textarea = feedbackForm.querySelector('textarea');
            const feedbackType = feedbackForm.dataset.feedback;
            const message = textarea.value.trim();
            
            if (message) {
                // In a real app, this would send the feedback to a server
                console.log('Feedback sent:', {
                    type: feedbackType,
                    message: message,
                    page: window.location.pathname + window.location.hash
                });
                
                // Show success message
                feedbackForm.innerHTML = `
                    <div style="text-align: center; color: #4caf50;">
                        <i class="fas fa-check-circle" style="font-size: 2rem; margin-bottom: 10px;"></i>
                        <p>Thank you for your feedback!</p>
                    </div>
                `;
            } else {
                // Highlight the empty textarea
                textarea.style.borderColor = '#f44336';
                textarea.setAttribute('placeholder', 'Please enter your feedback');
                
                // Reset after delay
                setTimeout(() => {
                    textarea.style.borderColor = '';
                    textarea.setAttribute('placeholder', 'Tell us how we can improve this page');
                }, 2000);
            }
        });
    }
}

// Search Functionality
function initSearch() {
    const searchInputs = document.querySelectorAll('.docs-search-input');
    
    searchInputs.forEach(input => {
        // Create search results container if it doesn't exist
        let searchResults = input.parentElement.querySelector('.search-results');
        if (!searchResults) {
            searchResults = document.createElement('div');
            searchResults.className = 'search-results';
            input.parentElement.appendChild(searchResults);
        }
        
        // Search as you type
        input.addEventListener('input', function() {
            const query = this.value.trim();
            if (query.length < 2) {
                searchResults.classList.remove('active');
                return;
            }
            
            // Perform search
            const results = performSearch(query);
            
            // Display results
            if (results.length > 0) {
                displaySearchResults(results, searchResults);
                searchResults.classList.add('active');
            } else {
                searchResults.innerHTML = `
                    <div class="search-result-item">
                        <p>No results found for "${query}"</p>
                    </div>
                `;
                searchResults.classList.add('active');
            }
        });
        
        // Hide results when clicking outside
        document.addEventListener('click', function(e) {
            if (!input.contains(e.target) && !searchResults.contains(e.target)) {
                searchResults.classList.remove('active');
            }
        });
        
        // Handle keyboard navigation
        input.addEventListener('keydown', function(e) {
            if (!searchResults.classList.contains('active')) return;
            
            const items = searchResults.querySelectorAll('.search-result-item');
            const activeItem = searchResults.querySelector('.search-result-item.active');
            
            if (e.key === 'ArrowDown') {
                e.preventDefault();
                if (!activeItem) {
                    items[0].classList.add('active');
                } else {
                    const index = Array.from(items).indexOf(activeItem);
                    activeItem.classList.remove('active');
                    const nextIndex = (index + 1) % items.length;
                    items[nextIndex].classList.add('active');
                }
            } else if (e.key === 'ArrowUp') {
                e.preventDefault();
                if (!activeItem) {
                    items[items.length - 1].classList.add('active');
                } else {
                    const index = Array.from(items).indexOf(activeItem);
                    activeItem.classList.remove('active');
                    const prevIndex = (index - 1 + items.length) % items.length;
                    items[prevIndex].classList.add('active');
                }
            } else if (e.key === 'Enter') {
                e.preventDefault();
                if (activeItem) {
                    activeItem.click();
                }
            } else if (e.key === 'Escape') {
                searchResults.classList.remove('active');
            }
        });
    });
    
    // Also init the nav search
    const navSearch = document.getElementById('docs-search');
    if (navSearch) {
        navSearch.addEventListener('focus', function() {
            // Redirect focus to the main search input
            const mainSearch = document.querySelector('.docs-search-input');
            mainSearch.focus();
            
            // Scroll to it if needed
            mainSearch.scrollIntoView({
                behavior: 'smooth',
                block: 'center'
            });
        });
    }
}

// Perform Search (simulated)
function performSearch(query) {
    // In a real app, this would search through actual documentation content
    // For this demo, we'll use some sample results
    const sampleContent = [
        {
            title: 'Overview',
            path: '#overview',
            content: 'BallSim is a physics simulation platform that allows you to create, share, and explore interactive ball physics simulations.'
        },
        {
            title: 'Getting Started',
            path: '#getting-started',
            content: 'Welcome to BallSim! This section will help you get started with creating your first physics simulation.'
        },
        {
            title: 'Basic Concepts',
            path: '#basic-concepts',
            content: 'Before diving into creating simulations, it\'s helpful to understand some basic concepts used in BallSim.'
        },
        {
            title: 'Your First Simulation',
            path: '#first-simulation',
            content: 'Let\'s create a simple bouncing ball simulation using the Code Editor.'
        },
        {
            title: 'API Reference',
            path: '#api',
            content: 'The BallSim API provides a comprehensive set of classes and methods for creating and controlling physics simulations.'
        },
        {
            title: 'Simulation Class',
            path: '#simulation-class',
            content: 'The Simulation class is the main entry point for creating and managing simulations.'
        },
        {
            title: 'Physics Engine',
            path: '#physics-engine',
            content: 'The physics engine handles all calculations related to object movement, collisions, and forces.'
        },
        {
            title: 'Object Types',
            path: '#objects',
            content: 'BallSim provides several object types that can be used in your simulations.'
        },
        {
            title: 'Ball Object',
            path: '#ball-object',
            content: 'The Ball is the most basic physics object in BallSim, representing a circular body with physical properties.'
        },
        {
            title: 'Container Object',
            path: '#container-object',
            content: 'Containers define boundaries for your simulation, such as walls or enclosures.'
        }
    ];
    
    // Filter results based on query
    return sampleContent.filter(item => {
        const lowerQuery = query.toLowerCase();
        return (
            item.title.toLowerCase().includes(lowerQuery) ||
            item.content.toLowerCase().includes(lowerQuery)
        );
    }).map(item => {
        // Highlight matching text
        const title = highlightText(item.title, query);
        const snippet = highlightText(getSnippet(item.content, query), query);
        
        return {
            title: title,
            path: item.path,
            snippet: snippet
        };
    });
}

// Highlight search term in text
function highlightText(text, query) {
    if (!query) return text;
    
    const regex = new RegExp(`(${escapeRegExp(query)})`, 'gi');
    return text.replace(regex, '<span class="search-highlight">$1</span>');
}

// Escape special regex characters
function escapeRegExp(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

// Get text snippet around the search term
function getSnippet(text, query) {
    const lowerText = text.toLowerCase();
    const lowerQuery = query.toLowerCase();
    
    const index = lowerText.indexOf(lowerQuery);
    if (index === -1) return text.substring(0, 100) + '...';
    
    // Get some context around the match
    const start = Math.max(0, index - 30);
    const end = Math.min(text.length, index + query.length + 30);
    
    // Add ellipsis if needed
    const prefix = start > 0 ? '...' : '';
    const suffix = end < text.length ? '...' : '';
    
    return prefix + text.substring(start, end) + suffix;
}

// Display Search Results
function displaySearchResults(results, container) {
    container.innerHTML = '';
    
    results.forEach(result => {
        const item = document.createElement('div');
        item.className = 'search-result-item';
        item.innerHTML = `
            <div class="search-result-title">${result.title}</div>
            <div class="search-result-path">${result.path}</div>
            <div class="search-result-snippet">${result.snippet}</div>
        `;
        
        // Navigate to section when clicked
        item.addEventListener('click', function() {
            const targetId = result.path.substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                // Close search results
                container.classList.remove('active');
                
                // Clear search input
                container.previousElementSibling.value = '';
                
                // Scroll to section
                targetSection.scrollIntoView({
                    behavior: 'smooth'
                });
                
                // Update URL hash
                history.pushState(null, null, result.path);
                
                // Update active state in the TOC
                updateActiveTOCLink(targetId);
                
                // Highlight the section temporarily
                targetSection.style.backgroundColor = 'rgba(76, 132, 255, 0.1)';
                setTimeout(() => {
                    targetSection.style.backgroundColor = '';
                }, 2000);
            }
        });
        
        container.appendChild(item);
    });
}

// Highlight Current Section Based on Scroll Position
function highlightCurrentSection() {
    // Check if there's a hash in the URL on page load
    if (window.location.hash) {
        const targetId = window.location.hash.substring(1);
        updateActiveTOCLink(targetId);
        
        // Scroll to the target section after a slight delay
        setTimeout(() => {
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                targetSection.scrollIntoView();
            }
        }, 100);
    }
    
    // Update active section based on scroll position
    const sections = document.querySelectorAll('.doc-section, .doc-subsection');
    const tocLinks = document.querySelectorAll('.toc-link, .toc-sublink');
    
    // Throttle the scroll event
    let scrollTimeout;
    window.addEventListener('scroll', function() {
        if (scrollTimeout) {
            clearTimeout(scrollTimeout);
        }
        
        scrollTimeout = setTimeout(() => {
            // Get current scroll position
            const scrollPosition = window.scrollY + 100; // Add offset
            
            // Find the current section
            let currentSection = null;
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.offsetHeight;
                
                if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                    currentSection = section.id;
                }
            });
            
            // Update active link if we found a current section
            if (currentSection && !window.location.hash.includes(currentSection)) {
                // Only update if not due to clicking a link (prevents jumpy behavior)
                updateActiveTOCLink(currentSection);
                
                // Update URL hash without scrolling
                history.replaceState(null, null, '#' + currentSection);
            }
        }, 100);
    });
}

// Documentation Navigation Buttons
function initDocNavigationButtons() {
    const prevButton = document.querySelector('.doc-nav-button.prev');
    const nextButton = document.querySelector('.doc-nav-button.next');
    
    if (!prevButton || !nextButton) return;
    
    // Update buttons based on current section
    function updateNavButtons() {
        const currentSectionId = window.location.hash.substring(1) || 'overview';
        
        // Find all section IDs in order
        const sectionIds = Array.from(document.querySelectorAll('.doc-section, .doc-subsection'))
            .map(section => section.id)
            .filter(id => id); // Filter out empty IDs
        
        // Find current section index
        const currentIndex = sectionIds.indexOf(currentSectionId);
        
        // Update previous button
        if (currentIndex > 0) {
            const prevId = sectionIds[currentIndex - 1];
            const prevSection = document.getElementById(prevId);
            prevButton.href = '#' + prevId;
            prevButton.querySelector('span').textContent = prevSection.querySelector('h2, h3').textContent;
            prevButton.style.visibility = 'visible';
        } else {
            prevButton.style.visibility = 'hidden';
        }
        
        // Update next button
        if (currentIndex < sectionIds.length - 1) {
            const nextId = sectionIds[currentIndex + 1];
            const nextSection = document.getElementById(nextId);
            nextButton.href = '#' + nextId;
            nextButton.querySelector('span').textContent = nextSection.querySelector('h2, h3').textContent;
            nextButton.style.visibility = 'visible';
        } else {
            nextButton.style.visibility = 'hidden';
        }
    }
    
    // Update buttons on page load
    updateNavButtons();
    
    // Update buttons when hash changes
    window.addEventListener('hashchange', updateNavButtons);
    
    // Add click listeners
    prevButton.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        const targetSection = document.getElementById(targetId);
        
        if (targetSection) {
            targetSection.scrollIntoView({
                behavior: 'smooth'
            });
            
            // Update URL hash
            history.pushState(null, null, '#' + targetId);
            
            // Update active state in the TOC
            updateActiveTOCLink(targetId);
            
            // Update nav buttons
            updateNavButtons();
        }
    });
    
    nextButton.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        const targetSection = document.getElementById(targetId);
        
        if (targetSection) {
            targetSection.scrollIntoView({
                behavior: 'smooth'
            });
            
            // Update URL hash
            history.pushState(null, null, '#' + targetId);
            
            // Update active state in the TOC
            updateActiveTOCLink(targetId);
            
            // Update nav buttons
            updateNavButtons();
        }
    });
}
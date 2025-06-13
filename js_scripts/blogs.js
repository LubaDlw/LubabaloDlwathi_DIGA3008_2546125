// Enhanced blog navigation with previous/next functionality
document.addEventListener('DOMContentLoaded', function() {
    let allTabs = [];
    let currentTabIndex = 0;
    
    // Initialize tabs array and current index
    function initializeTabs() {
        allTabs = Array.from(document.querySelectorAll('.tab'));
        const activeTab = document.querySelector('.tab.active');
        if (activeTab) {
            currentTabIndex = allTabs.indexOf(activeTab);
        }
    }
    
    // Update navigation buttons based on current position
    function updateNavigationButtons() {
        const prevBtn = document.querySelector('.nav-btn.prev');
        const nextBtn = document.querySelector('.nav-btn.next');
        const navInfo = document.querySelector('.nav-info');
        
        if (prevBtn && nextBtn && navInfo) {
            // Update button states
            prevBtn.disabled = currentTabIndex === 0;
            nextBtn.disabled = currentTabIndex === allTabs.length - 1;
            
            // Update navigation info
            navInfo.textContent = `Blog ${currentTabIndex + 1} of ${allTabs.length}`;
            
            // Update button text with blog titles if available
            if (currentTabIndex > 0) {
                const prevTab = allTabs[currentTabIndex - 1];
                prevBtn.title = `Previous: ${prevTab.textContent}`;
            }
            
            if (currentTabIndex < allTabs.length - 1) {
                const nextTab = allTabs[currentTabIndex + 1];
                nextBtn.title = `Next: ${nextTab.textContent}`;
            }
        }
    }
    
    // Navigate to specific tab by index
    function navigateToTab(index) {
        if (index >= 0 && index < allTabs.length) {
            allTabs[index].click();
            currentTabIndex = index;
            updateNavigationButtons();
            
            // Smooth scroll to top of blog content
            const blogContent = document.querySelector('.blog-content.active');
            if (blogContent) {
                blogContent.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }
    }
    
    // Event delegation: Single click listener on document handles all interactions
    document.addEventListener('click', function(e) {
        // Handle tab clicks
        if (e.target.matches('.tab')) {
            const targetSection = e.target.getAttribute('data-section');
            
            if (!targetSection) return;
            
            // Remove active class from all tabs 
            document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
            document.querySelectorAll('.blog-content').forEach(c => c.classList.remove('active'));
            
            // Add active class to clicked tab and corresponding content
            e.target.classList.add('active');
            const targetContent = document.querySelector(`[data-content="${targetSection}"]`);
            if (targetContent) {
                targetContent.classList.add('active');
            }
            
            // Update current index and navigation
            currentTabIndex = allTabs.indexOf(e.target);
            updateNavigationButtons();
        }
        
        // Handle navigation button clicks
        if (e.target.matches('.nav-btn.prev')) {
            e.preventDefault();
            if (currentTabIndex > 0) {
                navigateToTab(currentTabIndex - 1);
            }
        }
        
        if (e.target.matches('.nav-btn.next')) {
            e.preventDefault();
            if (currentTabIndex < allTabs.length - 1) {
                navigateToTab(currentTabIndex + 1);
            }
        }
        
        if (e.target.matches('.nav-btn.view-all')) {
            e.preventDefault();
            // Scroll to blog tabs section
            const blogTabs = document.querySelector('.blog-tabs');
            if (blogTabs) {
                blogTabs.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }
    });
    
    // Handle keyboard navigation
    document.addEventListener('keydown', function(e) {
        // Only handle navigation when focus is on the page (not in form inputs)
        if (document.activeElement.tagName.toLowerCase() === 'input' || 
            document.activeElement.tagName.toLowerCase() === 'textarea') {
            return;
        }
        
        if (e.key === 'ArrowLeft' && currentTabIndex > 0) {
            e.preventDefault();
            navigateToTab(currentTabIndex - 1);
        } else if (e.key === 'ArrowRight' && currentTabIndex < allTabs.length - 1) {
            e.preventDefault();
            navigateToTab(currentTabIndex + 1);
        }
    });
    
    // Initialize first tab as active if no tab is active
    const firstTab = document.querySelector('.tab');
    if (firstTab && !document.querySelector('.tab.active')) {
        firstTab.click();
    }
    
    // Initialize navigation after a short delay to ensure DOM is ready
    setTimeout(() => {
        initializeTabs();
        updateNavigationButtons();
    }, 100);
});
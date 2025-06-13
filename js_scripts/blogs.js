// Enhanced blog navigation with previous/next functionality - DEBUG VERSION
console.log("🚀 Blog navigation script starting to load...");

document.addEventListener('DOMContentLoaded', function() {
    console.log("✅ DOM Content Loaded - Starting blog navigation initialization");
    
    let allTabs = [];
    let currentTabIndex = 0;
    
    // Initialize tabs array and current index
    function initializeTabs() {
        console.log("🔄 Initializing tabs...");
        allTabs = Array.from(document.querySelectorAll('.tab'));
        console.log(`📊 Found ${allTabs.length} tabs:`, allTabs.map(tab => tab.textContent));
        
        const activeTab = document.querySelector('.tab.active');
        if (activeTab) {
            currentTabIndex = allTabs.indexOf(activeTab);
            console.log(`🎯 Active tab found at index: ${currentTabIndex}`);
        } else {
            console.log("⚠️ No active tab found");
        }
    }
    
    // Update navigation buttons based on current position
    function updateNavigationButtons() {
        console.log("🔄 Updating navigation buttons...");
        const prevBtn = document.querySelector('.nav-btn.prev');
        const nextBtn = document.querySelector('.nav-btn.next');
        const navInfo = document.querySelector('.nav-info');
        
        console.log("🔍 Navigation elements found:", {
            prevBtn: !!prevBtn,
            nextBtn: !!nextBtn,
            navInfo: !!navInfo
        });
        
        if (prevBtn && nextBtn && navInfo) {
            // Update button states
            prevBtn.disabled = currentTabIndex === 0;
            nextBtn.disabled = currentTabIndex === allTabs.length - 1;
            
            console.log(`🎛️ Button states - Prev disabled: ${prevBtn.disabled}, Next disabled: ${nextBtn.disabled}`);
            
            // Update navigation info
            navInfo.textContent = `Blog ${currentTabIndex + 1} of ${allTabs.length}`;
            console.log(`📍 Navigation info updated: ${navInfo.textContent}`);
            
            // Update button text with blog titles if available
            if (currentTabIndex > 0) {
                const prevTab = allTabs[currentTabIndex - 1];
                prevBtn.title = `Previous: ${prevTab.textContent}`;
            }
            
            if (currentTabIndex < allTabs.length - 1) {
                const nextTab = allTabs[currentTabIndex + 1];
                nextBtn.title = `Next: ${nextTab.textContent}`;
            }
        } else {
            console.error("❌ Navigation elements not found! Make sure you have added the navigation HTML to your blog content.");
        }
    }
    
    // Navigate to specific tab by index
    function navigateToTab(index) {
        console.log(`🧭 Navigating to tab index: ${index}`);
        if (index >= 0 && index < allTabs.length) {
            allTabs[index].click();
            currentTabIndex = index;
            updateNavigationButtons();
            
            // Smooth scroll to top of blog content
            const blogContent = document.querySelector('.blog-content.active');
            if (blogContent) {
                blogContent.scrollIntoView({ behavior: 'smooth', block: 'start' });
                console.log("📜 Scrolled to active blog content");
            }
        } else {
            console.warn(`⚠️ Invalid tab index: ${index}. Valid range: 0-${allTabs.length - 1}`);
        }
    }
    
    // Event delegation: Single click listener on document handles all interactions
    document.addEventListener('click', function(e) {
        console.log("🖱️ Click detected on:", e.target);
        
        // Handle tab clicks
        if (e.target.matches('.tab')) {
            console.log("📑 Tab clicked:", e.target.textContent);
            const targetSection = e.target.getAttribute('data-section');
            
            if (!targetSection) {
                console.warn("⚠️ Tab missing data-section attribute");
                return;
            }
            
            // Remove active class from all tabs 
            document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
            document.querySelectorAll('.blog-content').forEach(c => c.classList.remove('active'));
            
            // Add active class to clicked tab and corresponding content
            e.target.classList.add('active');
            const targetContent = document.querySelector(`[data-content="${targetSection}"]`);
            if (targetContent) {
                targetContent.classList.add('active');
                console.log(`✅ Activated content section: ${targetSection}`);
            } else {
                console.error(`❌ Content section not found: ${targetSection}`);
            }
            
            // Update current index and navigation
            currentTabIndex = allTabs.indexOf(e.target);
            console.log(`🎯 Current tab index updated to: ${currentTabIndex}`);
            updateNavigationButtons();
        }
        
        // Handle navigation button clicks
        if (e.target.matches('.nav-btn.prev')) {
            console.log("⬅️ Previous button clicked");
            e.preventDefault();
            if (currentTabIndex > 0) {
                navigateToTab(currentTabIndex - 1);
            } else {
                console.log("⚠️ Already at first blog");
            }
        }
        
        if (e.target.matches('.nav-btn.next')) {
            console.log("➡️ Next button clicked");
            e.preventDefault();
            if (currentTabIndex < allTabs.length - 1) {
                navigateToTab(currentTabIndex + 1);
            } else {
                console.log("⚠️ Already at last blog");
            }
        }
        
        if (e.target.matches('.nav-btn.view-all')) {
            console.log("📋 View All button clicked");
            e.preventDefault();
            // Scroll to blog tabs section
            const blogTabs = document.querySelector('.blog-tabs');
            if (blogTabs) {
                blogTabs.scrollIntoView({ behavior: 'smooth', block: 'center' });
                console.log("📜 Scrolled to blog tabs");
            } else {
                console.error("❌ Blog tabs section not found");
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
            console.log("⌨️ Left arrow key pressed");
            e.preventDefault();
            navigateToTab(currentTabIndex - 1);
        } else if (e.key === 'ArrowRight' && currentTabIndex < allTabs.length - 1) {
            console.log("⌨️ Right arrow key pressed");
            e.preventDefault();
            navigateToTab(currentTabIndex + 1);
        }
    });
    
    // Initialize first tab as active if no tab is active
    const firstTab = document.querySelector('.tab');
    if (firstTab && !document.querySelector('.tab.active')) {
        console.log("🎬 No active tab found, clicking first tab");
        firstTab.click();
    }
    
    // Initialize navigation after a short delay to ensure DOM is ready
    setTimeout(() => {
        console.log("⏰ Initializing navigation after delay...");
        initializeTabs();
        updateNavigationButtons();
        console.log("✅ Blog navigation initialization complete!");
    }, 100);
});

console.log("📜 Blog navigation script loaded successfully!");
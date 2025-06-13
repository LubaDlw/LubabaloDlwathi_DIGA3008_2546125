// Enhanced blog navigation with previous/next functionality
console.log("Blog navigation script starting to load...");

document.addEventListener('DOMContentLoaded', function() {
    console.log("DOM Content Loaded - Starting blog navigation initialization");

    let allTabs = [];
    let currentTabIndex = 0;

    // Initialize tabs array and current index
    function initializeTabs() {
        console.log("Initializing tabs...");
        allTabs = Array.from(document.querySelectorAll('.tab'));
        console.log(`Found ${allTabs.length} tabs:`, allTabs.map(tab => tab.textContent));

        const activeTab = document.querySelector('.tab.active');
        if (activeTab) {
            currentTabIndex = allTabs.indexOf(activeTab);
            console.log(`Active tab found at index: ${currentTabIndex}`);
        } else {
            console.log("No active tab found");
        }
    }

    // Update navigation buttons based on current position
    function updateNavigationButtons() {
        console.log("Updating navigation buttons...");
        const prevBtn = document.querySelector('.nav-btn.prev');
        const nextBtn = document.querySelector('.nav-btn.next');
        const navInfo = document.querySelector('.nav-info');

        if (prevBtn && nextBtn && navInfo) {
            prevBtn.disabled = currentTabIndex === 0;
            nextBtn.disabled = currentTabIndex === allTabs.length - 1;

            navInfo.textContent = `Blog ${currentTabIndex + 1} of ${allTabs.length}`;

            if (currentTabIndex > 0) {
                const prevTab = allTabs[currentTabIndex - 1];
                prevBtn.title = `Previous: ${prevTab.textContent}`;
            }

            if (currentTabIndex < allTabs.length - 1) {
                const nextTab = allTabs[currentTabIndex + 1];
                nextBtn.title = `Next: ${nextTab.textContent}`;
            }
        } else {
            console.error("Navigation elements not found. Ensure navigation HTML is present.");
        }
    }

    // Navigate to specific tab by index
    function navigateToTab(index) {
        console.log(`Navigating to tab index: ${index}`);
        if (index >= 0 && index < allTabs.length) {
            allTabs[index].click();
            currentTabIndex = index;
            updateNavigationButtons();

            // Scroll to top of blog-tabs (navigation area)
            requestAnimationFrame(() => {
                const blogTabs = document.querySelector('.blog-tabs');
                if (blogTabs) {
                    blogTabs.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    console.log("Scrolled to blog tabs (top navigation)");
                } else {
                    console.warn("Blog tabs section not found for scrolling");
                }
            });
        } else {
            console.warn(`Invalid tab index: ${index}`);
        }
    }

    // Handle all click interactions
    document.addEventListener('click', function(e) {
        const target = e.target;
        console.log("Click detected on:", target);

        // Tab click
        if (target.matches('.tab')) {
            const targetSection = target.getAttribute('data-section');
            if (!targetSection) {
                console.warn("Tab missing data-section attribute");
                return;
            }

            document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
            document.querySelectorAll('.blog-content').forEach(c => c.classList.remove('active'));

            target.classList.add('active');
            const targetContent = document.querySelector(`[data-content="${targetSection}"]`);
            if (targetContent) {
                targetContent.classList.add('active');
                console.log(`Activated content section: ${targetSection}`);
            } else {
                console.error(`Content section not found: ${targetSection}`);
            }

            currentTabIndex = allTabs.indexOf(target);
            updateNavigationButtons();
        }

        // Navigation buttons
        if (target.matches('.nav-btn.prev')) {
            e.preventDefault();
            if (currentTabIndex > 0) {
                navigateToTab(currentTabIndex - 1);
            } else {
                console.log("Already at first blog");
            }
        }

        if (target.matches('.nav-btn.next')) {
            e.preventDefault();
            if (currentTabIndex < allTabs.length - 1) {
                navigateToTab(currentTabIndex + 1);
            } else {
                console.log("Already at last blog");
            }
        }

        // View All
        if (target.matches('.nav-btn.view-all')) {
            e.preventDefault();
            const blogTabs = document.querySelector('.blog-tabs');
            if (blogTabs) {
                blogTabs.scrollIntoView({ behavior: 'smooth', block: 'start' });
                console.log("Scrolled to blog tabs");
            } else {
                console.error("Blog tabs section not found");
            }
        }
    });

    // Handle keyboard arrow navigation
    document.addEventListener('keydown', function(e) {
        if (['input', 'textarea'].includes(document.activeElement.tagName.toLowerCase())) {
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

    // Activate first tab if none is active
    const firstTab = document.querySelector('.tab');
    if (firstTab && !document.querySelector('.tab.active')) {
        firstTab.click();
    }

    // Delay initialization to ensure layout is stable
    setTimeout(() => {
        initializeTabs();
        updateNavigationButtons();
        console.log("Blog navigation initialized");
    }, 100);
});

console.log("Blog navigation script loaded successfully");

// Website Design page filtering code
document.addEventListener('DOMContentLoaded', function() {
  const tabs = document.querySelectorAll('.tab');
  const contents = document.querySelectorAll('.design-content');
  
  // Initialize first tab as active
  function initializeTabs() {
    // Ensure first tab and content are active on load
    if (tabs.length > 0 && contents.length > 0) {
      tabs[0].classList.add('active');
      contents[0].classList.add('active');
    }
  }
  
  // Filter content based on selected tab
  function filterContent(targetSection) {
    // Remove active class from all tabs and contents
    tabs.forEach(tab => tab.classList.remove('active'));
    contents.forEach(content => content.classList.remove('active'));
    
    // Add active class to clicked tab
    const activeTab = document.querySelector(`[data-section="${targetSection}"]`);
    if (activeTab) {
      activeTab.classList.add('active');
    }
    
    // Show corresponding content
    const activeContent = document.querySelector(`[data-content="${targetSection}"]`);
    if (activeContent) {
      activeContent.classList.add('active');
      
      // Smooth scroll to content if not in viewport
      activeContent.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'nearest' 
      });
    }
  }
  
  // Add click event listeners to tabs
  tabs.forEach(tab => {
    tab.addEventListener('click', function(e) {
      e.preventDefault();
      const targetSection = this.getAttribute('data-section');
      
      if (targetSection) {
        filterContent(targetSection);
        
        // Update URL hash for bookmarking (optional)
        history.pushState(null, null, `#${targetSection}`);
      }
    });
    
    // Add keyboard navigation support
    tab.addEventListener('keydown', function(e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        this.click();
      }
    });
  });
  
  // Handle browser back/forward buttons
  window.addEventListener('popstate', function() {
    const hash = window.location.hash.substring(1);
    if (hash) {
      filterContent(hash);
    } else {
      // Default to first tab if no hash
      if (tabs.length > 0) {
        const firstSection = tabs[0].getAttribute('data-section');
        filterContent(firstSection);
      }
    }
  });
  
  // Check for URL hash on page load
  function handleInitialHash() {
    const hash = window.location.hash.substring(1);
    if (hash) {
      // Small delay to ensure DOM is fully ready
      setTimeout(() => {
        filterContent(hash);
      }, 100);
    } else {
      initializeTabs();
    }
  }
  
  // Initialize the page
  handleInitialHash();
  
  // Add smooth transitions for content switching
  function addTransitionEffects() {
    contents.forEach(content => {
      content.style.transition = 'opacity 0.3s ease-in-out';
    });
  }
  
  addTransitionEffects();
});
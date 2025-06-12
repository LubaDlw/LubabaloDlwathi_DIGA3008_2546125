// Website Design page filtering code - Fixed with event delegation
document.addEventListener('DOMContentLoaded', function() {
  
  // Event delegation: Single click listener handles all tabs
  document.addEventListener('click', function(e) {
    if (e.target.matches('.tab')) {
      e.preventDefault();
      const targetSection = e.target.getAttribute('data-section');
      
      if (targetSection) {
        filterContent(targetSection);
        
        // Update URL hash for bookmarking (optional)
        history.pushState(null, null, `#${targetSection}`);
      }
    }
  });

  document.addEventListener('keydown', function(e) {
    if (e.target.matches('.tab') && (e.key === 'Enter' || e.key === ' ')) {
      e.preventDefault();
      e.target.click();
    }
  });
  
  function initializeTabs() {
    const tabs = document.querySelectorAll('.tab');
    const contents = document.querySelectorAll('.design-content');
    
    // FirstTab active
    if (tabs.length > 0 && contents.length > 0) {
      tabs[0].classList.add('active');
      contents[0].classList.add('active');
    }
  }
  
  // Filter content based on selected tab
  function filterContent(targetSection) {
    const tabs = document.querySelectorAll('.tab');
    const contents = document.querySelectorAll('.design-content');
    
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
  
  // Handle browser back/forward buttons
  window.addEventListener('popstate', function() {
    const hash = window.location.hash.substring(1);
    if (hash) {
      filterContent(hash);
    } else {
      // Default to first tab if no hash
      const firstTab = document.querySelector('.tab');
      if (firstTab) {
        const firstSection = firstTab.getAttribute('data-section');
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
  
  // Add smooth transitions for content switching
  function addTransitionEffects() {
    const contents = document.querySelectorAll('.design-content');
    contents.forEach(content => {
      content.style.transition = 'opacity 0.3s ease-in-out';
    });
  }
  
  // Initialize the page
  handleInitialHash();
  addTransitionEffects();
});
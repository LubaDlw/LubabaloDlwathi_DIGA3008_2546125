document.addEventListener('DOMContentLoaded', function() {
    // Get all filter buttons and project items
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectItems = document.querySelectorAll('.project-item');
    
    // Add click event to each filter button
    filterButtons.forEach(button => {
      button.addEventListener('click', () => {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        
        // Add active class to clicked button
        button.classList.add('active');
        
        // Get filter value
        const filter = button.getAttribute('data-filter');
        
        // Filter projects
        filterProjects(filter);
      });
    });
    
    // Filter function
    function filterProjects(filter) {
      projectItems.forEach(item => {
        // Get item's category
        const category = item.getAttribute('data-category');
        
        // Reset animation
        item.style.animation = 'none';
        item.offsetHeight; // Trigger reflow
        
        if (filter === 'all' || category === filter) {
          // Show items that match the filter
          item.classList.remove('hidden');
          item.style.animation = 'fadeIn 0.5s ease forwards';
          
          // Add slight delay for staggered effect
          const delay = Array.from(projectItems).indexOf(item) * 0.1;
          item.style.animationDelay = `${delay}s`;
        } else {
          // Hide items that don't match
          item.classList.add('hidden');
        }
      });
    }
  });
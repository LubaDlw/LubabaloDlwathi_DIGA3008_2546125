document.addEventListener('DOMContentLoaded', function() {
  // Singe LIstener
  document.addEventListener('click', function(e) {
    if (e.target.matches('.tab')) {
      const tabs = document.querySelectorAll('.tab');
      const essays = document.querySelectorAll('.essay-content');
      
      // Remove active class from all tabs
      tabs.forEach(t => t.classList.remove('active'));
      // Add active class to clicked tab
      e.target.classList.add('active');
      
      // Hide all essays
      essays.forEach(essay => essay.style.display = 'none');
      
      // Show selected essay
      const essayId = e.target.getAttribute('data-essay');
      if (essayId) {
        const targetEssay = document.getElementById(essayId);
        if (targetEssay) {
          targetEssay.style.display = 'block';
        }
      }
    }
  });
  
  //Show first essay if none are visible
  function initializeFirstEssay() {
    const firstTab = document.querySelector('.tab');
    const essays = document.querySelectorAll('.essay-content');
    
    // Check if any essay is already visible
    const visibleEssay = Array.from(essays).find(essay => 
      essay.style.display === 'block' || 
      (!essay.style.display && getComputedStyle(essay).display !== 'none')
    );
    
    if (!visibleEssay && firstTab) {
      firstTab.click();
    }
  }
  initializeFirstEssay();
});
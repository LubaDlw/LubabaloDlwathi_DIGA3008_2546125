// no memory leaks (response to feedbck from Hanli)
document.addEventListener('DOMContentLoaded', function() {
    
    // Event delegation: Single click listener on document handles all tabs
    document.addEventListener('click', function(e) {
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
        }
    });
    
    // Initialize first tab as active if no tab is active
    const firstTab = document.querySelector('.tab');
    if (firstTab && !document.querySelector('.tab.active')) {
        firstTab.click();
    }
});
 document.addEventListener('DOMContentLoaded', function() {
      const tabs = document.querySelectorAll('.tab');
      const essays = document.querySelectorAll('.essay-content');
      
      tabs.forEach(tab => {
        tab.addEventListener('click', function() {
          // Remove active class from all tabs
          tabs.forEach(t => t.classList.remove('active'));
          // Add active class to clicked tab
          this.classList.add('active');
          
          // Hide all essays
          essays.forEach(essay => essay.style.display = 'none');
          
          // Show selected essay
          const essayId = this.getAttribute('data-essay');
          if (essayId) {
            document.getElementById(essayId).style.display = 'block';
          }
        });
      });
    });
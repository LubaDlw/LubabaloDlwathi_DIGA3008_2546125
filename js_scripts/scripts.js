document.addEventListener('DOMContentLoaded', function() {
    // my roles
    const roles = ["WEB DEVELOPER", "GAME DEVELOPER", "UI/UX DESIGNER"];
    let currentRole = 0;
    const roleElement = document.getElementById('role-text');
    
    // null check
    if (!roleElement) {
      console.error("Role text element not found! Make sure you have an element with id 'role-text'");
      return;
    }
    
    function cycleRoles() {
      // Fade out the current role
      roleElement.style.opacity = 0;
      
      // change tex fade in
      setTimeout(() => {
        currentRole = (currentRole + 1) % roles.length;
        roleElement.textContent = roles[currentRole];
        roleElement.style.opacity = 1;
      }, 500);
    }
    
    // Initialize
    roleElement.style.opacity = 1;
    
    
    setInterval(cycleRoles, 3500);
  });
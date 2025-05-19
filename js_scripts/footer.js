// footer-script.js - This script adds the footer to every page

document.addEventListener('DOMContentLoaded', function() {
  // Create the footer element 
  if (!document.querySelector('footer')) {
    // Create footer HTML content
    const footerHTML = `
      <footer>
        <div class="container footer-container">
          <div class="footer-branding h-card">
            <h2 class="logo p-nickname">LD</h2>
            <span class="p-name" hidden>Lubabalo Dlwathi</span>
          </div>
          <nav class="footer-nav">
            <ul class="footer-links">
              <li><a href="https://github.com/LubaDlw" target="_blank" class="u-url" rel="me">GitHub</a></li>
              <li><a href="https://lubadlw.itch.io/" target="_blank" class="u-url" rel="me">Itch.io</a></li>
              <li><a href="https://www.linkedin.com/in/lubabalo-b-dlwathi-336219202/" target="_blank" class="u-url" rel="me">LinkedIn</a></li>
            </ul>
          </nav>
          <div class="social">
            <a href="https://github.com/LubaDlw" target="_blank" class="social-icon u-url" rel="me">
              <img src="https://github.githubassets.com/favicons/favicon.svg" alt="GitHub">
            </a>
            <a href="https://lubadlw.itch.io/" target="_blank" class="social-icon u-url" rel="me">
              <img src="https://itch.io/favicon.ico" alt="Itch.io">
            </a>
            <a href="https://www.linkedin.com/in/lubabalo-b-dlwathi-336219202/" target="_blank" class="social-icon u-url" rel="me">
              <img src="../images/Misc/LI-In-Bug.png" alt="LinkedIn">
            </a>
          </div>
        </div>
        <div class="copyright">
          <p>© 2025 - <span class="p-name">Lubabalo Dlwathi</span>. All rights reserved.</p>
        </div>
      </footer>
    `;
    
    // Append the footer to the body
    document.body.insertAdjacentHTML('beforeend', footerHTML);
  }
});
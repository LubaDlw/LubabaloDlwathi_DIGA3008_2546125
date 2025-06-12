document.addEventListener('DOMContentLoaded', function () {
  // Event delegation: done
  document.addEventListener('click', function(e) {
    // Handle filter button clicks
    if (e.target.matches('.filter-btn')) {
      handleFilterClick(e.target);
    }
    
    // Handle read more button clicks
    if (e.target.matches('.read-more-btn')) {
      handleReadMoreClick(e.target);
    }
  });
  
  // Filter button click handler
  function handleFilterClick(button) {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectItems = document.querySelectorAll('.project-item');
    const categorySections = document.querySelectorAll('.category-section');
    
    // Remove active class from all buttons
    filterButtons.forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');

    // Get filter value
    const filter = button.getAttribute('data-filter');
    
    // Show/hide sections
    categorySections.forEach(section => {
      const sectionCategory = section.getAttribute('data-category');

      if (filter === 'all' || sectionCategory === filter) {
        section.style.display = 'block';
        
        // If gallery is displayed, ensure images are loaded
        if (sectionCategory === 'gallery' && (filter === 'all' || filter === 'gallery')) {
          loadGalleryImages();
        }
      } else {
        section.style.display = 'none';
      }
    });

    // Filter individual items
    projectItems.forEach(item => {
      const itemCategory = item.getAttribute('data-category');

      // Reset animation
      item.style.animation = 'none';
      item.offsetHeight; // Trigger reflow

      if (filter === 'all' || itemCategory === filter) {
        item.classList.remove('hidden');
        item.style.animation = 'fadeIn 0.5s ease forwards';

        const delay = Array.from(projectItems).indexOf(item) * 0.1;
        item.style.animationDelay = `${delay}s`;
      } else {
        item.classList.add('hidden');
      }
    });
  }
  
  // Read more button click handler
  function handleReadMoreClick(button) {
    const item = button.closest('.project-item');
    const description = item.querySelector('.description-port');
    
    if (description) {
      description.classList.toggle('description-expanded');
      button.textContent = description.classList.contains('description-expanded') ? 'Read Less' : 'Read More';
    }
  }
  
  // Gallery image loading function
  function loadGalleryImages() {
    const galleryContainer = document.querySelector('#gallery .project-grid');
    
    if (!galleryContainer) return;
    
    const galleryImages = [
      { 
        src: "../images/DesignGallery/design1.jpg", 
        alt: "Design 1", 
        title: "IBM SKillsBuild", 
        description: "Work for a workshop hosted by IBM and WitsDevSoc" 
      },
      { 
        src: "../images/DesignGallery/WebsitePoster.jpg", 
        alt: "Design 2", 
        title: "Web Poster", 
        description: "Poster announcing release for Wits DevSoc Poster" 
      },
      { 
        src: "../images/DesignGallery/design3.webp", 
        alt: "Design 3", 
        title: "Poster Design", 
        description: "Youth Day Poster In Collaboration With Vow FM." 
      },
      { 
        src: "../images/DesignGallery/design4.webp", 
        alt: "Design 4", 
        title: "Transnet Design Brief", 
        description: "Concept Work for Transnet Design Brief" 
      },
      { 
        src: "../images/DesignGallery/design5.png", 
        alt: "Design 5", 
        title: "Concept Work for Kids Essential", 
        description: "Product Showcase of Green Science Weather Kit" 
      },
      { 
        src: "../images/DesignGallery/design6.webp", 
        alt: "Design 6", 
        title: "Youth Day Poster", 
        description: "Poster in collaboration with VOW FM" 
      }
    ];
    
    // Clear existing content
    galleryContainer.innerHTML = '';
    
    // Generate HTML for each gallery item
    galleryImages.forEach(image => {
      const galleryItem = document.createElement('article');
      galleryItem.className = 'h-entry project-item';
      galleryItem.setAttribute('data-category', 'gallery');
      
      galleryItem.innerHTML = `
        <h3 class="p-name">${image.title}</h3>
        <img src="${image.src}" alt="${image.alt}" class="u-photo" />
        <h4 class="description-port">
          ${image.description}
        </h4>
        <p class="p-category" hidden>Design Gallery</p>
      `;
      
      galleryContainer.appendChild(galleryItem);
    });
    
    // Add read more buttons to newly created gallery items
    addReadMoreButtons();
  }
  
  // Create and add "Read More" buttons to each project item
  function addReadMoreButtons() {
    const projectItems = document.querySelectorAll('.project-item');
    
    projectItems.forEach(item => {
      // Check if the item already has a read more button
      if (!item.querySelector('.read-more-btn')) {
        const description = item.querySelector('.description-port');
        if (description) {
          // Create button
          const readMoreBtn = document.createElement('button');
          readMoreBtn.className = 'read-more-btn';
          readMoreBtn.textContent = 'Read More';
          
          // Insert button before the project link
          const projectLink = item.querySelector('a');
          if (projectLink) {
            item.insertBefore(readMoreBtn, projectLink);
          } else {
            item.appendChild(readMoreBtn);
          }
        }
      }
    });
  }
  
  // Toggle read more buttons visibility based on screen size
  function handleResponsiveLayout() {
    const isMobile = window.innerWidth <= 768;
    const readMoreBtns = document.querySelectorAll('.read-more-btn');
    
    readMoreBtns.forEach(btn => {
      // On desktop - hide buttons and reset descriptions
      if (!isMobile) {
        btn.style.display = 'none';
        const description = btn.parentElement.querySelector('.description-port');
        if (description) {
          description.classList.remove('description-expanded');
        }
      } else {
        btn.style.display = 'inline-block';
      }
    });
  }
  
  // Initialize everything
  loadGalleryImages();
  addReadMoreButtons();
  handleResponsiveLayout();
  
  // Handle window resize
  window.addEventListener('resize', handleResponsiveLayout);
});
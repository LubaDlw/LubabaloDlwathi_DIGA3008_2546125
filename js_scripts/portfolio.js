// First, let's update your existing JavaScript to handle the gallery filter
document.addEventListener('DOMContentLoaded', function () {
  const filterButtons = document.querySelectorAll('.filter-btn');
  const projectItems = document.querySelectorAll('.project-item');
  const categorySections = document.querySelectorAll('.category-section');
  
  // Gallery image loading function
  function loadGalleryImages() {
    const galleryContainer = document.querySelector('#gallery .project-grid');
    
    // This is where we'd normally fetch images from a directory
    // Since direct folder reading isn't possible with client-side JS,
    // we'll use a predefined array of images
    
    const galleryImages = [
      { 
        src: "../images/DesignGallery/design1.jpg", 
        alt: "Design 1", 
        title: "WitsDevSoc Poster", 
        description: "Work for an event hosted by IBM and WitsDevSoc" 
      },
      { 
        src: "../images/DesignGallery/WebsitePoster.jpg", 
        alt: "Design 2", 
        title: "Mobile App UI", 
        description: "Fitness tracking app interface with custom metrics visualization." 
      },
      { 
        src: "../images/DesignGallery/design3.webp", 
        alt: "Design 3", 
        title: "Poster Design", 
        description: "Event promotion poster with typography-focused aesthetic." 
      },
      { 
        src: "../images/DesignGallery/design4.webp", 
        alt: "Design 4", 
        title: "Logo Concept", 
        description: "Minimalist logo design for a tech startup." 
      },
      { 
        src: "../images/DesignGallery/design5.png", 
        alt: "Design 5", 
        title: "Social Media Kit", 
        description: "Consistent branding elements for cross-platform social media presence." 
      },
      { 
        src: "../images/DesignGallery/design6.webp", 
        alt: "Design 5", 
        title: "Social Media Kit", 
        description: "Consistent branding elements for cross-platform social media presence." 
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
  }
  
  // Load gallery images when page loads
  loadGalleryImages();
  
  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
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
    });
  });
});
document.addEventListener('DOMContentLoaded', function () {
  const filterButtons = document.querySelectorAll('.filter-btn');
  const projectItems = document.querySelectorAll('.project-item');
  const categorySections = document.querySelectorAll('.category-section');

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

  // Tab switching functionality - adapted from design page
        document.addEventListener('DOMContentLoaded', function() {
            const tabs = document.querySelectorAll('.tab');
            const contents = document.querySelectorAll('.blog-content');

            tabs.forEach(tab => {
                tab.addEventListener('click', function() {
                    const targetSection = this.getAttribute('data-section');

                    // Remove active class from all tabs and contents
                    tabs.forEach(t => t.classList.remove('active'));
                    contents.forEach(c => c.classList.remove('active'));

                    // Add active class to clicked tab and corresponding content
                    this.classList.add('active');
                    document.querySelector(`[data-content="${targetSection}"]`).classList.add('active');
                });
            });
        });
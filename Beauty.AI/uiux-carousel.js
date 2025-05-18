// uiux-carousel.js

document.addEventListener('DOMContentLoaded', () => {
    const track = document.querySelector('.carousel-track');
    const prevButton = document.querySelector('.prev-btn');
    const nextButton = document.querySelector('.next-btn');
    const totalSlides = 47; // FoodieGem Project
    let currentIndex = 0;
  
    // Populate slides
    for (let i = 49; i <= 61; i++) {
      const li = document.createElement('li');
      const img = document.createElement('img');
     // img.src = `../images/FoodieGem/Screenshot (${i}).png`;
      img.src = ` ./MG_Images/Screenshot (${i}).png `
      img.alt = `FoodieGem Presentation ${i}`;
      li.appendChild(img);
      track.appendChild(li);
    }
  
    const slides = Array.from(track.children);
  
    function updateSlidePosition() {
      const slideWidth = slides[0].getBoundingClientRect().width;
      track.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
    }
  
    window.addEventListener('resize', updateSlidePosition);
  
    prevButton.addEventListener('click', () => {
      currentIndex = (currentIndex === 0) ? slides.length - 1 : currentIndex - 1;
      updateSlidePosition();
    });
  
    nextButton.addEventListener('click', () => {
      currentIndex = (currentIndex === slides.length - 1) ? 0 : currentIndex + 1;
      updateSlidePosition();
    });
  
    // Initial position
    updateSlidePosition();
  });
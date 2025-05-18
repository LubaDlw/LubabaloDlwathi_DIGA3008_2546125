// uiux-carousel.js 
//Display Video

document.addEventListener('DOMContentLoaded', () => {
    const track = document.querySelector('.carousel-track');
    
    // Hide navigation since 1
    const prevButton = document.querySelector('.prev-btn');
    const nextButton = document.querySelector('.next-btn');
    if (prevButton) prevButton.style.display = 'none';
    if (nextButton) nextButton.style.display = 'none';
    
    // Clear any existing content in the track
    track.innerHTML = '';
    
    // Create container for the video
    const li = document.createElement('li');
    li.style.width = '100%';
    
    // Create the video element
    const video = document.createElement('video');
    
    // Set video attributes
    // Update this path to your actual video file location
    video.src = './BeautyAIDocs/Jozi Creatives, Loreal Brandstrom 2024.mp4'; // Change this to your actual video file
    video.controls = true; // Add video controls (play, pause, etc.)
    video.preload = 'auto'; // Preload the video for smoother playback
    video.style.width = '100%';
    video.style.maxHeight = '85vh'; // Limit height to avoid overflowing viewport
    
    // Optional: you can add more attributes as needed
    // video.poster = './path-to-poster-image.jpg'; // Thumbnail before video plays
    // video.autoplay = true; // Uncomment to autoplay (may be blocked by browsers)
    // video.muted = true; // Required for autoplay in most browsers
    // video.loop = true; // Uncomment to loop the video
    
    // Append video to the carousel
    li.appendChild(video);
    track.appendChild(li);
});
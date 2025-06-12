/**
 * File: glide.js
 * Description: Configures and initializes the Glide.js carousel, including:
 *    - Setting carousel attributes like number of visible items and spacing.
 *    - Implementing responsive behavior via breakpoints.
 *    - Handling navigation with custom arrow controls.
 *    - Mounting the carousel and adding navigation event listeners.
 *
 * Dependencies:
 *    - assets/libs/glide/js/glide.min.js: Glide library for carousel functionality.
 *    - assets/index.html: HTML structure including `.glide` container and arrow elements.
 */

const prevArrow = document.querySelector('.glide__arrow--left');
const nextArrow = document.querySelector('.glide__arrow--right');

// Attributes of glide for the carousel.
const glide = new Glide('.glide', {
    type: 'carousel',
    perView: 3,
    gap: 20,
    startAt: 0,
    breakpoints: {
        768: { perView: 2 },
        578: { perView: 1 }
    }
});

//mount the carousel
glide.mount();

//Events of glide for move the cards of the carousel
prevArrow.addEventListener('click', () => {
    glide.go('<');
});
nextArrow.addEventListener('click', () => {
    glide.go('>');
});
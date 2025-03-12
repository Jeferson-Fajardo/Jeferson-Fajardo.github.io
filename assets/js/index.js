/**
 *  File: index.js
 *  Description: This file manages the behavior of the textarea search input , including:
 *      
 *      -Dynamic placeholder resizing.
 *      -Show or hide the content about me, assign dynamically the images with its animation to each card.
 *      -Clear input of the button.
 *      -Show and clear the animations of each card and user input handling.
 *      -Carousel glide functionality.
 *      -Copy to clipboard functionality.
 *      -Future functionality will include Firebase search integration.
 *
 *  Dependencies: 
 *       - styles/index.css : Provides the CSS classes used for styles. 
 *     
*/
// Global variables
const textarea = document.querySelector('.textarea-search'),
      clearIcon = document.querySelector('.clear-icon'),
      searchIcon = document.querySelector('.search-icon'),
      knowAboutMe = document.querySelector('.know-about-me'),
      moreAboutMe = document.querySelector('.more-about-me'),
      projectImages = document.querySelectorAll('.project-image'),
      cards = document.querySelectorAll('.carousel-card'),
      cardsContent = document.querySelector('.carousel-cards-content'),
      prevArrow = document.querySelector('.glide__arrow--left'),
      nextArrow = document.querySelector('.glide__arrow--right'),
      contactMeBoxes = document.querySelectorAll(".contact-me-box");
    

let isTabPressed = false,
    flagAboutMe = false;  

//Call functions
changeTextSize();
addEventsCards();

// Detect if the user is pressing the "Tab" key.
document.addEventListener('keydown', function(event) {
    if (event.key === 'Tab') {
        isTabPressed = true;
    }
});
// Detect if the user leaves of pressing a key different to "Tab". 
document.addEventListener('keyup', function(event) {
    if (event.key !== 'Tab') {
        isTabPressed = false;
    }
});

// Show the icon clear if the focus is active in the textarea.
textarea.addEventListener('focus', function() {
    clearIcon.classList.remove('d-none');
});

// Clear and prevent the event focus of the textarea on clear icon.
clearIcon.addEventListener('mousedown', function(event) {
    clear(event);
});
clearIcon.addEventListener('touchstart', function(event) {
    clear(event);
});

// Prevent the event focus of the textarea on search icon.
searchIcon.addEventListener('mousedown', function(event) {
    event.preventDefault();
});
searchIcon.addEventListener('touchstart', function(event) {
    event.preventDefault();
});

// Clear the textarea value and prevent.
function clear(event) {
    event.preventDefault();
    textarea.value = '';
}

// Hide the clear icon if the focus of the textarea is not active.
textarea.addEventListener('blur', function() {
    clearIcon.classList.add('d-none');
});

// Show or hide the clear icon if the textarea has a value.
textarea.addEventListener('input', function() {
    if (textarea.value.trim() !== '') {
        clearIcon.classList.remove('d-none');
    } else {
        clearIcon.classList.add('d-none');
    }
});

//Show or hide the content about me with a click. 
knowAboutMe.addEventListener('click', function() {
    const labelB = knowAboutMe.querySelector("b"); 
    if (!flagAboutMe){
        labelB.innerHTML = "! Conoce menos sobre mí ! "
        flagAboutMe = true;
    }else{
        labelB.innerHTML = "! Conoce más sobre mí ! "
        flagAboutMe = false;
    }
    moreAboutMe.classList.toggle("show");
   ; 
});

//Change the placeholder text size depending on the screen size.
function changeTextSize() {
    if(window.innerWidth  < 500){
        textarea.setAttribute('placeholder', 'Articulos o pensamientos. ');
    } else if (window.innerWidth < 740) { 
        textarea.setAttribute('placeholder', 'Lee artículos o escribe pensamientos. ');
    }else{
        textarea.setAttribute('placeholder', 'Aprende sobre algún articulo o comparte un pensamiento. ');
    }
}

//Select the all images of the projects and assign them the url to each property img for its animation in each card.
projectImages.forEach(card => {
    let basePath = "https://murasaki-dbd90.web.app/images/projects/";
    card.style.setProperty('--img1', `url(${basePath + card.dataset.img1})`);
    card.style.setProperty('--img2', `url(${basePath + card.dataset.img2})`);
    card.style.setProperty('--img3', `url(${basePath + card.dataset.img3})`);
});

// Show and clear the animation of each card with a event of click.
function addEventsCards() {
    projectImages.forEach(card => {
        card.addEventListener('click', () => animationHandler(card), {once: true}); 
    });    
}
function animationHandler(card) {
    toggleAnimation(card);
    setTimeout(() => toggleAnimation(card), 3000);
}
function toggleAnimation(card) {
    card.classList.toggle("project-image-click");
}

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
// Copy to clipboard functionality
contactMeBoxes.forEach(box => {
    let i = box.querySelector("i"),
        a = box.querySelector("a");

    const toggleHoverState = (isHovering) => {
        if (isHovering) {
            i.classList.add("bi-copy-hover");
            box.classList.add("contact-me-box-hover");
            a.classList.remove("text-decoration-none");
        } else {
            i.classList.remove("bi-copy-hover");
            box.classList.remove("contact-me-box-hover");
            a.classList.add("text-decoration-none");
        }
    };
    box.addEventListener("mouseenter", () => toggleHoverState(true));
    box.addEventListener("mouseleave", () => toggleHoverState(false));
    i.addEventListener("click", () => copyText(box, i));
});
function copyText(box, i) {
    let text = box.querySelector("span").textContent.trim();
    navigator.clipboard.writeText(text)
    .then(() => {
        i.classList.replace("bi-copy", "bi-check");
        setTimeout(() => i.classList.replace("bi-check", "bi-copy"), 3000);
    }).catch(err => console.error("Error al copiar: ", err));
}

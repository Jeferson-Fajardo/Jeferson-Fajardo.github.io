/**
 *  File: index.js
 *  Description:This file manages the behavior of the textarea search input, 
 *              including dynamic placeholder resizing, clear button functionality, 
 *              and user input handling. Future functionality will include Firebase search integration.
 *
 *  Dependencies: None. 
 *     
*/
// global variables
const textarea = document.querySelector('.textarea-search'),
      clearIcon = document.querySelector('.clear-icon'),
      searchIcon = document.querySelector('.search-icon');
let isTabPressed = false;

//call functions
changeTextSize();

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

// Change the placeholder text size depending on the screen size.
function changeTextSize() {
    if(window.innerWidth  < 500){
        textarea.setAttribute('placeholder', 'Articulos o pensamientos. ');
    } else if (window.innerWidth < 740) { 
        textarea.setAttribute('placeholder', 'Lee artículos o escribe pensamientos. ');
    }else{
        textarea.setAttribute('placeholder', 'Aprende sobre algún articulo o comparte un pensamiento. ');
    }
}



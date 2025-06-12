/**
 * File: events.js
 * Description: Handles global events on the index page, including:
 *    - Detecting "Tab" key presses to track accessibility focus behavior.
 *    - Showing or hiding the clear icon based on the focus state and content of the textarea.
 *    - Clearing the textarea when the clear icon is clicked or touched.
 *    - Triggering search validation after typing or clicking the search icon.
 *    - Toggling the "About Me" section visibility on button click.
 *
 * Dependencies:
 *    - assets/js/index.js: provides `clear` and `startOrClear` functions.
 *    - assets/index.html: contains the HTML structure and referenced element classes.
 */


import { clear, startOrClear } from '../index.js';
// fuction to setup global events for the index page
export function setupGlobalEvents(textarea) {
    
    const clearIcon = document.querySelector('.clear-icon');
    const searchIcon = document.querySelector('.search-icon');
    const knowAboutMe = document.querySelector('.know-about-me');
    const moreAboutMe = document.querySelector('.more-about-me');

    let timeout;
    let flagAboutMe = false;
    let isTabPressed = false;

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
    // Clear with touchstart 
    clearIcon.addEventListener('touchstart', function(event) {
        clear(event);
    });
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
    //Prevent the event focus of the textarea on search icon.
    searchIcon.addEventListener('mousedown', function(event) {
        event.preventDefault();
    });
    searchIcon.addEventListener('touchstart', function(event) {
        event.preventDefault();
        startOrClear();
    });
    // Start the validation of the search on click in icon of search 
    searchIcon.addEventListener("click", function (event) {
        event.preventDefault();
        startOrClear();
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
    
    });
    // Start the validation of the search after of the assigned milliseconds according to changes of the user.
    textarea.addEventListener("input", function () {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            startOrClear();
        }, 500);
    });
    
}

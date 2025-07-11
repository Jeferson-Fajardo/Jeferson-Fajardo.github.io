/**
 *  File: index.js
 *  Description: This file manages the behavior of the textarea search input, including:
 *      
 *      - Dynamic placeholder resizing.
 *      - Showing/hiding the "about me" section, assigning images with animation to each card.
 *      - Clearing the input from the button.
 *      - Showing/clearing card animations and handling user input.
 *      - Clipboard copy functionality.
 *      - Firebase search integration.
 *
 *  Dependencies: 
 *       - styles/index.css : Provides the CSS classes used for styles. 
 */
// Global variables
const textarea = document.querySelector('.textarea-search');
const projectImages = document.querySelectorAll('.project-image');
const contactMeBoxes = document.querySelectorAll(".contact-me-box");
const articlesContainer = document.querySelector('.articles-container');
const listContainer = document.querySelector(".list-articles");

export let lastArticlesSearched = [];
let totalPages = 0, currentPage = 0;

// import functions of other files
import { startSearch } from './index/search.js';
import { setupGlobalEvents } from './index/events.js';
import { renderPagination, clearPagination } from './index/pagination.js';


//Call functions
addEventsCards();
setupGlobalEvents(textarea);

// Clear the textarea value and the articles if there are articles.
function clear(event) {
    event.preventDefault();
    textarea.value = '';
    clearArticles();
    hideArticlesContainer();
    clearValidationMessage();
}

// Assign images to project cards
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

// Copy to clipboard functionality
contactMeBoxes.forEach(box => {
    let i = box.querySelector("i");
    let a = box.querySelector("a");

    const toggleHoverState = () => {
        if(i && box && a){   
            i.classList.toggle("bi-copy-hover");
            box.classList.toggle("contact-me-box-hover");
            a.classList.toggle("text-decoration-none");
        }
    };
    box.addEventListener("mouseenter", () => toggleHoverState());
    box.addEventListener("mouseleave", () => toggleHoverState());
    i.addEventListener("click", () => copyText(box, i));
});

// Copy the text to clipboard 
function copyText(box, i) {
    let text = box.querySelector("span").textContent.trim();
    navigator.clipboard.writeText(text)
    .then(() => {
        i.classList.replace("bi-copy", "bi-check");
        setTimeout(() => i.classList.replace("bi-check", "bi-copy"), 3000);
    }).catch(err => console.error("Error al copiar: ", err));
}

// Validation for search the articles, show a validation message or clear the articles on the textarea.  
function startOrClear() {
    
    const searchValue = textarea.value.trim().toLowerCase();
    const letters = searchValue.match(/[a-zA-Z]/g);
    
    if (searchValue !== "" && searchValue.length > 2 && letters !== null && letters.length > 2 ) {
        startSearch();
    }else if (searchValue === "") {    
        clearArticles();
        hideArticlesContainer();
        clearValidationMessage();        
    }else {
        validationMessage("Por favor escribe al menos 3 letras.");
    }
}

// Validate if there are articles in the query made in firebase and show the articles or show a validation message. 
function thereAreArticlesInTheQuery(results, resultsByTitle) {
    if (results.length > 0) {
        showArticlesContainer();
        lastArticlesSearched = results;
        showArticles(results, 1);
        return true; 
    } else if (resultsByTitle){
        validationMessage("No se encontraron artículos.");
    }
    return false;
}

// Clear the validation message in the text area. 
function clearValidationMessage() {
    const messageElement = document.querySelector(".validation-message");
    if (messageElement) {
        messageElement.remove();
    }
}

// Show the container of the articles
function showArticlesContainer() {
    if(articlesContainer.classList.contains("d-none")){
        articlesContainer.classList.remove("d-none");
        articlesContainer.classList.add("d-flex");
    }
}

// Hide the container of the articles
function hideArticlesContainer() {
    
    if(articlesContainer.classList.contains("d-flex")){
        articlesContainer.classList.remove("d-flex");
        articlesContainer.classList.add("d-none");
    }
}

// Clear the articles and last articles of the search.
function clearArticles() {
    if(thereAreArticlesInThePage()){
        const oldArticles = document.querySelectorAll('.list-articles li.article');
        oldArticles.forEach(li => li.remove());

        lastArticlesSearched = []; 
        hideArticlesContainer();
    } 
}

// Validate if there are articles on the textarea of the page. 
function thereAreArticlesInThePage() {
    const listArticles = document.querySelectorAll('.list-articles .article');
    const firstArticle = listArticles[0];

    if(firstArticle && firstArticle.classList.contains("article")){
        return true;
    }
    return false;
}

// Show the validation message on the textarea. 
function validationMessage(message) {
    const messageElement = document.querySelector(".validation-message");
    const currentMessage = messageElement ? messageElement.textContent : false;

    clearArticles();
    clearPagination();
    
    if ( currentMessage && currentMessage !== message || currentMessage == false) {
        
        clearValidationMessage();

        const elementLi = document.createElement("li");
        const elementP = document.createElement("p");

        elementP.textContent = message;
        elementP.classList.add("validation-message");
        elementLi.appendChild(elementP);
        listContainer.appendChild(elementLi);

        showArticlesContainer();
    }
}

// Show the articles for the current page of the pagination. 
function showArticles(articles, pageIndex) {

    const oldArticles = document.querySelectorAll('.list-articles .article');

    if (oldArticles){
        oldArticles.forEach(li => li.remove());
    }
    
    clearValidationMessage();

    const articlesSize = articles.length;
    const maxArticles = 6; 
    const startIndex = (pageIndex * maxArticles) - maxArticles;
    const endIndex = pageIndex * maxArticles;
    const articlesToShow = articles.slice(startIndex, endIndex);

    totalPages = Math.ceil(articlesSize / maxArticles);
    currentPage = pageIndex;

    const paginationLi = listContainer.querySelector(".li-pagination");

    // insert new elements
    articlesToShow.forEach(article => {

        // create elements
        const elementLi = document.createElement("li");
        const elementA = document.createElement("a");
        const firstElementDiv = document.createElement("div");
        const timeSpan = document.createElement("span");
        const secondElementDiv = document.createElement("div");
        const authorContainerSmall = document.createElement("small");
        const authorSpan = document.createElement("span");
        const articleDateSpan = document.createElement("span");
        const keywordSmall = document.createElement("small");

        // assign data
        elementA.href = "#";
        elementA.textContent = article.title;
        timeSpan.textContent = formatReadingTime(article.readingTime);
        authorSpan.textContent = article.author.name+".  ";
        articleDateSpan.textContent = formatDate(article.createdAt);
        keywordSmall.textContent = article.keywords.slice(0,3).join(", ");

        // add class of css
        elementLi.classList.add("article", "d-flex", "flex-column");
        firstElementDiv.classList.add("d-flex","justify-content-between","article-title-container");
        elementA.classList.add("black-color","text-decoration-none","article-title");
        timeSpan.classList.add("article-time"),
        secondElementDiv.classList.add("d-flex","justify-content-between", "align-items-center");
        authorSpan.classList.add("author-name");

        // add elements to the HTML
        elementLi.append(firstElementDiv, secondElementDiv);
        firstElementDiv.append(elementA, timeSpan);
        secondElementDiv.append(authorContainerSmall, keywordSmall);
        authorContainerSmall.append(authorSpan, articleDateSpan);
        listContainer.insertBefore(elementLi, paginationLi);

    });

    renderPagination(currentPage, totalPages);
}

// Format the date to string in (day, month, year)
function formatDate(createdAt) {
    const date = createdAt.toDate();
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const formatted = date.toLocaleDateString('es-ES', options);

    return formatted;
}

// Format the time to string in minutes and hours. 
function formatReadingTime(time){
    
    if (time < 1) {
        return  "menos de 1 minuto";
    }else if (time < 60 ){
        return `${time} minuto${time === 1 ? '' : 's'}`;
    }

    const hours = time / 60;
    const onlyHours = Math.floor(hours);
    const minutes = Math.round((hours - onlyHours) * 60);

    return `${onlyHours} hora${onlyHours === 1 ? '' : 's'} y ${minutes} minuto${minutes === 1 ? '' : 's'}`;
}

// Export the function to other files.
export {thereAreArticlesInTheQuery, clear, startOrClear, showArticles};




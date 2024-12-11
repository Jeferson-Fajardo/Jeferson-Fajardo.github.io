// globals variables
const menuHeader = document.querySelector(".menu-header");
    subContainer = document.querySelector(".sub-container"),
    linesHeader = document.querySelectorAll(".lines-header"),
    circleHeader = document.querySelector(".circle-header"),
    navegationHeader = document.querySelector(".navegation-header"),
    boxHeader = document.querySelector(".box-header"),
    $witch = document.querySelectorAll(".switch"),
    addSpace = document.querySelector(".add-space"),
    showToLearn = document.querySelector(".show-to-learn"),
    contentToLearn = document.querySelector(".content-to-learn"),
    dropdownToLearn = document.querySelector(".dropdown-to-learn"),
    showOthers = document.querySelector(".show-others"),
    contentOthers= document.querySelector(".content-others"),
    dropdownOthers = document.querySelector(".dropdown-others");

// calls functions
eventsShowAndHiden();

function showMenu(){
    addSpace.classList.add("pt-100px");
    navegationHeader.classList.add("navegation-header-active");
    circleHeader.classList.add("background-c-gray-102","box-shadow-lines-circle");
    
    linesHeader.forEach(lineHeader => {
        lineHeader.classList.add("lines-color-bold", "box-shadow-lines-circle");
    });

}
function hidenMenu(){
    addSpace.classList.remove("pt-100px");
    navegationHeader.classList.remove("navegation-header-active");
    circleHeader.classList.remove("background-c-gray-102", "box-shadow-lines-circle");
    
    linesHeader.forEach(lineHeader => {
        lineHeader.classList.remove("lines-color-bold","box-shadow-lines-circle");
    });
}

function eventsShowAndHiden() {
    // event for show the menu.
    subContainer.addEventListener("mouseenter", showMenu);

    // event for hiden el menu.
    boxHeader.addEventListener("mouseleave", hidenMenu);    
}

// show or hiden the menu according to user.  
$witch.forEach(aSwitch => {
    let flag = false;
    aSwitch.addEventListener("click", function(){

        if (! flag) {
            subContainer.removeEventListener("mouseenter", showMenu);
            boxHeader.removeEventListener("mouseleave", hidenMenu);
            flag = true;
        } else {
            eventsShowAndHiden();
            flag = false;
        }       
    });
});

// events for show or hiden the content of the dropdowns
showToLearn.addEventListener("mouseenter", function() {
    showDropdown(contentToLearn,dropdownToLearn);
});

dropdownToLearn.addEventListener("mouseleave", function() {
    removeDropdown(contentToLearn, dropdownToLearn);    
});

showOthers.addEventListener("mouseenter", function() {
    showDropdown(contentOthers, dropdownOthers);
});

dropdownOthers.addEventListener("mouseleave", function() {
    removeDropdown(contentOthers, dropdownOthers);    
});

function showDropdown(contentElement, dropdownElement){
    contentElement.classList.add("show");
    dropdownElement.classList.add("show","dropdown-active");
    contentElement.setAttribute('aria-expanded', 'true');
    dropdownElement.setAttribute('data-popper-placement',"true")
}
function removeDropdown(contentElement, dropdownElement){
    contentElement.classList.remove("show");
    dropdownElement.classList.remove("show","dropdown-active");
    contentElement.setAttribute('aria-expanded', 'false');
    dropdownElement.setAttribute('data-popper-placement',"")
}


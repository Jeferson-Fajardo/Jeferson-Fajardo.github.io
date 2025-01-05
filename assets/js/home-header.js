/**
 *  File: home-header.js
 *  Description: Controls the header behavior logic on different resolutions (desktop and mobile).
 *  Dependencies: 
 *     - styles/main-header.css : Provides the CSS classes used for styles.
*/

// Globals variables for main menu.
const showHeader = document.querySelector(".show-header"),
    linesHeader = document.querySelectorAll(".lines-header"),
    webName = document.querySelector(".web-name"),
    logo = document.querySelector(".logo"),
    navegationHeader = document.querySelector(".navegation-header"),
    boxHeader = document.querySelector(".box-header"),
    addSpace = document.querySelector(".add-space"),
    showToLearn = document.querySelector(".show-to-learn"),
    contentToLearn = document.querySelector(".content-to-learn"),
    showOthers = document.querySelector(".show-others"),
    contentOthers = document.querySelector(".content-others"),
    _switch = document.querySelectorAll(".switch"),
    isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

let flagMainMenu = false,
    lastScrollY = window.scrollY,
    isSmallDevice = false,
    eventType = isTouch ? 'touchstart' : 'click';

    // Know if the screen is small.
    function isSmallScreen() {
        if (window.matchMedia) {
            return window.matchMedia('(max-width: 576px)').matches;
        } else {
            return window.innerWidth <= 576;
        }
    }
  
    //Functions reused.
    function toggleDropdown(showDropdown){
        showDropdown.classList.toggle("dropdown-active");
    }

    // Show or hidden the main menu.  
    function showMenu(){
        addSpace.classList.add("pt-100px");
        navegationHeader.classList.add("navegation-header-active");
        webName.classList.add("web-name-shadow");
        logo.classList.remove("logo-gray-filter");
        logo.classList.add("logo-dropshadow-filter");

        linesHeader.forEach(lineHeader => {
            lineHeader.classList.add("lines-color-bold","box-shadow-lines-circle");
        });
        window.removeEventListener("scroll", scrollHandler);
    }
    
    function hiddenMenu(){
        addSpace.classList.remove("pt-100px");
        navegationHeader.classList.remove("navegation-header-active");
        webName.classList.remove("web-name-shadow");
        logo.classList.add("logo-gray-filter");
        logo.classList.remove("logo-dropshadow-filter");
        
        linesHeader.forEach(lineHeader => {
            lineHeader.classList.remove("lines-color-bold","box-shadow-lines-circle");
        });

        window.addEventListener("scroll", scrollHandler);
    }

    //Feat for hiding the header when the user scrolls down or show when scrolling up in desktop.
    function scrollHandler() {
        const currentScrollY = window.scrollY;
        if (currentScrollY > lastScrollY) {
            boxHeader.classList.add('hidden');
        }else{
            boxHeader.classList.remove('hidden');
        }
        lastScrollY = currentScrollY;    
    }

     // Show or hidden the main menu according to click user.  
     _switch.forEach(change => {
         change.addEventListener(eventType, function(){ 
             if (!flagMainMenu) {
                 showMenu();
                 logicLargeDevices.removeEvents();
                 flagMainMenu = true;
             } else {
                 hiddenMenu();
                 logicLargeDevices.events();
                 flagMainMenu = false;
             }       
         });
     });
  
    //Events of click or touchstart for show the dropdowns.
    contentToLearn.addEventListener(eventType, function() { 
        toggleDropdown(showToLearn);
    });
    contentOthers.addEventListener(eventType, function() {
        toggleDropdown(showOthers);
    });

    // Activate the logic for cell phone or desktop, including if the screen is small.
    function activateLogic() {

        const smallScreen = isSmallScreen();
        
        if (smallScreen) {
            if(!isSmallDevice){
                isSmallDevice = true;
                logicSmallDevices();
            }
        } else {
            logicLargeDevices();
        }
        
        if (!smallScreen && isSmallDevice) {
            cleanuplogicSmallDevices();
            isSmallDevice = false;
        }
    }
    
    //Main logic large devices.
    function logicLargeDevices(){
        
        // Show or hidden the content of the dropdowns.
        contentToLearn.addEventListener("mouseenter", function() { 
            toggleDropdown(showToLearn);
        });
        showToLearn.addEventListener("mouseleave", function() {
            toggleDropdown(showToLearn);    
        });
        contentOthers.addEventListener("mouseenter", function() {
            toggleDropdown(showOthers);
        });
        showOthers.addEventListener("mouseleave", function() {
            toggleDropdown(showOthers);    
        });

        // Add and remove events for show or hidden the main menu.
        logicLargeDevices.events = () => {
            showHeader.addEventListener("mouseenter", showMenu);
            boxHeader.addEventListener("mouseleave", hiddenMenu); 
        }

        logicLargeDevices.removeEvents = () => {
            showHeader.removeEventListener("mouseenter", showMenu);
            boxHeader.removeEventListener("mouseleave", hiddenMenu);
        }

        // Initizalize the functions. 
        logicLargeDevices.events();
    }

    //Main logic small devices.
    function logicSmallDevices() {

        //initialize variables.
        const headerCellPhone = document.querySelector('.header-cell-phone'),
            accordion = document.querySelector(".accordion-base"),
            iconList = document.querySelector(".menu-navegation"),
            contentToLearnPhone = document.querySelector(".accordion-base .content-to-learn"),
            showToLearnPhone = document.querySelector(".accordion-base .show-to-learn"),
            contentOthersPhone = document.querySelector(".accordion-base .content-others"),
            showOthersPhone = document.querySelector(".accordion-base .show-others"),
            dropdownBase= document.querySelectorAll(".dropdown-base");

        let lastScrollYCell= window.scrollY; 
            flagAccordion = false,
            flagIcon = false;

        // Feat for hiding the header when the user scrolls down or show when scrolling up in cellphone.
        const scrollHandlerCell = () => {
            const currentScrollYCell= window.scrollY;

            if (currentScrollYCell > lastScrollYCell) {
                headerCellPhone.classList.add('hidden');
                if (accordion.classList.contains("accordion-active")){
                    flagAccordion = true;
                    toggleAccordion(); 
                }
            }else{
                headerCellPhone.classList.remove('hidden');
                if (flagAccordion) {
                    toggleAccordion();
                    flagAccordion = false;
                }
            }
            lastScrollYCell = currentScrollYCell;
        };

        // Show or hidden the accordion when the user clicks on the icon. including the content.
        const iconClickHandler = () => {

            if (!flagIcon){
                toggleAccordion();
                changeIcon();
                flagIcon = true;
            }else{
                toggleAccordion();
                changeIcon();
                flagIcon = false;
            }

            function changeIcon() {
                iconList.classList.toggle("bi-list");
                iconList.classList.toggle("bi-x");
            }

            document.addEventListener(eventType, function(event) {
                if (! headerCellPhone.contains(event.target) && !accordion.contains(event.target) && !iconList.contains(event.target) && accordion.classList.contains("accordion-active")) {
                    toggleAccordion();
                    changeIcon();
                    flagIcon = false;
                }
            });        
        };

        function toggleAccordion() {        
            accordion.classList.toggle("accordion-active");
        }
        
        //Show or hidden the content of the dropdowns.
        const contentToLearnHandler = () => {
            toggleDropdown(showToLearnPhone);
            onlyDropdown(showToLearnPhone);
        };
        
        const contentOthersHandler = () => {
            toggleDropdown(showOthersPhone);
            onlyDropdown(showOthersPhone);
        };
                    
        // Show only one dropdown at a time.
        function onlyDropdown(currentDropdown) {
            dropdownBase.forEach(dropdown => {
                if (dropdown !== currentDropdown && dropdown.classList.contains("dropdown-active")) {
                    dropdown.classList.toggle("dropdown-active");
                }
            });
        }

        // Add events.
        window.addEventListener('scroll', scrollHandlerCell);
        iconList.addEventListener(eventType, iconClickHandler);
        contentToLearnPhone.addEventListener(eventType, contentToLearnHandler);
        contentOthersPhone.addEventListener(eventType, contentOthersHandler);

        // Cleanup the logic for cell phone.
        logicSmallDevices.cleanup = () => {
            window.removeEventListener('scroll', scrollHandlerCell); 
            iconList.removeEventListener(eventType, iconClickHandler);
            contentToLearnPhone.removeEventListener(eventType, contentToLearnHandler);
            contentOthersPhone.removeEventListener(eventType, contentOthersHandler);
        };
    }
    // Verify if the function exists and cleanup the cell phone logic.
    function cleanuplogicSmallDevices() {
        if (logicSmallDevices.cleanup) {
            logicSmallDevices.cleanup();
        }
    }

    // Initialization for activate the logic in the small, medium or large devices.
    activateLogic();
    window.addEventListener('resize', activateLogic);


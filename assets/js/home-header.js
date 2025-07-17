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
    iconToLearnExpandMore = document.querySelector(".i-to-learn-expand-more"),
    iconOthersExpandMore = document.querySelector(".i-others-expand-more"),
    showToLearn = document.querySelector(".show-to-learn"),
    contentToLearn = document.querySelector(".content-to-learn"),
    showOthers = document.querySelector(".show-others"),
    contentOthers = document.querySelector(".content-others"),
    _switch = document.querySelectorAll(".switch"),
    hiddenBox = document.querySelector(".hidden-box"),
    parentDropdownLargeDevices = document.querySelectorAll(".dropdown-parent");
    
    let flagMainMenu = false,
    lastScrollY = window.scrollY,
    isSmallDevice = false;

    // Know if the screen is small.
    function isSmallScreen() {
        if (window.matchMedia) {
            return window.matchMedia('(max-width: 767px)').matches;
        } else {
            return window.innerWidth <= 767;
        }
    }

    // Show or hidden the main menu.  
    function showMenu(){
        addSpace.classList.add("more-mt-100px");
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
        addSpace.classList.remove("more-mt-100px");
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
         change.addEventListener("pointerdown", function(){ 
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
     
    // Events of click or touchstart for show the dropdowns.
    contentToLearn.addEventListener("pointerdown", function() {
        changeIconArrow(iconToLearnExpandMore);
        toggleHiddenBox(showToLearn);
        onlyDropdown(showToLearn , parentDropdownLargeDevices);
    });
    contentOthers.addEventListener("pointerdown", function() {
        changeIconArrow(iconOthersExpandMore);
        toggleHiddenBox(showOthers);
        onlyDropdown(showOthers, parentDropdownLargeDevices);
    });
 
    // Change the icon of expand more o less in the dropdowns. 
    function changeIconArrow(iconExpand) {
        iconExpand.innerHTML === "expand_more" ? iconExpand.innerHTML = "expand_less" : iconExpand.innerHTML = "expand_more";
    }
    // Show or hidden the dropdowns.
    function toggleHiddenBox(ShowDropdown) {
        ShowDropdown.classList.toggle("hidden-box-active");
    }

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
    
    // Show only one dropdown at a time.
    function onlyDropdown(currentDropdown, parentDropdown) {
        parentDropdown.forEach(dropdown => {
            const box = dropdown.querySelector(".hidden-box"),
                  elementI = dropdown.querySelector("i");

            if ((box && elementI) && (box !== currentDropdown) && (box.classList.contains("hidden-box-active"))) {
                elementI.innerHTML = "expand_more";
                box.classList.remove("hidden-box-active");
            }
        });
    }

    // Main logic large devices.
    function logicLargeDevices(){
        
        // Show or hidden the content of the dropdowns.
        contentToLearn.addEventListener("mouseenter", function() { 
            toggleHiddenBox(showToLearn);
            changeIconArrow(iconToLearnExpandMore);
            onlyDropdown(showToLearn,parentDropdownLargeDevices);
        });
        showToLearn.addEventListener("mouseleave", function() {
            changeIconArrow(iconToLearnExpandMore);
            toggleHiddenBox(showToLearn);
        });
        contentOthers.addEventListener("mouseenter", function() {
            toggleHiddenBox(showOthers);
            changeIconArrow(iconOthersExpandMore);
            onlyDropdown(showOthers,parentDropdownLargeDevices);
        });
        showOthers.addEventListener("mouseleave", function() {
            toggleHiddenBox(showOthers);
            changeIconArrow(iconOthersExpandMore);
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

    // Main logic small devices.
    function logicSmallDevices() {

        //initialize variables.
        const headerCellPhone = document.querySelector('.header-cell-phone'),
            accordion = document.querySelector(".accordion-base"),
            iconList = document.querySelector(".menu-navegation"),
            iconExpandMoreToLearn = document.querySelector(".accordion-base .i-to-learn-expand-more"),
            iconExpandMoreOthers = document.querySelector(".accordion-base .i-others-expand-more"),
            contentToLearnPhone = document.querySelector(".accordion-base .content-to-learn"),
            showToLearnPhone = document.querySelector(".accordion-base .show-to-learn"),
            contentOthersPhone = document.querySelector(".accordion-base .content-others"),
            showOthersPhone = document.querySelector(".accordion-base .show-others"),
            parentDropdownSmallDevices = document.querySelectorAll(".accordion-base .dropdown-parent");
        
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
                changeIconSidebar();
                flagIcon = true;
            }else{
                toggleAccordion();
                changeIconSidebar();
                flagIcon = false;
            }
            
            function changeIconSidebar() {
                iconList.classList.toggle("bi-list");
                iconList.classList.toggle("bi-x");
            }

            document.addEventListener("pointerdown", function(event) {
                event.preventDefault();
                if (! headerCellPhone.contains(event.target) && !accordion.contains(event.target) && !iconList.contains(event.target) && accordion.classList.contains("accordion-active")) {
                    toggleAccordion();
                    changeIconSidebar();
                    flagIcon = false;
                }
            });        
        };

        function toggleAccordion() {        
            accordion.classList.toggle("accordion-active");
        }
        
        // Show or hidden the content of the dropdowns.
        const contentToLearnHandler = () => {
            toggleHiddenBox(showToLearnPhone);
            onlyDropdown(showToLearnPhone , parentDropdownSmallDevices);
            changeIconArrow(iconExpandMoreToLearn);
        };
        
        const contentOthersHandler = () => {
            toggleHiddenBox(showOthersPhone);
            onlyDropdown(showOthersPhone , parentDropdownSmallDevices);  
            changeIconArrow(iconExpandMoreOthers);
        };
                
        // Add events.
        window.addEventListener('scroll', scrollHandlerCell);
        iconList.addEventListener("pointerdown", iconClickHandler);
        contentToLearnPhone.addEventListener("pointerdown", contentToLearnHandler);
        contentOthersPhone.addEventListener("pointerdown", contentOthersHandler);

        // Cleanup the logic for cell phone.
        logicSmallDevices.cleanup = () => {
            window.removeEventListener('scroll', scrollHandlerCell); 
            iconList.removeEventListener("pointerdown", iconClickHandler);
            contentToLearnPhone.removeEventListener("pointerdown", contentToLearnHandler);
            contentOthersPhone.removeEventListener("pointerdown", contentOthersHandler);
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


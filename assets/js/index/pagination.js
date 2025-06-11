/**
 * File: pagination.js
 * Description: Provides the logic for paginating articles on the index page.
 * It includes:
 *    - Calculating the page range to display based on the current page and total pages.
 *    - Dynamically creating and rendering pagination controls with active and disabled states.
 *    - Handling user interaction to load the corresponding set of articles.
 *    - Clearing pagination when necessary.
 * 
 * Dependencies:
 *    - assets/js/index.js: for article display logic (showArticles, lastArticlesSearched).
 *    - assets/index.html: for HTML structure and .pagination container.
 * 
 */

import { showArticles, lastArticlesSearched } from "../index.js";

const paginationList = document.querySelector('.pagination');

// Calculate the pages to show
function getPagination(currentPage, totalPages) {
    const pages = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible) {
        for (let i = 1; i <= totalPages; i++) {     
            pages.push(i);
        }
    } else {
        pages.push(1);
        let start, end;
        if (currentPage <= 3) {
            start = 2;
            end = 5;
        } else if (currentPage >= totalPages - 2) {
            start = totalPages - 4;
            end = totalPages - 1;
        } else {
            start = currentPage - 2;
            end = currentPage + 2;
        }
        if (start > 2) {
            pages.push('...');
        }

        for (let i = start; i <= end; i++) {
            pages.push(i);
        }

        if (end < totalPages - 1) {
            pages.push('...');
        }
        pages.push(totalPages);
    }

    return pages;
}

// Create and show the pagination. 
export function renderPagination(current, total) {
    
    clearPagination();

    const createPageItem = (label, page, isActive = false, isDisabled = false, isIcon = false) => {
        const li = document.createElement('li');
        if (isIcon) {
            li.innerHTML = label;
        } else {
            li.textContent = label;
        }
        if (isActive) li.classList.add('active', 'bold-number');
        if (isDisabled) li.classList.add('disabled');
        if (!isDisabled && label !== '...') {
            li.addEventListener('click', () => showArticles(lastArticlesSearched, page));
            if(!isActive){
                li.classList.add('cursor-pointer');
            }
        } else if (label === '...') {
            li.classList.add('dots');
        }
        return li;
    };
    // Create the pagination items
    paginationList.appendChild(
        createPageItem('<i class="bi bi-caret-left-fill cursor-pointer"></i>', Math.max(1, current - 1), false, current === 1, true)
    );

    const pages = getPagination(current, total);

    pages.forEach(page => {
        const isActive = page === current;
        paginationList.appendChild(createPageItem(page, page, isActive));
    });

    paginationList.appendChild(
        createPageItem('<i class="bi bi-caret-right-fill cursor-pointer"></i>', Math.min(total, current + 1), false, current === total, true)
    );
}
// Clear the pagination 
export function clearPagination() {
    if (paginationList && paginationList.children.length > 0) {
        paginationList.innerHTML = '';
    }
}

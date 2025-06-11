/**
 *  File: search.js
 *  Description: This file manages the behavior of the search on firebase searching for 
 *  keywords or title of the required articles for the user. 

 *  Dependencies: 
 *       - /assets/js/data_bases/firebase.js: load the firebase configuration. 
 *       - ./index.js: load the Validation of the articles consulted.
 *     
*/

import { loadFirebaseConfig } from "/assets/js/data_bases/firebase.js";
import { thereAreArticlesInTheQuery } from '../index.js';

const textarea = document.querySelector('.textarea-search');// Duplicated variable in index.js

// Start the search on firebase for keywords or title.
async function startSearch() {
    const { db } = await loadFirebaseConfig();
    const searchArticle = textarea.value.trim().toLowerCase();
    const { collection, getDocs, query, where, orderBy,limit, startAt, endAt } = await import("https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js");
    const articlesRef = collection(db, "Articles");

    const keywordResults = await getArticlesKeywords(getDocs, query, where, orderBy, limit, searchArticle, articlesRef);
    if(thereAreArticlesInTheQuery(keywordResults, false)){
        return; 
    }

    const titleResults = await getArticles(getDocs, query, where, orderBy, limit, startAt, endAt, searchArticle, articlesRef);
    thereAreArticlesInTheQuery(titleResults, true);    
}

// Search the articles for keywords 
async function getArticlesKeywords(getDocs, query, where, orderBy, limit, searchArticle, articlesRef) {
    try {
        const q1 = query(articlesRef, where("keywords", "array-contains", searchArticle) , orderBy("createdAt", "desc"), limit(100));
        const querySnapshot1 = await getDocs(q1);

        if (!querySnapshot1.empty) {
            return querySnapshot1.docs.map(doc => doc.data());
        }
    } catch (error) {
        console.error("Error al obtener artículos por palabras clave:", error);
    }
    return [];
}
// Search the articles for title
async function getArticles(getDocs, query, where, orderBy, limit, startAt, endAt, searchArticle, articlesRef) {
    
    try {
        const q2 = query(articlesRef, where("title", "==", searchArticle), orderBy("createdAt", "desc"), limit(100));
        const q3 = query(articlesRef, orderBy("title"), startAt(searchArticle), endAt(searchArticle + "\uf8ff"), limit(100));
        const [querySnapshot2, querySnapshot3] = await Promise.all([getDocs(q2), getDocs(q3)]);
        const results = new Map();

        const sortedResults = querySnapshot3.docs.map(doc => ({ id: doc.id, ...doc.data() }))
        .sort((a, b) => b.createdAt.seconds - a.createdAt.seconds);
      
        querySnapshot2.forEach(doc => results.set(doc.id, doc.data()));
        sortedResults.forEach(article => results.set(article.id, article));
        
        return Array.from(results.values());
    } catch (error) {
        console.error("Error al obtener artículos por título:", error);
    }  
    return [];
}

// Export the function to other files.
export {startSearch};


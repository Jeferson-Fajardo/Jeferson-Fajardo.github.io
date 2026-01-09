/**
*  File: words-phrases-search.js
 *  Description: This file manages the behavior of the carousel on firebase searching for
 *  words and phrases every time the user reload the page.
 *
 *  Dependencies:
 *       - /assets/js/data_bases/firebase.js: load the firebase configuration.
 *       - index.html: asign the structure and the data of the carousel.
 *
 */

// Import Firebase configuration
import { loadFirebaseConfig } from "/assets/js/data_bases/firebase.js";

// Get Firestore database instance
const { db } = await loadFirebaseConfig();
const { collection, getDocs, query, where, orderBy, limit, Timestamp } = await import("https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js");

// Set current and last month timestamps
const now = Timestamp.fromDate(new Date());
const lastMonthDate = new Date();
lastMonthDate.setMonth(lastMonthDate.getMonth() - 1);
const lastMonth = Timestamp.fromDate(lastMonthDate);

// Query Firestore for recent documents, fallback to latest if empty
async function queries(dbName, limitN, firstField, secondField) {

    const query1 = query(
        collection(db, dbName),
        where("createdAt", ">=", lastMonth),
        where("createdAt", "<=", now),
        orderBy("createdAt", "desc"),
        limit(limitN)
    );
    const query2 = query(
        collection(db, dbName),
        orderBy("createdAt", "desc"),
        limit(limitN)
    );

    const querySnapshot = await queriesEmpty(query1, query2);
    const list = querySnapshot.docs.map(doc => ({
        [firstField]: doc.data()[firstField],
        [secondField]: doc.data()[secondField]
    }));
    return list;
}

// Execute query1, fallback to query2 if no results
async function queriesEmpty(query1, query2) {
    const snapshot1 = await getDocs(query1);
    return snapshot1.empty ? await getDocs(query2) : snapshot1;
}

// Get random unique items from Firestore results
async function getPhrasesOrWords(dbName, limitN, itemsNumber, firstField, secondField) {
    const arrayFirebase = await queries(dbName, limitN, firstField, secondField);
    const items = [];
    const usedIndexes = new Set();
    const maxItems = Math.min(itemsNumber, arrayFirebase.length);
    while (items.length < maxItems) {
        const index = Math.floor(Math.random() * arrayFirebase.length);
        if (!usedIndexes.has(index)) {
            usedIndexes.add(index);
            items.push(arrayFirebase[index]);
        }
    }
    return items;
}

// Fetch phrases and words from Firestore
const [phrases, words] = await Promise.all([
    getPhrasesOrWords("Phrases", 20, 6, "phrase", "author"),
    getPhrasesOrWords("Words", 16, 4, "word", "author")
]);

// Select carousel DOM elements for phrases and words
const spansPhrase = document.querySelectorAll(".carousel .carousel-content-one .phrase");
const phraseCloneSpans = document.querySelectorAll(".carousel .carousel-content-two .phrase");
const spansWord = document.querySelectorAll(".carousel .carousel-content-one .word");
const wordCloneSpans = document.querySelectorAll(".carousel .carousel-content-two .word");

// Fill carousel spans with fetched data
function fillSpans(spans, data, field) {
    spans.forEach((span, i) => {
        if (data[i]) {
            span.classList.toggle("d-none");
            span.textContent = data[i][field];
        }
    });
}
function fillCloneSpans(spans, data, field) {
  const reversed = [...data].reverse();
  spans.forEach((span, i) => {
    if (reversed[i]) {
      span.classList.toggle("d-none");
      span.textContent = reversed[i][field];
    } 
  });
}
// Call the functions to fill the spans
fillSpans(spansPhrase, phrases, "phrase");
fillSpans(spansWord, words, "word");
fillCloneSpans(phraseCloneSpans, phrases, "phrase");
fillCloneSpans(wordCloneSpans, words, "word");


/**
 *  File: firebase.js
 *  Description: this file is used to load the firebase configuration from the config.json file
 *  and initialize the firebase app and firestore database.
 *      
 *  Dependencies: 
 *       - cdn: cdn/firebase/10.8.0/firebase-app.js, cdn/firebase/10.8.0/firebase-analytics.js, cdn/firebase/10.8.0/firebase-firestore.js
 *     
*/

// Load the packages from the CDN for firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-analytics.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

// Load the firebase configuration from the config.json file
async function loadFirebaseConfig() {
 
  const response = await fetch("/assets/config.json");
  const firebaseConfig = await response.json();

  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
  const db = getFirestore(app);

  return { app, db };
}
// Export the function to other files
export { loadFirebaseConfig };

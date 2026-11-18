// =====================================================================
//  CONFIGURATION FIREBASE
//  1) Remplacez ce bloc par celui que Firebase vous donne
//     (Console Firebase > Paramètres du projet > Vos applications > Config).
//  Ces clés ne sont pas secrètes : la sécurité est assurée par les règles
//  Firestore (fichier firestore.rules) et par App Check.
//  Tant que ce bloc n'est pas rempli, l'application fonctionne en
//  « mode local » (données gardées sur l'appareil uniquement).
// =====================================================================
window.FIREBASE_CONFIG = {
  apiKey: "AIzaSyB0e9Qo-Rpenx7dkaqw6q1QxJEvbcDwxYQ",
  authDomain: "objectif-10km-9b873.firebaseapp.com",
  projectId: "objectif-10km-9b873",
  storageBucket: "objectif-10km-9b873.firebasestorage.app",
  messagingSenderId: "559685758754",
  appId: "1:559685758754:web:3cdac66a08b54741ddbf7b"
};

// 2) Pour le Coach IA et la lecture des photos d'emploi du temps :
//    clé de site reCAPTCHA Enterprise utilisée par App Check (voir le guide).
window.APP_CHECK_SITE_KEY = "6Lcu0CYuAAAAABE1xjoLjiqyjif2c_MgHFC_PWBf";

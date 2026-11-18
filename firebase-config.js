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
  apiKey: "COLLER_ICI",
  authDomain: "COLLER_ICI",
  projectId: "COLLER_ICI",
  storageBucket: "COLLER_ICI",
  messagingSenderId: "COLLER_ICI",
  appId: "COLLER_ICI"
};

// 2) Pour le Coach IA et la lecture des photos d'emploi du temps :
//    clé de site reCAPTCHA Enterprise utilisée par App Check (voir le guide).
window.APP_CHECK_SITE_KEY = "COLLER_ICI";

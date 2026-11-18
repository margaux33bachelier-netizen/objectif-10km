# 🏃‍♀️ Objectif 10 km de Bordeaux

Application d'entraînement pour Margaux et Charlotte : plan de 50 semaines pour débutantes, calendrier calé sur vos emplois du temps, suivi des séances avec conseils, décompte avant la course et barre de progression.

- **Hébergement :** GitHub Pages (gratuit)
- **Données partagées :** Firebase (Google, gratuit)
- **Installation :** sur l'écran d'accueil de vos téléphones, avec son icône. Elle fonctionne aussi sans réseau, et les changements sont envoyés dès que la connexion revient.

---

## Mise en route (environ 20 minutes, à faire une seule fois)

### 1. Créer le projet Firebase
1. Allez sur <https://console.firebase.google.com> et connectez-vous avec un compte Google.
2. **Créer un projet**, nommé par exemple `objectif-10km`. Vous pouvez désactiver Google Analytics.
3. Sur la page d'accueil du projet, cliquez sur l'icône **Web `</>`** pour ajouter une application web. Donnez-lui un nom, ne cochez pas « Firebase Hosting », puis cliquez sur **Enregistrer**.
4. Firebase affiche un bloc `const firebaseConfig = { apiKey: "...", ... }`. Copiez les 6 valeurs dans le fichier **`firebase-config.js`** à la place de `COLLER_ICI`.

### 2. Créer vos deux comptes
1. Dans le menu de gauche : **Créer > Authentication > Commencer**.
2. Onglet **Méthode de connexion**, choisissez **Adresse e-mail/Mot de passe**, cochez **Activer**, puis **Enregistrer**.
3. Onglet **Utilisateurs**, cliquez sur **Ajouter un utilisateur** et créez un compte pour Margaux, puis un pour Charlotte (e-mail + mot de passe).
4. Onglet **Paramètres > Domaines autorisés**, cliquez sur **Ajouter un domaine** et saisissez `VOTRE-PSEUDO-GITHUB.github.io`.

> Personne d'autre ne peut créer de compte : l'application n'a pas de bouton « s'inscrire ».

### 3. Créer la base de données
1. Menu de gauche : **Créer > Firestore Database > Créer une base de données**.
2. Région : **europe-west9 (Paris)**. Mode : **production**.
3. Onglet **Règles** : remplacez tout le contenu par celui du fichier **`firestore.rules`**, en mettant vos **deux vraies adresses e-mail** (en minuscules), puis cliquez sur **Publier**.

### 4. Mettre l'application en ligne avec GitHub Pages
1. Envoyez tous les fichiers de ce dossier dans votre dépôt GitHub, avec `firebase-config.js` rempli.
2. Sur GitHub, dans le dépôt : **Settings > Pages**. Sous « Build and deployment », choisissez **Deploy from a branch**, puis la branche **main** et le dossier **/ (root)**. Cliquez sur **Save**.
3. Après 1 à 2 minutes, l'application est en ligne à l'adresse `https://VOTRE-PSEUDO-GITHUB.github.io/NOM-DU-DEPOT/`.

### 5. Installer l'application sur vos téléphones
- **iPhone :** ouvrez l'adresse dans **Safari**, touchez **Partager** puis **Sur l'écran d'accueil**.
- **Android :** ouvrez l'adresse dans **Chrome**, touchez le menu **⋮** puis **Installer l'application** (ou **Ajouter à l'écran d'accueil**).

Chacune se connecte ensuite avec son e-mail et son mot de passe.

---

## Bon à savoir
- **La date de la course** est estimée au dimanche 7 novembre 2027, car la date officielle n'est pas encore publiée. Vous pourrez la corriger dans **Réglages** : tout le plan s'ajuste automatiquement.
- **Importer un emploi du temps :** exportez votre agenda en fichier `.ics` (Google Agenda, Outlook, Hyperplanning…) ou utilisez un `.csv` avec les colonnes `jour;début;fin;libellé`, par exemple `lundi;08:30;12:00;Cours`. Les créneaux qui se répètent chaque semaine sont reconnus.
- **Mettre l'application à jour :** modifiez les fichiers sur GitHub. Les téléphones récupèrent la nouvelle version à la prochaine ouverture avec du réseau. En cas de changement important, modifiez aussi la ligne `const CACHE = 'run10k-v1'` dans `sw.js` (v2, v3…).
- **Coût :** le plan gratuit de Firebase (« Spark ») suffit très largement pour deux personnes. Aucune carte bancaire n'est demandée.

## Fichiers
| Fichier | Rôle |
|---|---|
| `index.html` | L'application (pages, plan d'entraînement, calendrier, conseils) |
| `fb.js` | Connexion à Firebase (comptes + base de données) |
| `firebase-config.js` | **À remplir** avec la configuration de votre projet Firebase |
| `firestore.rules` | Règles de sécurité à coller dans Firebase (avec vos e-mails) |
| `manifest.webmanifest`, `sw.js`, `icons/` | Ce qui rend l'application installable et utilisable hors ligne |

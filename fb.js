// Connexion à Firebase (authentification + base de données Firestore).
// Expose window.FB pour le reste de l'application.
const V = '10.14.1';
const cfg = window.FIREBASE_CONFIG;
const configured = cfg && cfg.apiKey && !String(cfg.apiKey).startsWith('COLLER');

async function boot() {
  if (!configured) { window.FB = null; return; }
  const [{ initializeApp }, A, F] = await Promise.all([
    import(`https://www.gstatic.com/firebasejs/${V}/firebase-app.js`),
    import(`https://www.gstatic.com/firebasejs/${V}/firebase-auth.js`),
    import(`https://www.gstatic.com/firebasejs/${V}/firebase-firestore.js`)
  ]);
  const app = initializeApp(cfg);
  const auth = A.getAuth(app);
  await A.setPersistence(auth, A.browserLocalPersistence).catch(() => {});
  let fs;
  try {
    fs = F.initializeFirestore(app, { localCache: F.persistentLocalCache({ tabManager: F.persistentMultipleTabManager() }) });
  } catch (e) {
    fs = F.getFirestore(app);
  }
  const ref = p => {
    const parts = p.split('/');
    return parts.length % 2 === 0 ? F.doc(fs, ...parts) : F.collection(fs, ...parts);
  };
  window.FB = {
    onAuth: cb => A.onAuthStateChanged(auth, cb),
    login: (email, pass) => A.signInWithEmailAndPassword(auth, email, pass),
    logout: () => A.signOut(auth),
    reset: email => A.sendPasswordResetEmail(auth, email),
    set: (p, d) => F.setDoc(ref(p), d),
    del: p => F.deleteDoc(ref(p)),
    onDoc: (p, cb, err) => F.onSnapshot(ref(p), s => cb({ exists: s.exists(), data: s.data(), fromCache: s.metadata.fromCache }), err),
    onCol: (p, cb, err) => F.onSnapshot(ref(p), q => cb(q.docs.map(d => ({ id: d.id, data: d.data() }))), err)
  };
}

boot()
  .catch(e => { console.error('Firebase', e); window.FB = undefined; window.FB_ERROR = e; })
  .finally(() => { window.FB_READY = true; window.dispatchEvent(new Event('fb-ready')); });

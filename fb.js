// Connexion à Firebase : comptes, base de données Firestore et IA (Gemini via Firebase AI Logic).
// Expose window.FB pour le reste de l'application.
const V = '12.19.0';
const SDK = name => `https://www.gstatic.com/firebasejs/${V}/firebase-${name}.js`;
const cfg = window.FIREBASE_CONFIG;
const configured = cfg && cfg.apiKey && !String(cfg.apiKey).startsWith('COLLER');
// Modèles essayés dans l'ordre (le premier disponible est gardé).
const MODELS = (window.AI_MODELS && window.AI_MODELS.length) ? window.AI_MODELS
  : ['gemini-3.5-flash', 'gemini-3.5-flash-lite', 'gemini-2.5-flash'];

async function boot() {
  if (!configured) { window.FB = null; return; }
  const [{ initializeApp }, A, F] = await Promise.all([import(SDK('app')), import(SDK('auth')), import(SDK('firestore'))]);
  const app = initializeApp(cfg);

  // App Check (obligatoire pour l'IA) : protège l'accès à Gemini
  const siteKey = window.APP_CHECK_SITE_KEY;
  if (siteKey && !String(siteKey).startsWith('COLLER')) {
    try {
      const AC = await import(SDK('app-check'));
      AC.initializeAppCheck(app, { provider: new AC.ReCaptchaEnterpriseProvider(siteKey), isTokenAutoRefreshEnabled: true });
    } catch (e) { console.warn('App Check', e); }
  }

  const auth = A.getAuth(app);
  await A.setPersistence(auth, A.browserLocalPersistence).catch(() => {});
  let fs;
  try {
    fs = F.initializeFirestore(app, { localCache: F.persistentLocalCache({ tabManager: F.persistentMultipleTabManager() }) });
  } catch (e) { fs = F.getFirestore(app); }
  const ref = p => {
    const parts = p.split('/');
    return parts.length % 2 === 0 ? F.doc(fs, ...parts) : F.collection(fs, ...parts);
  };

  // ---- IA ----
  let AIM = null, goodModel = null;
  async function withModel(run) {
    if (!auth.currentUser) throw Object.assign(new Error('Connectez-vous d’abord.'), { code: 'not-signed-in' });
    if (!AIM) AIM = await import(SDK('ai'));
    const ai = AIM.getAI(app, { backend: new AIM.GoogleAIBackend() });
    const list = goodModel ? [goodModel] : MODELS;
    let last;
    for (const m of list) {
      try {
        const r = await run(AIM.getGenerativeModel(ai, { model: m }));
        goodModel = m; return r;
      } catch (e) {
        last = e;
        const msg = String(e && (e.message || e.code) || '');
        if (!/not found|404|not supported|is not found|NOT_FOUND/i.test(msg)) throw e; // autre erreur : on arrête
      }
    }
    throw last;
  }
  const blobToB64 = b => new Promise((res, rej) => { const r = new FileReader(); r.onload = () => res(String(r.result).split(',')[1]); r.onerror = rej; r.readAsDataURL(b); });

  window.FB = {
    onAuth: cb => A.onAuthStateChanged(auth, cb),
    login: (email, pass) => A.signInWithEmailAndPassword(auth, email, pass),
    logout: () => A.signOut(auth),
    reset: email => A.sendPasswordResetEmail(auth, email),
    set: (p, d) => F.setDoc(ref(p), d),
    del: p => F.deleteDoc(ref(p)),
    onDoc: (p, cb, err) => F.onSnapshot(ref(p), s => cb({ exists: s.exists(), data: s.data(), fromCache: s.metadata.fromCache }), err),
    onCol: (p, cb, err) => F.onSnapshot(ref(p), q => cb(q.docs.map(d => ({ id: d.id, data: d.data() }))), err),
    // Texte en direct (le texte s'affiche au fur et à mesure)
    aiText: (prompt, onText) => withModel(async model => {
      const res = await model.generateContentStream(prompt);
      let text = '';
      for await (const chunk of res.stream) { text += chunk.text(); if (onText) onText(text); }
      return text;
    }),
    // Lecture d'une image (photo d'emploi du temps)
    aiImage: (prompt, blob) => withModel(async model => {
      const data = await blobToB64(blob);
      const res = await model.generateContent([prompt, { inlineData: { data, mimeType: blob.type || 'image/jpeg' } }]);
      return res.response.text();
    })
  };
}

boot()
  .catch(e => { console.error('Firebase', e); window.FB = undefined; window.FB_ERROR = e; })
  .finally(() => { window.FB_READY = true; window.dispatchEvent(new Event('fb-ready')); });

# 🌐 Portfolio — Roland Aksanti Myaka

Portfolio professionnel **Roland A. Myaka** — Développeur Web Full-Stack, Expert IA & Tuteur d'anglais.

---

## 📁 Structure des fichiers

```
portfolio/
├── index.html       ← Page principale (toutes les sections)
├── style.css        ← Tous les styles (variables, thèmes, responsive)
├── script.js        ← JavaScript (animations, toggle, typing, formulaire)
├── merci.html       ← Page de remerciement après envoi du formulaire
├── images/
│   └── photo.svg    ← Placeholder photo de profil (à remplacer)
└── README.md        ← Ce fichier
```

---

## 🚀 Lancer le site en local

### Option 1 — Simplement ouvrir le fichier (sans formulaire)
Double-cliquez sur `index.html`. Le site s'ouvre dans votre navigateur.  
> ⚠️ Le formulaire Netlify ne fonctionnera **pas** en local (c'est normal).

### Option 2 — Avec un serveur local (recommandé)

**Avec VS Code :**
1. Installez l'extension **Live Server**
2. Clic droit sur `index.html` → "Open with Live Server"

**Avec Node.js :**
```bash
npx serve .
# Ouvrez http://localhost:3000
```

**Avec Python :**
```bash
python -m http.server 8000
# Ouvrez http://localhost:8000
```

---

## 📸 Ajouter votre vraie photo

1. Copiez votre photo dans le dossier `images/`
2. Renommez-la `photo.jpg` (ou `.png`, `.webp`)
3. Dans `index.html`, cherchez les deux lignes :
   ```html
   <img src="images/photo.svg" alt="Roland A. Myaka ..." class="avatar-photo"/>
   ```
4. Remplacez `.svg` par `.jpg` (ou votre extension)

> 💡 **Conseil** : utilisez une photo carrée ou portrait, minimum 400×400px.

---

## ✏️ Modifier le contenu facilement

### Changer le titre / tagline Hero
Dans `index.html`, cherchez `hero-name` :
```html
<h1 class="hero-name">
  Roland A.<br>
  <span class="name-accent">Myaka</span>
</h1>
```

### Changer les mots du typing effect
Dans `script.js`, modifiez le tableau `words` :
```js
const words = [
  'Développeur Web',
  'Expert en IA',
  'Polyglotte',
  'Tuteur d\'anglais',
  'Freelance',
];
```

### Modifier les projets
Cherchez `PROJET 1`, `PROJET 2`, etc. dans `index.html` et modifiez :
- Le titre (`proj-title`)
- La description (`proj-desc`)
- Les tags (`proj-tag`)
- Les liens `href="#"` → mettez vos vraies URLs

### Mettre de vraies images de projets
Pour chaque projet, remplacez le bloc `proj-placeholder` par :
```html
<img src="images/projet-1.jpg" alt="Nom du projet" class="proj-img" loading="lazy"/>
```

### Changer les liens de contact
Cherchez `VOTRE_NUMERO`, `VOTRE_PROFIL`, `VOTRE_USERNAME`, `VOTRE@EMAIL.COM` dans `index.html`.

---

## 🎨 Modifier les couleurs

Dans `style.css`, les couleurs sont dans les variables CSS :
```css
:root {
  --accent: #007BFF;   /* Bleu électrique (mode jour) */
}
[data-theme="dark"] {
  --accent: #6C63FF;   /* Violet (mode nuit) */
}
```
Changez simplement ces valeurs hexadécimales.

---

## 📬 Configurer le formulaire Netlify

Le formulaire est **déjà configuré** pour Netlify. Rien à coder !

### Étapes après déploiement :
1. Déployez sur Netlify (voir ci-dessous)
2. Allez dans votre dashboard Netlify
3. Menu **Forms** → votre formulaire `contact` apparaît automatiquement
4. Configurez les **notifications email** : Settings → Forms → Form notifications

> Le formulaire redirige vers `merci.html` après envoi.  
> La protection anti-spam (honeypot) est déjà intégrée.

---

## ☁️ Déployer sur Netlify (gratuit)

### Méthode 1 — Drag & Drop (la plus rapide)
1. Allez sur [netlify.com](https://netlify.com) et créez un compte gratuit
2. Dans le dashboard, glissez-déposez **tout le dossier `portfolio/`** dans la zone prévue
3. C'est fait ! Vous obtenez une URL du type `https://random-name.netlify.app`
4. Optionnel : allez dans **Site Settings → Domain management** pour changer l'URL

### Méthode 2 — Via GitHub (recommandée pour mises à jour auto)
1. Créez un repo GitHub et poussez votre code :
   ```bash
   git init
   git add .
   git commit -m "Initial portfolio"
   git branch -M main
   git remote add origin https://github.com/VOTRE_USERNAME/portfolio.git
   git push -u origin main
   ```
2. Sur Netlify : **New site from Git** → connectez votre repo GitHub
3. Build settings : laissez vide (site statique)
4. Cliquez **Deploy site**

> ✅ Chaque `git push` déclenchera automatiquement un nouveau déploiement.

---

## ☁️ Déployer sur Vercel (alternative)

> ⚠️ Le formulaire Netlify **ne fonctionnera pas** sur Vercel.  
> Pour Vercel, remplacez le formulaire par une solution alternative (Formspree, EmailJS).

### Avec Vercel CLI :
```bash
npm install -g vercel
vercel
# Suivez les instructions
```

### Via GitHub :
1. Allez sur [vercel.com](https://vercel.com) → New Project
2. Importez votre repo GitHub
3. Framework Preset : **Other** (pas de framework)
4. Cliquez **Deploy**

---

## 🔧 Personnalisations avancées

### Ajouter/supprimer une section
1. Dans `index.html` : copiez ou supprimez le bloc `<section>` correspondant
2. Dans `style.css` : ajoutez les styles si nécessaire
3. Dans le `<nav>` : ajoutez/supprimez le lien correspondant

### Modifier les polices
Dans `index.html` (balise `<link>` Google Fonts) et dans `style.css` :
```css
--font-title: 'Poppins', sans-serif;
--font-body:  'DM Sans', sans-serif;
--font-mono:  'JetBrains Mono', monospace;
```

### Changer la vitesse des animations
Dans `script.js` :
```js
const TYPING_SPEED   = 90;   // ms par caractère (écriture)
const DELETING_SPEED = 50;   // ms par caractère (suppression)
const PAUSE_AFTER    = 1800; // pause après mot complet
```

---

## 🛠️ Technologies utilisées

| Technologie | Utilisation |
|---|---|
| HTML5 sémantique | Structure du site |
| CSS3 (variables, Grid, Flexbox) | Styles & responsive |
| JavaScript vanilla (ES6+) | Animations, toggle, typing |
| Google Fonts | Poppins + DM Sans + JetBrains Mono |
| Netlify Forms | Formulaire de contact sans backend |
| Intersection Observer API | Animations au scroll |
| localStorage | Mémorisation du thème |

---

## 📋 Checklist avant mise en ligne

- [ ] Remplacer `images/photo.svg` par votre vraie photo
- [ ] Mettre vos vrais liens WhatsApp, LinkedIn, GitHub, Email dans la section Contact
- [ ] Remplir les liens live/GitHub de chaque projet
- [ ] Ajouter des vraies images de projets
- [ ] Vérifier le formulaire Netlify après déploiement
- [ ] Mettre votre vraie URL dans les meta OG (`index.html`)
- [ ] Tester sur mobile

---

*Développé avec ❤️ par Roland A. Myaka*

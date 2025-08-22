# README-frontend

# 📦 Easy Stock – Supply Chain Management (Frontend)

Application frontend pour la gestion d'Easy_stock |SCM (**produits, fournisseurs, commandes, profil, paramètres**) avec authentification et thème clair/sombre.

Construit avec **React 18, Vite, TailwindCSS, DaisyUI, React Router, lucide-react, Axios**.

## 🚀 Fonctionnalités

- **Authentification** (login mock, redirection automatique vers Dashboard).
- **Dashboard** avec statistiques (produits, commandes, fournisseurs).
- **Produits** : liste et ajout.
- **Fournisseurs** : liste et ajout.
- **Commandes** : liste et création.
- **Profil utilisateur**.
- **Paramètres** : thème clair/sombre, 2FA ON/OFF.
- **Sidebar fixe sur desktop**, **drawer animé sur mobile**.
- **API mock intégrée** (utilisable sans backend).

## 🛠️ Installation

### 1. Créer le projet (script auto)

```bash
npm create vite@latest frontend -- --template react
cd frontend
npm install react-router-dom axios lucide-react
npm install -D tailwindcss postcss autoprefixer daisyui
npx tailwindcss init -p

```

### 2. Installer les dépendances

```bash
npm install

```

### 3. Lancer en développement

```bash
npm run dev

```

Accède à : [http://localhost:5173](http://localhost:5173/)

## 🔑 Identifiants de test

Connexion mock par défaut :

```
Email : admin@easy.stock
Mot de passe : admin123

```

## ⚙️ Variables d’environnement

Configure `.env`  :

```
# Backend API
VITE_API_BASE_URL=http://localhost:8000

# Utiliser les données mock intégrées (true/false)
VITE_USE_MOCK=true

```

- Si `VITE_USE_MOCK=true` → données locales mockées.
- Si `false` → requêtes envoyées au backend via Axios.


## 🎨 UI & Responsivité

- **Desktop** :
    - Sidebar fixe à gauche
    - Navbar en haut avec actions utilisateur
- **Mobile** :
    - Sidebar masquée
    - Navbar avec **burger menu** qui ouvre un **drawer animé**

Géré automatiquement par DaisyUI (`drawer`).

## 📦 Build production

```bash
npm run build
npm run preview

```

## ✅ To-do futur

- Authentification complète (JWT avec backend FastAPI).
- Rôles utilisateurs (admin, opérateur).
- Export Excel/PDF pour produits et commandes.
- Graphiques (via Chart.js ou Recharts).

## By Rick
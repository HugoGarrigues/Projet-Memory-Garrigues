# 📚 Memory App

Memory App est une application de révision basée sur le principe de la **répétition espacée**. Elle permet aux utilisateurs de créer et d'organiser des cartes de révision regroupées par thèmes et catégories, puis de les réviser de manière optimisée.

## 🚀 Déploiement du projet

### 📌 Prérequis
- **Node.js**
- **npm**

### 🔧 Installation
1. **Cloner le projet**
   ```sh
   git clone https://github.com/HugoGarrigues/Projet-Memory-Garrigues
   cd memory-app
   ```
2. **Installer les dépendances**
   ```sh
   npm install
   ```
3. **Démarrer l'application**
   ```sh
   npm run dev
   ```

## ✨ Fonctionnalités implémentées

### 📝 Gestion des cartes
- **Création de cartes** : l'utilisateur peut créer des cartes de révision en renseignant un titre, une question et une réponse.
- **Modification de cartes** : l'utilisateur peut modifier les cartes existantes.
- **Suppression de cartes** : l'utilisateur peut supprimer les cartes existantes.

### 📂 Gestion des thèmes
- **Création de thèmes** : l'utilisateur peut créer des thèmes pour regrouper ses cartes de révision.
- **Modification de thèmes** : l'utilisateur peut modifier les thèmes existants.
- **Suppression de thèmes** : l'utilisateur peut supprimer les thèmes existants.

### 📁 Gestion des catégories
- **Création de catégories** : l'utilisateur peut créer des catégories pour organiser ses thèmes.
- **Modification de catégories** : l'utilisateur peut modifier les catégories existantes.
- **Suppression de catégories** : l'utilisateur peut supprimer les catégories existantes.

### 📚 Révision des cartes
- **Révision des cartes** : l'utilisateur peut réviser ses cartes ( pas avec le système de répétition espacée)

### 📬 Notifications
- **Notifications** : l'utilisateur peut configurer des notifications pour être alerté de ses révisions.

### 📱 Mode hors-ligne
- **Mode hors-ligne** : l'application est compatible avec le mode hors-ligne.

### 📱 PWA
- **PWA** : l'application est une Progressive Web App.

### 📱 Responsive
- **Responsive** : l'application est responsive.

---

## 🏗️ Organisation du code
### 📂 Arborescence principale
```
/memory-app
│── /src
│   ├── /store       
│   ├── /assets      
│   ├── /pages      
│   ├── /types      
│   ├── /components      
│   ├── App.tsx      
│   ├── main.tsx
│   └── ...           
│── public
│   ├── *
│── index.html
│── package.json
│── vite.config.ts
│── tailwind.config.js
│── README.md
└── ***

```

### 📌 Technologies utilisées
- **React** (avec Vite + TypeScript)
- **Tailwind CSS** (pour le design)
- **DaisyUI** (pour les composants et le design)
- **React Router** (pour la navigation)
- **Service Worker** (pour le mode hors-ligne)
- **Manifest** (pour la PWA)

---

## 🚧 Problèmes rencontrés
- **Problème de répétition espacée** : je n'ai pas eu le temps d'implémenter le système de répétition espacée.

## 📅 Planning
- Un planning a été mis en place pour organiser le développement du projet. Vous pouvez le consulter [ici](https://github.com/users/HugoGarrigues/projects/5). 

---

## 👨‍💻  Auteur

**GARRIGUES Hugo**
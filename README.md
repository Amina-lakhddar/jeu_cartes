# Jeu des cartes : Empereur, Citoyen, Esclave

Jeu de cartes web où un joueur affronte l'ordinateur en 12 manches. Le projet est réalisé en HTML, JavaScript (modules ES) et Tailwind CSS. Les données (joueurs, historique) sont enregistrées dans le `localStorage` du navigateur : aucun serveur n'est nécessaire.



## Fonctionnalités

- Création, modification, suppression et sélection de profils joueurs (pseudo validé par regex, avatar au choix).
- Mains construites à partir de tableaux, selon le camp du joueur ; cartes de l'ordinateur cachées.
- Duel via la fonction pure `duel(carteJoueur, carteOrdinateur)` 
- Gestion des égalités avec copie des mains (spread `...`).
- Changement de camp après les manches 3, 6 et 9.
- Affichage de l'état de la partie : manche (x/12), groupe (x/4), camp, premier joueur, scores.
- Blocage des clics pendant l'affichage des cartes (impossible de jouer deux fois).
- Fin de partie : message du gagnant, enregistrement dans l'historique, proposition de rejouer.
- Historique des parties, de la plus récente à la plus ancienne, avec recherche par pseudo (insensible à la casse).

## Structure du projet

```
jeu_cartes/
├── game.html          # Page de jeu
├── history.html       # Page de l'historique des parties
├── players.html       # Page de gestion des profils joueurs
├── images/            # Cartes, dos de carte, avatars, logo
├── src/
│   ├── main.js        # Point d'entrée : branche les modules sur chaque page
│   ├── game.js        # Logique du jeu
│   ├── players.js     # Gestion des profils joueurs (CRUD, sélection)
│   ├── history.js     # Affichage et recherche de l'historique
│   ├── storage.js     # Lecture/écriture dans le localStorage
│   ├── input.css      # Styles source (Tailwind + styles personnalisés)
│   └── output.css     # CSS généré par Tailwind (ne pas modifier à la main)
└── README.md
```

## Lancer le projet

### Prérequis

- Un navigateur récent (Chrome, Firefox, Edge).
- [Node.js](https://nodejs.org/) uniquement si vous voulez régénérer le CSS Tailwind.

### Démarrage

Les scripts utilisent des modules ES (`type="module"`) : ouvrir directement le fichier HTML ne fonctionne pas. Il faut un petit serveur local :

1. Ouvrir le dossier dans VS Code.
2. Installer l'extension **Live Server**.
3. Clic droit sur `players.html` puis **Open with Live Server**.

Alternative en ligne de commande :

```bash
npx serve .
```

### Jouer

1. Page **Profil** : créer un joueur (pseudo de 3 à 15 caractères alphanumériques, avatar obligatoire), puis cliquer sur **Sélectionner**.
2. Page **Jouer** : cliquer sur **Commencer le jeu**, puis choisir une carte à chaque duel.
3. À la fin des 12 manches, le résultat s'affiche et la partie est enregistrée.
4. Page **Historique** : consulter les parties et chercher par pseudo.

### Régénérer le CSS (si `input.css` est modifié)

```bash
npx @tailwindcss/cli -i ./src/input.css -o ./src/output.css
```

Ajouter `--watch` pour une régénération automatique.

## Organisation Git

- `main` : version stable.
- `develop` : intégration des fonctionnalités.
- `feature/*` : une branche par fonctionnalité (`feature/game-duel`, `feature/history-filters`, ...), fusionnée dans `develop` puis dans `main`.

## Auteure

Projet réalisé par **Amina Lakhddar**.

# Olympic Games App

Application Angular de visualisation des données des Jeux Olympiques. Affiche les statistiques par pays (médailles, athlètes) avec des graphiques interactifs Chart.js.

## Prérequis

- Node.js
- Angular CLI 18

## Installation

```bash
npm install
```

## Lancement

```bash
ng serve
```

Naviguer vers `http://localhost:4200/`.

## Build

```bash
ng build
```

Les fichiers de build sont dans le dossier `dist/`.

## Architecture

```
src/app/
├── components/          # Composants réutilisables
│   ├── country-chart/   # Graphique bar chart (médailles/athlètes par édition)
│   ├── empty-state/     # Affichage état vide
│   ├── header/          # En-tête avec titre et statistiques
│   ├── medal-chart/     # Graphique pie chart (médailles par pays)
│   ├── stat-line/       # Ligne de statistique (titre/valeur)
│   └── top-bar/         # Barre de navigation avec bouton optionnel
├── models/              # Interfaces TypeScript
│   ├── olympic.ts       # Olympic (pays + participations)
│   ├── participation.ts # Participation (année, ville, médailles, athlètes)
│   └── statline.model.ts
├── pages/               # Pages (routing)
│   ├── home/            # Page d'accueil (pie chart global)
│   ├── country/         # Détail pays (bar chart par édition)
│   └── not-found/       # Page 404
└── services/
    └── data.service.ts  # Service de données
```

## Routes

| Route | Page                                                |
|---|-----------------------------------------------------|
| `/` | Accueil - répartition des médailles par pays        |
| `/country/:countryId` | Détail d'un pays, médailles et athlètes par édition |
| `**` | Page 404                                            |

## Stack technique

- **Angular** 18.0.6
- **Chart.js** 4.2.1
- **RxJS** 7.8.0
- **TypeScript** 5.4.2

## Evolution

- Connexion à une API REST (donnée actuelement mocké) : 

il suffit de remplacer la valeur de la propriété `olympicUrl` dans `data.service.ts` par l'URL de l'endpoint.



## Accessibilite

- Contrastes AA (WCAG 2.1)
- Focus visible sur tous les elements interactifs
- `aria-label` sur la navigation et les boutons
- Descriptions textuelles des graphiques (sr-only)

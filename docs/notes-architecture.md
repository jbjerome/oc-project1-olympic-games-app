# OlympicGamesStarter - Analyse du code
- Date :01/01/2026
- Reviewer : Jean-Baptiste JEROME

## Problèmes identifiés

### 1. Pas de service

Les composants `home` et `country` contienne de l'UI et de la logique métier de plus ils dupliquent du code.

Anti pattern : SRP, DRY, DIP

Solution : Créer un service pour gérer les données et les requêtes HTTP.

### 2. Aucun typage

Les types sont en `any` alors que 2 models sont utilisés : `Participation` (participation a une edition des JO) et `Olympic` (pays et ses participations sous forme de tableau `Participation[]`)

Anti pattern : Pas de typage

Solution : Créer des interfaces pour les types `Participation` et `Olympic` pour éviter le typage `any` et améliorer la lisibilité du code.

### 3. Aucun composant UI

Il n'y a pas de sous-composant UI pour les pages ce qui provoque de la duplication du code

Anti pattern : DRY

Solution : Créer des composants UI pour chaque elements des 2 pages :
- `HeaderComponent`
- `DashboardPage`
- `CountryDetailPage`
- `ChartComponent`

### 4. Observable mal gérés

Les observables sont mal gérés dans les composants `home` et `country` ce qui provoque des problèmes de performance.
- Pipe appelé a vide (code mort)
- Pas de désabonnement (provoque une fuite de mémoire)

Anti pattern : Mauvaise utilisation du ObservablePattern

Solution : Migrer cette logique dans un service dédié, utilisation du pipe et unsubscribe.

### 5. Console.log sur la homepage

Il y a un console.log executé sur la homepage.

``` 
home.component.ts:24:17
Liste des données : [{"id":1,"country":"Italy","participations":[{"id":1,"year":2012,"city":"Londres","medalsCount":28,"athleteCount":372},{"id":2,"year":2016,"city":"Rio de Janeiro","medalsCount":28,"athleteCount":375},{"id":3,"year":2020,"city":"Tokyo","medalsCount":40,"athleteCount":381}]},{"id":2,"country":"Spain","participations":[{"id":1,"year":2012,"city":"Londres","medalsCount":20,"athleteCount":315},{"id":2,"year":2016,"city":"Rio de Janeiro","medalsCount":17,"athleteCount":312},{"id":3,"year":2020,"city":"Tokyo","medalsCount":17,"athleteCount":321}]},{"id":3,"country":"United States","participations":[{"id":1,"year":2012,"city":"Londres","medalsCount":109,"athleteCount":610},{"id":2,"year":2016,"city":"Rio de Janeiro","medalsCount":123,"athleteCount":652},{"id":3,"year":2020,"city":"Tokyo","medalsCount":113,"athleteCount":626}]},{"id":4,"country":"Germany","participations":[{"id":1,"year":2012,"city":"Londres","medalsCount":44,"athleteCount":425},{"id":2,"year":2016,"city":"Rio de Janeiro","medalsCount":44,"athleteCount":422},{"id":3,"year":2020,"city":"Tokyo","medalsCount":37,"athleteCount":425}]},{"id":5,"country":"France","participations":[{"id":1,"year":2012,"city":"Londres","medalsCount":35,"athleteCount":423},{"id":2,"year":2016,"city":"Rio de Janeiro","medalsCount":45,"athleteCount":412},{"id":3,"year":2020,"city":"Tokyo","medalsCount":33,"athleteCount":403}]}]
```

Solution : Le retirer

### 6. Erreur si pays non trouvé

La page Country est en erreur si le pays n'est pas dans le jeu de données.
Ex : http://localhost:4200/country/Test

Solution : il faut gérer cette erreur dans le composant `country` pour afficher un message d'erreur ou rediriger vers une page 404.

## Architecture cible

### 1 . Arborescence

```
src/app/
  ├── components/             <- Composants UI
  │     ├── header/           <- Composant Header
  │     ├── medal-chart/      <- Composant Chart Pie (médailles par pays)
  │     └── country-chart/    <- Composant Chart Line (médailles par année)
  │
  ├── pages/                  <- Pages
  │     ├── home/             <- Dashbaord
  │     ├── country/          <- Country Detail
  │     └── not-found/        <- 404
  │
  ├── models/                 <- Interfaces
  │     ├── olympic.ts        <- Interface de l'objet Olympic
  │     └── participation.ts  <- Interface de l'objet Participation
  │
  ├── services/               <- Services
  │     └── data.service.ts   <- Data service
  │
  ├── app.module.ts
  ├── app.component.ts
  └── app-routing.module.ts
```

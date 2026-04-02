# OlympicGamesStarter - Architecture Overview
- Date :02/04/2026
- Reviewer : Jean-Baptiste JEROME

## File structure

```
src/app/
  ├── components/             <- UI components
  │     ├── header/           <- Page Header Component
  │     ├── stat-line/        <- Stat line Component (card)
  │     ├── medal-chart/      <- Chart Pie Component (home)
  │     └── country-chart/    <- Chart Line Component (country detail)
  │
  ├── pages/                  <- Pages
  │     ├── home/             <- Homepage
  │     ├── country/          <- Country Detail
  │     └── not-found/        <- 404
  │
  ├── models/                 <- Interfaces
  │     ├── olympic.ts        <- Olympic object interface
  │     └── participation.ts  <- Participation object interface
  │
  ├── services/               <- Services
  │     └── data.service.ts   <- Data service
  │
  ├── app.module.ts
  ├── app.component.ts
  └── app-routing.module.ts
```

## Components

### 1 . HeaderComponent

Reusable component that displays the page header (title + key indicators).

Inputs :
- title `string`: the page title displayed at the top
- stats `StatLine[]`: list of indicators to display. Each StatLine contains a title (label) and a value. If the array is empty, the indicators section is hidden.

### 2 . MedalChartComponent

Displays a pie chart showing the total medals per country using Chart.js.

Inputs:
- countries `string[]`: list of country names used as chart labels
- medals `number[]`: total medal count for each country, matching the countries array order

Outputs:
- countryClick `EventEmitter<string>`: emits the country name when the user clicks on a pie slice

Behavior:
- The chart rebuilds automatically when inputs change (via ngOnChanges)
- On click, emits the selected country name so the parent page can handle navigation

### 3 . CountryChartComponent

Displays a line chart showing the medal count per Olympic year for a given country using Chart.js.

Inputs:
- years `number[]`: list of Olympic years used as chart labels (x-axis)
- medals `string[]`: medal count for each year, matching the years array order (y-axis)

Behavior:
- The chart rebuilds automatically when inputs change (via ngOnChanges)
- No user interaction — display only

### 4 . StatLineComponent

Reusable component that displays a single key indicator as a label/value pair.

Inputs:
- title `string`: the indicator label (e.g. "Number of countries")
- value `string | number`: the indicator value (e.g. 5)

Behavior:
- Pure display component, no logic
- Used inside HeaderComponent via *ngFor on a StatLine[] array

##  DataService

Single point of access to the Olympic data. Loads the data once and makes it available to all components.

Methods:
 - `loadInitialData()`: `Observable<Olympic[]>` fetches the JSON data via HTTP, stores it in a BehaviorSubject, and returns the Observable. Called once at app startup by AppComponent.
 - `getOlympics()`: `Observable<Olympic[]>` returns the stored data as an Observable. Components subscribe to this to receive the data without triggering a new HTTP call.

How it works:
 - Uses a BehaviorSubject to cache the data in memory after the first load
 - Any component subscribing via getOlympics() receives the latest data immediately, even if the HTTP call is already completed
 - Errors are caught and logged, the BehaviorSubject is reset to an empty array
 - To switch from mock data to a real API, only the olympicUrl needs to be changed: no component is impacted

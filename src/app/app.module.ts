import { provideHttpClient } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { CountryComponent } from "./pages/country/country.component";
import { CountryChartComponent } from "./components/country-chart/country-chart.component";
import { MedalChartComponent } from "./components/medal-chart/medal-chart.component";
import { StatLineComponent } from "./components/stat-line/stat-line.component";
import { HeaderComponent } from "./components/header/header.component";
import { EmptyStateComponent } from "./components/empty-state/empty-state.component";
import { TopBarComponent } from "./components/top-bar/top-bar.component";
import { LoaderComponent } from "./components/loader/loader.component";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NotFoundComponent,
    TopBarComponent,
    HeaderComponent,
    CountryComponent,
    CountryChartComponent,
    MedalChartComponent,
    StatLineComponent,
    EmptyStateComponent,
    LoaderComponent,
  ],
  imports: [BrowserModule, AppRoutingModule],
  providers: [provideHttpClient()],
  bootstrap: [AppComponent],
})

export class AppModule {}

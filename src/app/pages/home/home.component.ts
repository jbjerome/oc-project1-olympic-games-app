import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { DataService } from 'src/app/services/data.service';
import { Olympic } from "../../models/olympic.model";
import { StatLine } from "../../models/statline.model";

interface HomeData {
  countries: string[];
  medals: number[];
  countryIds: number[];
  stats: StatLine[];
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})

export class HomeComponent {
  public titlePage: string = "Medals per Country";

  private _router = inject(Router);
  private _dataService = inject(DataService);

  public loading$: Observable<boolean> = this._dataService.getLoading();
  public homeData$: Observable<HomeData> = this._dataService.getOlympics().pipe(
    map((data: Olympic[]) => {
      if (!data || data.length === 0) {
        return { countries: [], medals: [], countryIds: [], stats: [] };
      }
      return {
        countries: data.map((o: Olympic) => o.country),
        medals: data.map((o: Olympic) => o.participations.reduce((acc, p) => acc + p.medalsCount, 0)),
        countryIds: data.map((o: Olympic) => o.id),
        stats: this._buildStats(data),
      };
    })
  );

  private _buildStats(data: Olympic[]): StatLine[] {
    return [
      { title: "Number of countries", value: data.length },
      { title: "Number of JOs", value: new Set(data.flatMap(o => o.participations.map(p => p.year))).size }
    ];
  }

  onCountryClick(countryId: number): void {
    this._router.navigate(['country', countryId]);
  }
}

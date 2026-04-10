import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Olympic } from "../../models/olympic.model";
import { DataService } from "../../services/data.service";
import { StatLine } from "../../models/statline.model";

interface CountryData {
  titlePage: string;
  stats: StatLine[];
  years: number[];
  medals: string[];
  athletes: string[];
  cities: string[];
}

@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.scss']
})

export class CountryComponent implements OnInit {
  private _route = inject(ActivatedRoute);
  private _router = inject(Router);
  private _dataService = inject(DataService);

  public loading$: Observable<boolean> = this._dataService.getLoading();
  public countryData$!: Observable<CountryData | null>;

  ngOnInit() {
    const countryId = +this._route.snapshot.params['countryId'];
    this.countryData$ = this._dataService.getOlympics().pipe(
      map((data: Olympic[]) => {
        if (!data || data.length === 0) {
          return null;
        }
        const country = data.find((o) => o.id === countryId);
        if (!country) {
          this._router.navigate(['not-found']);
          return null;
        }
        return {
          titlePage: country.country,
          cities: country.participations.map((p) => p.city),
          years: country.participations.map((p) => p.year),
          medals: country.participations.map((p) => p.medalsCount.toString()),
          athletes: country.participations.map((p) => p.athleteCount.toString()),
          stats: this._buildStats(country),
        };
      })
    );
  }

  private _buildStats(data: Olympic): StatLine[] {
    return [
      {
        title: "Total of entries",
        value: data.participations.length
      },
      {
        title: "Total of medals",
        value: data.participations.reduce((acc, p) => acc + p.medalsCount, 0)
      },
      {
        title: "Total of athletes",
        value: data.participations.reduce((acc, p) => acc + p.athleteCount, 0)
      }
    ];
  }
}

import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Olympic} from "../../models/olympic.model";
import {DataService} from "../../services/data.service";
import {StatLine} from "../../models/statline.model";

@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.scss']
})

export class CountryComponent implements OnInit {
  public titlePage: string = '';
  public stats: StatLine[] = [];
  public years: number[] = [];
  public medals: string[] = [];
  public athletes: string[] = [];
  public cities: string[] = [];
  public loading = true;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private dataService: DataService
  ) {}

  ngOnInit() {
    const countryId = +this.route.snapshot.params['countryId'];
    this.dataService.getLoading().subscribe((loading) => this.loading = loading);
    this.dataService.getOlympics().subscribe((data: Olympic[]) => {
      if (data && data.length > 0) {
        const country = data.find((o) => o.id === countryId);
        if (!country) {
          this.router.navigate(['not-found']);
          return;
        }
        this.titlePage = country.country;
        this.cities = country.participations.map((p) => p.city);
        this.years = country.participations.map((p) => p.year);
        this.medals = country.participations.map((p) => p.medalsCount.toString());
        this.athletes = country.participations.map((p) => p.athleteCount.toString());
        this.stats = this.buildStats(country);
      }
    });
  }

  buildStats(data: Olympic): StatLine[] {
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

import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Olympic} from "../../models/olympic.model";
import {DataService} from "../../services/data.service";

@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.scss']
})

export class CountryComponent implements OnInit {
  public titlePage: string = '';
  public totalEntries: any = 0;
  public totalMedals: number = 0;
  public totalAthletes: number = 0;
  public years: number[] = [];
  public medals: string[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private dataService: DataService
  ) {}

  ngOnInit() {
    const countryName = this.route.snapshot.params['countryName'];
    this.dataService.getOlympics().subscribe((data: Olympic[]) => {
      if (data && data.length > 0) {
        const country = data.find((o) => o.country === countryName);
        if (!country) {
          this.router.navigate(['not-found']);
          return;
        }
        this.titlePage = country.country;
        this.totalEntries = country.participations.length;
        this.years = country.participations.map((p) => p.year);
        this.medals = country.participations.map((p) => p.medalsCount.toString());
        this.totalMedals = country.participations.reduce((acc, p) => acc + p.medalsCount, 0);
        this.totalAthletes = country.participations.reduce((acc, p) => acc + p.athleteCount, 0);
      }
    });
  }
}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { Olympic } from "../../models/olympic.model";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})

export class HomeComponent implements OnInit {
  public totalCountries: number = 0
  public totalJOs: number = 0
  public countries: string[] = [];
  public medals: number[] = [];
  public titlePage: string = "Medals per Country";

  constructor(private router: Router, private dataService:DataService) { }

  ngOnInit() {
    this.dataService.getOlympics().subscribe((data: Olympic[]) => {
      if (data && data.length > 0) {
        this.totalJOs = new Set(data.flatMap(o => o.participations.map(p => p.year))).size;
        this.countries = data.map((i: any) => i.country);
        this.totalCountries = this.countries.length;
        this.medals = data.map((o: Olympic) => o.participations.reduce((acc, p) => acc + p.medalsCount, 0));
      }
    });
  }

  onCountryClick(countryName: string) {
    this.router.navigate(['country', countryName]);
  }
}


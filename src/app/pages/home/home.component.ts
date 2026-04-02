import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { Olympic } from "../../models/olympic.model";
import { StatLine } from "../../models/statline.model";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})

export class HomeComponent implements OnInit {
  public countries: string[] = [];
  public medals: number[] = [];
  public titlePage: string = "Medals per Country";
  public stats: StatLine[] = [];

  constructor(private router: Router, private dataService:DataService) { }

  ngOnInit() {
    this.dataService.getOlympics().subscribe((data: Olympic[]) => {
      if (data && data.length > 0) {
        this.countries = data.map((i: any) => i.country);
        this.medals = data.map((o: Olympic) => o.participations.reduce((acc, p) => acc + p.medalsCount, 0));
        this.stats = this.buildStats(data);
      }
    });
  }

  buildStats(data: Olympic[]): StatLine[] {
    return [
      { title: "Number of countries", value: data.length },
      { title: "Number of JOs", value: new Set(data.flatMap(o => o.participations.map(p => p.year))).size }
    ];
  }

  onCountryClick(countryName: string):void {
    this.router.navigate(['country', countryName]);
  }
}


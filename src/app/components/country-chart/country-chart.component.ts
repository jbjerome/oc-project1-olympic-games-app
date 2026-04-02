import {Component, Input, OnChanges} from "@angular/core";
import Chart from "chart.js/auto";

@Component({
  selector: 'app-country-chart',
  templateUrl: './country-chart.component.html',
  styleUrls: ['./country-chart.component.scss'],
})

export class CountryChartComponent implements OnChanges {
  @Input() years: number[] = [];
  @Input() medals: string[] = [];

  private lineChart?: Chart<'line', string[], number>;

  ngOnChanges() {
    if (this.years.length > 0 && this.medals.length > 0) {
      this.buildLineChart();
    }
  }

  buildLineChart() {
    this.lineChart = new Chart("countryChart", {
      type: 'line',
      data: {
        labels: this.years,
        datasets: [
          {
            label: "medals",
            data: this.medals,
            backgroundColor: '#0b868f'
          },
        ]
      },
      options: {
        aspectRatio: 2.5
      }
    });
  }
}

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
  @Input() cities: string[] = [];
  @Input() athletes: string[] = [];

  private lineChart?: Chart<'bar', string[], number>;

  ngOnChanges() {
    if (this.years.length > 0 && this.medals.length > 0) {
      this.buildLineChart();
    }
  }

  buildLineChart() {
    this.lineChart = new Chart("countryChart", {
      type: 'bar',
      data: {
        labels: this.years,
        datasets: [
          {
            label: "Medals",
            data: this.medals,
            backgroundColor: '#0b868f'
          },
          {
            label: "Athletes",
            data: this.athletes,
            backgroundColor: '#c16e8c'
          },
        ]
      },
      options: {
        aspectRatio: 3,
        plugins: {
          tooltip: {
            callbacks: {
              title: (items) => {
                const index = items[0].dataIndex;
                return `${this.cities[index]} - ${this.years[index]}`;
              }
            }
          }
        }
      }
    });
  }
}

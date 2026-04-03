import {Component, Input, OnChanges, OnDestroy, ViewChild, ElementRef} from "@angular/core";
import Chart from "chart.js/auto";

@Component({
  selector: 'app-country-chart',
  templateUrl: './country-chart.component.html',
  styleUrls: ['./country-chart.component.scss'],
})

export class CountryChartComponent implements OnChanges, OnDestroy {
  @Input() years: number[] = [];
  @Input() medals: string[] = [];
  @Input() cities: string[] = [];
  @Input() athletes: string[] = [];
  @ViewChild('chartCanvas', { static: true }) chartCanvas!: ElementRef<HTMLCanvasElement>;

  chartDescription = '';
  private lineChart?: Chart<'bar', string[], number>;

  ngOnChanges() {
    if (this.years.length > 0 && this.medals.length > 0) {
      this.buildLineChart();
    }
  }

  buildLineChart() {
    if (this.lineChart) {
      this.lineChart.destroy();
    }
    this.chartDescription = this.years
      .map((year, i) => `${this.cities[i]} ${year}: ${this.medals[i]} médailles, ${this.athletes[i]} athlètes`)
      .join(', ');
    this.lineChart = new Chart(this.chartCanvas.nativeElement, {
      type: 'bar',
      data: {
        labels: this.years,
        datasets: [
          {
            label: "Medals",
            data: this.medals,
            backgroundColor: '#0a7078'
          },
          {
            label: "Athletes",
            data: this.athletes,
            backgroundColor: '#c16e8c'
          },
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
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

  ngOnDestroy() {
    this.lineChart?.destroy();
  }
}

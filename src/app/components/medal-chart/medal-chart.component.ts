import {Component, OnChanges, OnDestroy, Input, Output, EventEmitter, ViewChild, ElementRef} from "@angular/core";
import Chart from "chart.js/auto";

@Component({
  selector: 'app-medal-chart',
  templateUrl: './medal-chart.component.html',
  styleUrls: ['./medal-chart.component.scss'],
})

export class MedalChartComponent implements OnChanges, OnDestroy {
  @Input() countries: string[] = [];
  @Input() medals: number[] = [];
  @Input() countryIds: number[] = [];
  @Output() countryClick = new EventEmitter<number>();
  @ViewChild('chartCanvas', { static: true }) chartCanvas!: ElementRef<HTMLCanvasElement>;

  chartDescription = '';
  private _chart?: Chart<'pie', number[], string>;

  ngOnChanges() {
    if (this.countries.length > 0 && this.medals.length > 0) {
      this.buildPieChart();
    }
  }

  buildPieChart() {
    if (this._chart) {
      this._chart.destroy();
    }
    this.chartDescription = this.countries
      .map((country, i) => `${country}: ${this.medals[i]} médailles`)
      .join(', ');
    const chart = new Chart(this.chartCanvas.nativeElement, {
      type: 'pie',
      data: {
        labels: this.countries,
        datasets: [{
          label: 'Medals',
          data: this.medals,
          backgroundColor: ['#0a7078', '#adc3de', '#7a3c53', '#8f6263', 'orange', '#94819d'],
          hoverOffset: 4
        }],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        onClick: (e) => {
          if (e.native) {
            const points = chart.getElementsAtEventForMode(e.native, 'point', { intersect: true }, true)
            if (points.length) {
              const firstPoint = points[0];
              const countryId = this.countryIds[firstPoint.index];
              this.countryClick.emit(countryId);
            }
          }
        }
      }
    });
    this._chart = chart;
  }

  ngOnDestroy() {
    this._chart?.destroy();
  }
}

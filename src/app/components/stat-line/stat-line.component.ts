import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-stat-line',
  templateUrl: './stat-line.component.html',
  styleUrl: './stat-line.component.scss'
})

export class StatLineComponent {
  @Input() title: string = '';
  @Input() value: string|number = '';
}

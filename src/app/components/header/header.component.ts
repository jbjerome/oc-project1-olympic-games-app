import {Component, Input} from '@angular/core';
import {StatLine} from "../../models/statline.model";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})

export class HeaderComponent {
  @Input() title: string = '';
  @Input() stats: StatLine[] = [];
}

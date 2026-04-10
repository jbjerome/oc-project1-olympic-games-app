import { Component, inject, OnInit } from '@angular/core';
import { DataService } from './services/data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  private _dataService = inject(DataService);

  ngOnInit() {
    this._dataService.loadInitialData().subscribe();
  }
}

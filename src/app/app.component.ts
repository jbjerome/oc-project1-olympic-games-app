import {Component, DestroyRef, inject, OnInit} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { DataService } from './services/data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  private _dataService = inject(DataService);
  private _destroyRef = inject(DestroyRef);

  ngOnInit() {
    this._dataService.loadInitialData().pipe(takeUntilDestroyed(this._destroyRef)).subscribe();
  }
}

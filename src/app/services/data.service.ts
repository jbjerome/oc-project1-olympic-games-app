import { inject, Injectable, isDevMode } from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {Olympic} from "../models/olympic.model";
import {HttpClient} from "@angular/common/http";
import {catchError, delay, tap} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})

export class DataService {
  private _olympicUrl = './assets/mock/olympic.json';
  private _olympics$ = new BehaviorSubject<Olympic[]>([]);
  private _loading$ = new BehaviorSubject<boolean>(true);

  private _http = inject(HttpClient);

  loadInitialData(): Observable<Olympic[]> {
    this._loading$.next(true);
    return this._http.get<Olympic[]>(this._olympicUrl).pipe(
      // Simulate delay for loading data
      delay(500),
      tap((data) => {
        this._olympics$.next(data);
        this._loading$.next(false);
      }),
      catchError((error) => {
        if (isDevMode()) {
          console.error('Error loading olympic data', error);
        }
        this._olympics$.next([]);
        this._loading$.next(false);
        return [];
      })
    );
  }

  getOlympics(): Observable<Olympic[]> {
    return this._olympics$.asObservable();
  }

  getLoading(): Observable<boolean> {
    return this._loading$.asObservable();
  }
}

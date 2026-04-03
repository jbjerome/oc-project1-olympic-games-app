import { Injectable, isDevMode } from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {Olympic} from "../models/olympic.model";
import {HttpClient} from "@angular/common/http";
import {catchError, delay, tap} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})

export class DataService {
  private olympicUrl = './assets/mock/olympic.json';
  private olympics$ = new BehaviorSubject<Olympic[]>([]);
  private loading$ = new BehaviorSubject<boolean>(true);

  constructor(private http: HttpClient) {}

  loadInitialData(): Observable<Olympic[]> {
    this.loading$.next(true);
    return this.http.get<Olympic[]>(this.olympicUrl).pipe(
      delay(500),
      tap((data) => {
        this.olympics$.next(data);
        this.loading$.next(false);
      }),
      catchError((error) => {
        if (isDevMode()) {
          console.error('Error loading olympic data', error);
        }
        this.olympics$.next([]);
        this.loading$.next(false);
        return [];
      })
    );
  }

  getOlympics(): Observable<Olympic[]> {
    return this.olympics$.asObservable();
  }

  getLoading(): Observable<boolean> {
    return this.loading$.asObservable();
  }
}

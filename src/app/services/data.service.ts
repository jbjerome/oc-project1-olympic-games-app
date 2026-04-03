import { Injectable, isDevMode } from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {Olympic} from "../models/olympic.model";
import {HttpClient} from "@angular/common/http";
import {catchError, tap} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})

export class DataService {
  private olympicUrl = './assets/mock/olympic.json';
  private olympics$ = new BehaviorSubject<Olympic[]>([]);

  constructor(private http: HttpClient) {}

  loadInitialData(): Observable<Olympic[]> {
    return this.http.get<Olympic[]>(this.olympicUrl).pipe(
      tap((data) => this.olympics$.next(data)),
      catchError((error) => {
        if (isDevMode()) {
          console.error('Error loading olympic data', error);
        }
        this.olympics$.next([]);
        return [];
      })
    );
  }

  getOlympics(): Observable<Olympic[]> {
    return this.olympics$.asObservable();
  }
}

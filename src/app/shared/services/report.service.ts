import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import {map, Observable} from 'rxjs';
import { Report } from '../model/report.model';

@Injectable({ providedIn: 'root' })
export class ReportService {
  private readonly apiUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient) {}

  getCarModels(): Observable<{ label: string; value: string | null }[]> {
    return this.http.get<{ id: number; modelo: string }[]>(`${this.apiUrl}/carros`).pipe(
      map((carModels) => {
        const uniqueModels = Array.from(new Set(carModels.map((car) => car.modelo)))
          .sort()
          .map((model) => ({ label: model, value: model }));
        return [{ label: 'Todos', value: null }, ...uniqueModels];
      })
    );
  }

  getFilteredReports(data?: string, modelo?: string): Observable<Report[]> {
    let params = new HttpParams();

    if (data) {
      params = params.set('data', data);
    }

    if (modelo) {
      params = params.set('modelo', modelo);
    }

    return this.http.get<Report[]>(`${this.apiUrl}/aluguel/filtrar`, { params });
  }
}

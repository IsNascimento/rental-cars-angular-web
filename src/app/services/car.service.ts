import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Big } from 'big.js';

export interface Car {
  id: number;
  modelo: string;
  ano: string;
  qtdPassageiros: number;
  km: number;
  fabricante: string;
  vlrDiaria: Big;
}

@Injectable({
  providedIn: 'root'
})
export class CarService {
  private apiUrl = 'http://localhost:8080/api/carros';

  constructor(private http: HttpClient) { }

  getCars(): Observable<Car[]> {
    return this.http.get<Car[]>(this.apiUrl);
  }
}

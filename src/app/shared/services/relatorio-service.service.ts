import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { ModeloCarro } from '../../feature/relatorio/interfaces/Carro';
import { Relatorio } from '../../feature/relatorio/interfaces/Relatorio';

@Injectable({
  providedIn: 'root'
})
export class RelatorioServiceService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  consultarCarros() {
    return this.http.get<ModeloCarro[]>(`${this.apiUrl}/carros`);
  }

  consultarRelatorio() {
    return this.http.get<Relatorio>(`${this.apiUrl}/aluguel`);
  }
}

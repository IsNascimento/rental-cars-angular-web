import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface Aluguel {
  dataAluguel: string;
  modeloCarro: string;
  km: number;
  nomeCliente: string;
  telefone: string;
  dataDevolucao: string;
  pago: string;
  valor: number;
}

export interface Relatorio {
  alugueis: Aluguel[];
  valorNaoPago: number;
}

@Injectable({
  providedIn: 'root'
})
export class AlugueisService {
  private basePath = 'http://localhost:8080/api'

  constructor(private http: HttpClient) { }

  getRelatorio(dataAluguel?: string, modeloCarroSelecionado?: string | null): Observable<Relatorio> {
    const apiUrl = `${this.basePath}/alugueis`;
    let params = new HttpParams();

    if (dataAluguel) {
      params = params.set('dataAluguel', dataAluguel);
    }

    if (modeloCarroSelecionado) {
      params = params.set('modeloCarro', modeloCarroSelecionado);
    }


    return this.http.get<Relatorio>(apiUrl, { params });
  }
}

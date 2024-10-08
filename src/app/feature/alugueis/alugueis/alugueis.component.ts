import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { TableModule } from 'primeng/table';
import { Observable } from 'rxjs';
import { AlugueisResponse } from '../model/alugueisResponse';
import { Aluguel } from '../model/aluguel';
import { AlugueisService } from '../service/alugueis.service';

interface Modelo {
  nome: string;
}
@Component({
  selector: 'app-alugueis',
  standalone: true,
  imports: [
    ButtonModule,
    CalendarModule,
    CommonModule,
    DropdownModule,
    FormsModule,
    HttpClientModule,
    TableModule,
  ],
  providers: [AlugueisService],
  templateUrl: './alugueis.component.html',
  styleUrl: './alugueis.component.scss',
})
export class AlugueisComponent {
  alugueisResponse$: Observable<AlugueisResponse>;
  alugueis: Aluguel[] = [];
  filteredAlugueis: Aluguel[] = [];
  modelos: string[] = [];
  modelosOptions: Modelo[] = [];
  modeloSelecionado: Modelo = { nome: '' };
  dataSelecionada: Date | null = null;
  valorTotalNaoPago: number = 0;

  constructor(
    private alugueisService: AlugueisService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.alugueisResponse$ = this.alugueisService.list();
    this.loadAlugueis();
  }

  loadAlugueis(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.alugueisResponse$.subscribe(
        (data) => {
          this.alugueis = data.alugueis;
          this.valorTotalNaoPago = data.valorTotalNaoPago;

          const modelosUnicos = [
            ...new Set(this.alugueis.map((a) => a.modeloCarro)),
          ];
          this.modelosOptions = [
            { nome: 'Todos os modelos' },
            ...modelosUnicos.map((modelo) => ({ nome: modelo } as Modelo)),
          ];
          resolve();
        },
        (error) => {
          reject(error);
        }
      );
    });
  }

  async onSearch() {
    this.filterAlugueis(this.dataSelecionada, this.modeloSelecionado);
  }

  async filterAlugueis(date: Date | null, modelo: Modelo) {
    if (!date && ('Todos os modelos' === modelo.nome || '' === modelo.nome)) {
      await this.loadAlugueis();
    } else {
      await this.loadAlugueis();
      this.filteredAlugueis = this.alugueis.filter((aluguel) => {
        const dateMatches = date
          ? aluguel.dataAluguel === this.formatDate(date)
          : true;

        const modelMatches =
          modelo && modelo.nome != ''
            ? aluguel.modeloCarro.toLowerCase() === modelo.nome.toLowerCase()
            : true;

        return dateMatches && modelMatches;
      });
      this.alugueis = this.filteredAlugueis;
      if (this.alugueis.length === 0) {
        this.valorTotalNaoPago = 0;
      } else {
        this.somarDebitos();
      }
    }
  }

  formatDate(date: Date): string {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }

  somarDebitos() {
    this.alugueis.forEach((aluguel) => {
      this.valorTotalNaoPago = 0;
      if (aluguel.pago.toLowerCase() === 'nao') {
        this.valorTotalNaoPago += parseFloat(aluguel.valor);
      }
    });
  }
}

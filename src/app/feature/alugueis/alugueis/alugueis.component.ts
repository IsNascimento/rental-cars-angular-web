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
  modelo: string;
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
  modelosOptions: Modelo[] = [{ modelo: '' }];
  dataSelecionada: Date | null = null;
  modeloSelecionado: string = '';
  valorTotalNaoPago: number = 0;

  //private readonly API = 'api/alugueis';

  constructor(
    private alugueisService: AlugueisService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.alugueisResponse$ = this.alugueisService.list();

    this.loadAlugueis();
  }

  loadAlugueis() {
    this.alugueisResponse$.subscribe((data) => {
      this.alugueis = data.alugueis;
      this.valorTotalNaoPago = data.valorTotalNaoPago;

      const modelosUnicos = [
        ...new Set(this.alugueis.map((a) => a.modeloCarro)),
      ];
      this.modelosOptions = [
        { modelo: 'Todos os modelos' },
        ...modelosUnicos.map((modelo) => ({ modelo } as Modelo)),
      ];

      console.log(this.alugueis);
      console.log(this.valorTotalNaoPago);
    });
  }

  onSearch() {
    this.filterAlugueis(this.dataSelecionada, this.modeloSelecionado);
    console.log(this.filteredAlugueis);
  }

  filterAlugueis(date: Date | null, modelo: string) {
    if (!date && (modelo.length === 0 || !modelo)) {
      return;
    }

    this.filteredAlugueis = this.alugueis.filter((aluguel) => {
      const dateMatches = date
        ? new Date(aluguel.dataAluguel).toDateString() === date.toDateString()
        : true;

      const modelMatches = modelo ? aluguel.modeloCarro === modelo : true;

      return dateMatches && modelMatches; // Retorna se a data ou modelo coincidem
    });
  }

}

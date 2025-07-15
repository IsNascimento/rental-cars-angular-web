import { Component, OnInit } from '@angular/core';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { BadgeModule } from 'primeng/badge';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';
import { RelatorioServiceService } from '../../shared/services/relatorio-service.service';
import { Relatorio } from './interfaces/Relatorio';
import { FloatLabelModule } from 'primeng/floatlabel';
import { Aluguel } from './interfaces/Aluguel';

export interface ModeloCarroDropdown {
  label: string;
  value: string;
}

@Component({
  selector: 'app-relatorio',
  standalone: true,
  imports: [CalendarModule,
    DropdownModule,
    TableModule,
    TagModule,
    InputTextModule,
    FormsModule,
    DatePipe,
    CurrencyPipe,
    FloatLabelModule,
    BadgeModule,
    CommonModule
  ],
  templateUrl: './relatorio.component.html',
  styleUrl: './relatorio.component.scss'
})
export class RelatorioComponent implements OnInit {

  dataAluguel: Date | undefined;
  modelosCarro: ModeloCarroDropdown[] = [];
  modeloCarroSelecionado: ModeloCarroDropdown | undefined;
  relatorios: Relatorio = {
    alugueis: [],
    valorNaoPago: 0
  };
  alugueis: Aluguel[] = [];

  constructor(
    private relatorioService: RelatorioServiceService
  ) { }

  ngOnInit(): void {
    this.carregarCarro();
    this.consultarRelatorio();
  }

  private consultarRelatorio() {
    this.relatorioService.consultarRelatorio().subscribe({
      next: (resp) => {
        this.relatorios = resp;
        this.alugueis = resp.alugueis;
      },
      error: (error) => {
        console.error('Error:', error);
        alert('Ocorreu um erro!')
      }
    })
  }


  private carregarCarro() {
    this.relatorioService.consultarCarros().subscribe({
      next: (resp) => {
        this.modelosCarro = resp.map(carro => ({
          label: carro.modelo,
          value: carro.modelo
        }));
        this.modelosCarro.unshift({ label: 'TODOS', value: 'TODOS' });
        this.modeloCarroSelecionado = this.modelosCarro[0];
      },
      error: (error) => {
        console.error('Error:', error);
        alert('Ocorreu um erro!')
      }
    })
  }

  pesquisar(): void {

    let filteredRelatorios = [...this.relatorios.alugueis];

    if(!this.dataAluguel && !this.modeloCarroSelecionado) {
      this.consultarRelatorio();
      return
    }

    if (this.dataAluguel) {
      filteredRelatorios = filteredRelatorios.filter(r =>
        r.dataAluguel === this.dataAluguel?.toISOString().substring(0,10)
      );
    }

    if (this.modeloCarroSelecionado && this.modeloCarroSelecionado.value !== 'TODOS') {
      filteredRelatorios = filteredRelatorios.filter(r =>
        r.modeloCarro === this.modeloCarroSelecionado?.value
      );
    }

    this.alugueis = filteredRelatorios;
  }


}

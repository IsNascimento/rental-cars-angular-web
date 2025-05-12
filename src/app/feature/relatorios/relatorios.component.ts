import { AlugueisService, Aluguel } from './service/relatorios.service';
import { CalendarModule } from 'primeng/calendar';
import { CommonModule, registerLocaleData } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { DividerModule } from 'primeng/divider';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { LOCALE_ID } from '@angular/core';
import localePt from '@angular/common/locales/pt'
import { TitleContentComponent } from "../../shared/components/title-content/title-content.component";

registerLocaleData(localePt)

@Component({
  selector: 'app-relatorios',
  standalone: true,
  imports: [
    CalendarModule,
    CommonModule,
    DividerModule,
    DropdownModule,
    FormsModule,
    TableModule,
    TagModule,
    TitleContentComponent
],
  templateUrl: './relatorios.component.html',
  styleUrl: './relatorios.component.scss',
  providers: [{ provide: LOCALE_ID, useValue: 'pt' }]
})
export class RelatoriosComponent implements OnInit {
  dataAluguel!: Date;
  modeloCarros: { label: string; value: string | null }[] = [
    { label: 'Todos', value: null }
  ];
  modeloCarroSelecionado: string | null = null;

  alugueis: Aluguel[] = [];
  valornaoPago: number = 0;

  columns = [
    { field: 'dataAluguel', header: 'DATA' },
    { field: 'modeloCarro', header: 'MODELO' },
    { field: 'km', header: 'KM' },
    { field: 'nomeCliente', header: 'CLIENTE' },
    { field: 'telefone', header: 'TELEFONE' },
    { field: 'dataDevolucao', header: 'DEVOLUÇÃO' },
    { field: 'pago', header: 'PAGO' },
    { field: 'valor', header: 'VALOR' }
  ];

  constructor(private alugueisService: AlugueisService) { }

  ngOnInit(): void {
    this.alugueisService.getRelatorio().subscribe((dados) => {
      this.alugueis = dados.alugueis;
      this.valornaoPago = dados.valorNaoPago;
      this.modeloCarros = [
        { label: 'Todos', value: null }
      ];

      const modelosSet = new Set<string>();
      dados.alugueis.forEach(aluguel => {
        modelosSet.add(aluguel.modeloCarro);
      });

      modelosSet.forEach(modelo => {
        this.modeloCarros.push({ label: modelo, value: modelo })
      });
    });
  }

  onSearch() {
    const isoDate = this.dataAluguel instanceof Date ? this.dataAluguel.toISOString().split('T')[0] : this.dataAluguel;

    this.alugueisService.getRelatorio(isoDate, this.modeloCarroSelecionado)
      .subscribe((dados) => {
        this.alugueis = dados.alugueis;
        this.valornaoPago = dados.valorNaoPago;
      })
  }
}

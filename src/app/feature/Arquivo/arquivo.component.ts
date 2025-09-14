import { Component, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { Broker } from '../../api/broker';
import { CommonModule } from '@angular/common';
import { ToastModule } from 'primeng/toast';
import { TableModule } from 'primeng/table';



@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ButtonModule, CommonModule, ToastModule, TableModule
  ],
  providers: [],
  templateUrl: './arquivo.component.html',
  styleUrl: './arquivo.component.scss',
})
export class ArquivoComponent implements OnInit {

  alugueis: any[] = [];
  totalNaoPago: number = 0;
  carregando = false;


  constructor(
  ) { }

  ngOnInit() {
    this.listarAlugueis();
  }



  public ProcessarArquivo() {
    this.carregando = true;

    Broker.service("aluguel")
      .method("processar-arquivo")
      .subscribe({
        next: () => {
          setTimeout(() => {
            this.listarAlugueis();
            this.carregando = false;
          }, 1000);
        },
        error: (e) => {
          console.error("Erro:", e);
          this.carregando = false;
        }
      });
  }

  public listarAlugueis() {

    Broker.service("aluguel")
      .method<any[]>("listarAluguel", [], true)
      .subscribe({
        next: (page) => {

          console.log("ALUGUEL", page);
          this.alugueis = page;
          this.totalNaoPago = this.alugueis
            .filter(a => !a.pago)
            .reduce((acc, curr) => acc + Number(curr.valor), 0);
        },
        error: (err) => {
          console.error("Erro ao listar carros:", err);
        }
      });

  }
}

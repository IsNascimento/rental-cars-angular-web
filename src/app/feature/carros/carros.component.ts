import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Broker } from '../../api/broker';
import { ToastModule } from 'primeng/toast';
import { TableModule } from 'primeng/table';


@Component({
  selector: 'app-carros',
  standalone: true,
  imports: [RouterOutlet, CommonModule, ToastModule, TableModule],
  templateUrl: './carros.component.html',
  styleUrl: './carros.component.scss'
})
export class CarrosComponent implements OnInit {

  carros: any[] = [];

  constructor() { }

  ngOnInit(): void {

    this.onListCarros();

  }

  public onListCarros() {
    Broker.service("carros")
      .method<any[]>("listarCarros", [], true)
      .subscribe({
        next: (page) => {
          console.log("RESULTAD", page);
          this.carros = page;
        },
        error: (err) => {
          console.error("Erro ao listar carros:", err);
        }
      });
  }



}

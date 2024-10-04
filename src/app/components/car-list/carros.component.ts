import { Component, OnInit } from '@angular/core';
import { CarService, Car } from '../../services/car.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-carros',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './carros.component.html',
  styleUrl: './carros.component.css',
})
export class CarrosComponent implements OnInit{
  cars: Car[] = [];

  constructor(private carService: CarService) {}

  ngOnInit(): void {
    this.carService.getCars().subscribe(
      (data: Car[]) => {
        this.cars = data;
      },
      (error) => {
        console.error('Erro ao buscar carros', error);
      }
    );
  }
}

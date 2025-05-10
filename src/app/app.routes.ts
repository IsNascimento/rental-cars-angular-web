import { LayoutComponent } from './core/layout/layout.component';
import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./feature/reports/car-rental-reports.component').then(
            (m) => m.CarRentalReportsComponent
          ),
      },
      {
        path: 'relatorios',
        loadComponent: () =>
          import('./feature/reports/car-rental-reports.component').then(
            (m) => m.CarRentalReportsComponent
          ),
      },
      {
        path: 'alugueis',
        loadComponent: () =>
          import('./feature/rentals/rentals-page.component').then(
            (m) => m.RentalsPageComponent
          ),
      },
    ],
  },
];

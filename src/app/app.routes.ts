import {LayoutComponent} from './core/layout/layout.component';
import {Routes} from '@angular/router';

export const routes: Routes = [
  {
    path: '', component: LayoutComponent, children: [
      {
        path: '',
        loadComponent: () => import('./feature/home/home.component').then(component => component.HomeComponent)
      },
      {
        path: 'relatorios',
        loadComponent: () => import('./feature/report/report.component').then(component => component.ReportComponent),
        data: {title: 'RELATÓRIOS'}
      },
      {
        path: "alugueis",
        loadComponent: () => import('./feature/rent/rent.component').then(component => component.RentComponent),
        data: {title: 'ALUGUEIS'}
      }
    ]
  }
];

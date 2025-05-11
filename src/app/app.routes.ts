import { LayoutComponent } from './core/layout/layout.component';
import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        redirectTo: 'relatorios',
        pathMatch: 'full',
      },
      {
        path: 'alugueis',
        loadComponent: () =>
          import('./feature/alugueis/alugueis.component').then(
            (m) => m.AlugueisComponent
          ),
        data: { breadcrumb: 'Aluguéis' },
      },
      {
        path: 'relatorios',
        loadComponent: () =>
          import('./feature/relatorios/relatorios.component').then(
            (m) => m.RelatoriosComponent
          ),
        data: { breadcrumb: 'Relatórios' },
      },
    ],
  },
];

import { LayoutComponent } from './core/layout/layout.component';
import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '', component: LayoutComponent, children: [
            {
                path: '', loadComponent: () => import('./feature/home/home.component').then(component => component.HomeComponent)
            },
            {
                path: 'relatorio', loadComponent: () => import('./feature/relatorio/relatorio.component').then(component => component.RelatorioComponent),
                data: { breadcrumb: 'Relatórios' }
            },
            {
                path: 'aluguel', loadComponent: () => import('./feature/aluguel/aluguel.component').then(component => component.AluguelComponent),
                data: { breadcrumb: 'Alugueis' }
            }
        ]
    },

];

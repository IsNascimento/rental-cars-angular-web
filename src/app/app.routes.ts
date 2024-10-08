import { LayoutComponent } from './core/layout/layout.component';
import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '', component: LayoutComponent, children: [
            {
                path: '', loadComponent: () => import('./feature/alugueis/alugueis/alugueis.component').then(component => component.AlugueisComponent)
            },
            {
                path: 'relatorio', loadComponent: () => import('./feature/relatorio/relatorio.component').then(component => component.RelatorioComponent)
            }
        ]
    }
];

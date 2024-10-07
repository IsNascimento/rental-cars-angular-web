import { LayoutComponent } from './core/layout/layout.component';
import { Routes } from '@angular/router';
import { RelatoriosComponent } from './relatorios/relatorios.component';
import { FileUploadComponent } from './alugueis/alugueis.component';

export const routes: Routes = [
    {
        path: '', component: LayoutComponent, children: [
            {
                path: '', loadComponent: () => import('./feature/home/home.component').then(component => component.HomeComponent)
            },
            {
                path: 'relatorios', component: RelatoriosComponent
            },
            {
                path: 'alugueis', component: FileUploadComponent
            }
        ]
    }
];

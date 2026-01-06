import { LayoutComponent } from './core/layout/layout.component';
import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        children: [
            {
                path: '', 
                loadComponent: () => import('./feature/home/home.component').then(component => component.HomeComponent),
                pathMatch: 'full' 
            },
            {
                path: 'document', 
                loadComponent: () => import('./feature/document/document.component').then(component => component.DocumentComponent)
            },
            {
                path: 'reports',  
                loadComponent: () => import('./feature/reports/reports.component').then(component => component.ReportsComponent)
            },
            {
                path: 'settings', 
                loadComponent: () => import('./feature/settings/settings.component').then(component => component.SettingsComponent)
            }, 
        ]
    }, 
    { path: '**', redirectTo: '', pathMatch: 'full' }
];
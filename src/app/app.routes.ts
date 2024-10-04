import { LayoutComponent } from './core/layout/layout.component';
import { Routes } from '@angular/router';
import { CarrosComponent } from './components/car-list/carros.component';

export const routes: Routes = [
    {
        path: '', component: LayoutComponent, children: [
            {
                path: '', loadComponent: () => import('./feature/home/home.component').then(component => component.HomeComponent)
            },
            {
                path: 'carros', component: CarrosComponent
            }
        ]
    }
];

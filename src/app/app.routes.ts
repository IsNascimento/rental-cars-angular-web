import { LayoutComponent } from './core/layout/layout.component';
import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '', component: LayoutComponent, children: [
          {
            path: '',
            redirectTo: '/reports',
            pathMatch: 'full'
          },
          {
            path: 'reports',
            loadComponent: () => import('./feature/home/home.component')
              .then(component => component.HomeComponent)
          },
          {
            path: "rents",
            loadComponent: () => import('./feature/rent/rent.component')
              .then(component => component.RentComponent)
          }
        ]
    }
];

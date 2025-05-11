import { ActivatedRoute, NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { TOOGLE_SIDEBAR } from './layout.animation';
import { ToastModule } from 'primeng/toast';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../template/header/header.component';
import { SideMenuComponent } from '../template/side-menu/side-menu.component';
import { FooterComponent } from '../template/footer/footer.component';
import { filter } from 'rxjs';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [
    HeaderComponent,
    SideMenuComponent,
    FooterComponent,
    RouterOutlet,
    ToastModule,
    ConfirmDialogModule,
    BreadcrumbModule,
  ],
  providers: [MessageService, ConfirmationService],
  animations: [TOOGLE_SIDEBAR],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
})
export class LayoutComponent implements OnInit {
  items!: MenuItem[];
  breadcumbs: MenuItem[] = [];

  constructor(private router: Router, private route: ActivatedRoute){}

  ngOnInit(): void {
    this.items = [
      {
        label: 'Aluguéis',
        icon: 'fa fa-car fa-lg',
        routerLink: ['/alugueis'],
      },
      {
        label: 'Relatórios',
        icon: 'fa fa-file fa-lg',
        routerLink: ['/relatorios'],
      },
    ];

    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.updateBreadcrumb();
    });

    this.updateBreadcrumb();
  }

  updateBreadcrumb(): void {
    const child = this.getChild(this.route);
    const label = child.snapshot.data['breadcrumb'];
    this.breadcumbs = label ? [{ label }] : [{ label: 'Página Inicial' }];
  }

  getChild(route: ActivatedRoute): ActivatedRoute {
    while (route.firstChild) {
      route = route.firstChild;
    }
    return route;
  }

  isOpenMenu: boolean = true;

  exibirMenu(value: boolean) {
    this.isOpenMenu = value;
  }

  hasOpen(): string {
    return this.isOpenMenu ? 'open' : 'closed';
  }
}

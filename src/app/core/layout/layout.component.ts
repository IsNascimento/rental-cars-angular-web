import {RouterOutlet, Router, NavigationEnd} from '@angular/router';
import { TOOGLE_SIDEBAR } from './layout.animation';
import { ToastModule } from 'primeng/toast';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../template/header/header.component';
import { SideMenuComponent } from '../template/side-menu/side-menu.component';
import { FooterComponent } from '../template/footer/footer.component';
import {filter} from 'rxjs';

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

  breadcrumbs: MenuItem[] = [{ label: 'Pagina Inicial' }];
  breadcumbsHome!: MenuItem;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.updateBreadcrumbs();
    });

    this.items = [
      {
        label: 'Aluguéis',
        icon: 'fa fa-car',
        routerLink: '/aluguel',
        command: () => this.router.navigate(['/alugueis']),
      },
      {
        label: 'Relatórios',
        icon: 'fa fa-file',
        // command: () => this.router.navigate(['/relatorios']),
        routerLink: '/relatorios',
        command: () => {
          this.breadcrumbs = [{ label: 'RELATÓRIOS' }];
        },
      }
    ];
  }

  updateBreadcrumbs(): void {
    const root = this.router.routerState.snapshot.root;
    this.breadcrumbs = [];
    let currentRoute = root;
    while (currentRoute.children.length) {
      currentRoute = currentRoute.children[0];
      if (currentRoute.data['title']) {
        this.breadcrumbs.push({
          label: currentRoute.data['title'],
          url: currentRoute.url.join('/')
        });
      }
    }
  }

  isOpenMenu: boolean = true;

  exibirMenu(value: boolean): void {
    this.isOpenMenu = value;
  }

  hasOpen(): string {
    return this.isOpenMenu ? 'open' : 'closed';
  }
}

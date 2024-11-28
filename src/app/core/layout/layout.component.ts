import {NavigationEnd, Router, RouterOutlet} from '@angular/router';
import { TOOGLE_SIDEBAR } from './layout.animation';
import { ToastModule } from 'primeng/toast';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import {Component, inject, OnInit} from '@angular/core';
import { HeaderComponent } from '../template/header/header.component';
import { SideMenuComponent } from '../template/side-menu/side-menu.component';
import { FooterComponent } from '../template/footer/footer.component';

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
  private _router = inject(Router);

  items!: MenuItem[];
  breadcrumbs: MenuItem[] = [{ label: 'Pagina Inicial' }];
  breadcrumbsHome!: MenuItem;
  isOpenMenu: boolean = true;
  activeLink: string = '';

  ngOnInit(): void {
    this.items = [
      {
        label: 'Alugueis',
        icon: 'fa fa-car fa-lg',
        routerLink: '/rents',
        command: () => this.changeBreadcrumb('ALUGUEIS'),
      },
      {
        label: 'Relatórios',
        icon: 'fa fa-file fa-lg',
        routerLink: '/reports',
        command: () => this.changeBreadcrumb('RELATÓRIOS'),
      },
    ];

    this._router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.activeLink = event.url;
      }
    });
  }

  private changeBreadcrumb(breadcrumbLabel: string) {
      this.breadcrumbs = [{ label: breadcrumbLabel }];
  }

  exibirMenu(value: boolean) {
    this.isOpenMenu = value;
  }

  hasOpen(): string {
    return this.isOpenMenu ? 'open' : 'closed';
  }
}

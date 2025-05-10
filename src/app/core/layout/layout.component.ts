import { RouterOutlet } from '@angular/router';
import { TOOGLE_SIDEBAR } from './layout.animation';
import { ToastModule } from 'primeng/toast';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { Component, OnInit } from '@angular/core';
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
  items!: MenuItem[];

  tituloVariavel: string = '';

  breadcumbs: MenuItem[] = [{ label: this.tituloVariavel }];

  breadcumbsHome!: MenuItem;

  ngOnInit(): void {
    this.items = [
      {
        label: 'Alugueis',
        icon: 'fa fa-car fa-lg',
        routerLink: '/alugueis',
        command: () => {
          this.updateBreadcrumbs('ALUGUEIS');
        },
      },
      {
        label: 'Relatórios',
        icon: 'fa fa-file fa-lg',
        routerLink: '/relatorios',
        command: () => {
          this.updateBreadcrumbs('RELATÓRIOS');
        },
      }
    ];
  }

  isOpenMenu: boolean = true;

  exibirMenu(value: boolean) {
    this.isOpenMenu = value;
  }

  hasOpen(): string {
    return this.isOpenMenu ? 'open' : 'closed';
  }

  updateBreadcrumbs(label: string) {
    this.breadcumbs = [{ label }];
  }
}

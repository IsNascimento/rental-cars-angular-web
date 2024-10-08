import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { FooterComponent } from '../template/footer/footer.component';
import { HeaderComponent } from '../template/header/header.component';
import { SideMenuComponent } from '../template/side-menu/side-menu.component';
import { TOOGLE_SIDEBAR } from './layout.animation';
import { HttpClientModule } from '@angular/common/http';

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
    HttpClientModule
  ],
  providers: [MessageService, ConfirmationService],
  animations: [TOOGLE_SIDEBAR],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
})
export class LayoutComponent implements OnInit {
  items!: MenuItem[];

  breadcumbs: MenuItem[] = [{ label: '' }];

  breadcumbsHome!: MenuItem;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.items = [
      {
        label: 'Alugueis',
        icon: 'fa fa-car fa-lg',
        command: () => this.router.navigate(['']),
      },
      {
        label: 'Relatorios',
        icon: 'fa fa-file fa-lg',
        command: () => this.router.navigate(['/relatorio']),
      },
    ];
  }

  isOpenMenu: boolean = true;

  exibirMenu(value: boolean) {
    this.isOpenMenu = value;
  }

  hasOpen(): string {
    return this.isOpenMenu ? 'open' : 'closed';
  }
}

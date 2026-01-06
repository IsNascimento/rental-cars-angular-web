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
import { Router } from '@angular/router';

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
  styleUrls: ['./layout.component.scss'], // Corrigido para styleUrls
})

export class LayoutComponent implements OnInit {
  breadcumbs: MenuItem[] = [{ label: '' }];
  breadcumbsHome!: MenuItem;

  isOpenMenu: boolean = true;

  constructor(private router: Router) {}

  ngOnInit(): void {}

  items: MenuItem[] = [
    { label: 'Página Inicial', icon: 'fa fa-home fa-lg', command: () => this.router.navigate(['']) }, 
    { label: 'Aluguel de Veiculos', icon: 'fa fa-car', command: () => this.router.navigate(['document']) }, 
    { label: 'Relatórios', icon: 'fa fa-money', command: () => this.router.navigate(['reports']) },
  ];

  exibirMenu(value: boolean) {
    this.isOpenMenu = value;
  }

  hasOpen(): string {
    return this.isOpenMenu ? 'open' : 'closed';
  }
}
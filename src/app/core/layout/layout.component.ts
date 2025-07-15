import { ActivatedRoute, NavigationEnd, PRIMARY_OUTLET, Router, RouterOutlet } from '@angular/router';
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

  constructor(private router: Router, private activatedRoute: ActivatedRoute) { }

  breadcumbs: MenuItem[] = [{ label: 'Pagina Inicial' }];

  breadcumbsHome!: MenuItem;

  ngOnInit(): void {

     //this.breadcumbsHome = { icon: 'pi pi-home', routerLink: '/' };

    // Escuta os eventos de navegação para atualizar o breadcrumb
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.breadcumbs = this.createBreadcrumbs(this.activatedRoute.root);
    });

    this.items = [
      {
        label: 'Alugueis',
        icon: 'fa fa-car fa-lg',
        routerLink: 'aluguel',
        command: () => {},
      },
      {
        label: 'Relatórios',
        icon: 'fa fa-file-o fa-lg',
        routerLink: 'relatorio',
        command: () => {},
      },
    ];
  }

  private createBreadcrumbs(route: ActivatedRoute, url: string = '', breadcrumbs: MenuItem[] = []): MenuItem[] {
    const children: ActivatedRoute[] = route.children;

    if (children.length === 0) {
      return breadcrumbs;
    }

    for (const child of children) {
      if (child.outlet !== PRIMARY_OUTLET) {
        continue;
      }

      const routeURL: string = child.snapshot.url.map(segment => segment.path).join('/');
      if (routeURL !== '') {
        url += `/${routeURL}`;
      }

      // Verifica se a rota possui dados de breadcrumb
      if (child.snapshot.data['breadcrumb']) {
        breadcrumbs.push({ label: child.snapshot.data['breadcrumb'], routerLink: url });
      }

      return this.createBreadcrumbs(child, url, breadcrumbs);
    }
    return breadcrumbs;
  }

  isOpenMenu: boolean = true;

  exibirMenu(value: boolean) {
    this.isOpenMenu = value;
  }

  hasOpen(): string {
    return this.isOpenMenu ? 'open' : 'closed';
  }
}

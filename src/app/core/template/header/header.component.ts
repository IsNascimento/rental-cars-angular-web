import { Component, Input, OnInit } from '@angular/core';
import { TabMenuModule } from 'primeng/tabmenu';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { MenuItem } from 'primeng/api';
import { CommonModule } from '@angular/common'; 
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    TabMenuModule,
    AvatarModule,
    ButtonModule,
    BreadcrumbModule,
    CommonModule,
  ],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'], 
})
export class HeaderComponent implements OnInit {

  @Input() items!: MenuItem[];

  username!: string | undefined;
  initialsName!: string;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.getUserPrincipal();
  }

  // Simulação do carregamento do usuário
  getUserPrincipal() {
    // Simulando um usuário logado
    const simulatedUser = {
      firstName: 'Claudinei',
      lastName: 'Rocha'
    };

    this.username = `${simulatedUser.firstName} ${simulatedUser.lastName}`;
    this.getInitials(this.username);
  }

  getInitials(fullName: string) {
    let initials = '';
    if (fullName) {
      const namesArray = fullName.split(' ');
      if (namesArray.length > 0) {
        initials += namesArray[0].charAt(0);
      }
      if (namesArray.length > 1) {
        initials += namesArray[namesArray.length - 1].charAt(0);
      }
    }
    this.initialsName = initials.toUpperCase();
  }
 
  logout() {
    console.log('Saindo...'); 
    // Aqui você pode adicionar lógica para o logout, se necessário
    // this.router.navigate(['/login']);
  }
}
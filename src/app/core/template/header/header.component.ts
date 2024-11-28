import { Component, Input, OnInit } from '@angular/core';
import { TabMenuModule } from 'primeng/tabmenu';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { MenuItem } from 'primeng/api';
import { CommonModule } from '@angular/common';
import {DividerModule} from "primeng/divider";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    TabMenuModule,
    AvatarModule,
    ButtonModule,
    BreadcrumbModule,
    CommonModule,
    DividerModule,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit {
  @Input() items!: MenuItem[];

  username!: string | undefined;

  initialsName!: string;

  constructor() {}

  ngOnInit(): void {
    this.getUserPrincipal();
  }

  async getUserPrincipal() {

      this.username = "Desafio Stefanini"
      this.getInitials(this.username);

  }

  // Função para extrair iniciais
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
}

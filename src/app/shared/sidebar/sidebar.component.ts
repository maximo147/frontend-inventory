import { Component, OnInit } from '@angular/core';
import { MatMenuTrigger } from '@angular/material/menu';
import { KeycloakService } from 'keycloak-angular';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit{
  public username !: string

  ngOnInit(): void {
    this.username = this._keycloakService.getUsername()
  }


  public logout() {
    this._keycloakService.logout()
  }

  constructor(
    private _keycloakService: KeycloakService
  ){}

}

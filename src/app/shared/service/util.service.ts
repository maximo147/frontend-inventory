import { Injectable, OnInit } from '@angular/core';
import { KeycloakService } from "keycloak-angular";


@Injectable({
  providedIn: 'root'
})
export class UtilService {

  getRoles(){
    return this.keycloakService.getUserRoles()
  }

  isAdmin(){
    return this.keycloakService.getUserRoles().filter(x => x == 'admin').length > 0 ? true: false
  }

  constructor(
    private keycloakService: KeycloakService
  ) { }
}

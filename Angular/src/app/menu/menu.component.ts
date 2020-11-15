import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { TokenStorageService } from '../auth/token-storage.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  info: any;
  authority: string;
  tokenStorageBlunt: any;
  roles: any;
 
  constructor(private token: TokenStorageService, private route:Router) { }
 
  ngOnInit() {
    this.info = {
      token: this.token.getToken(),
      username: this.token.getUsername(),
      authorities: this.token.getAuthorities()
      
    };
    if (this.token.getToken()) {
      this.roles = this.token.getAuthorities();
      this.roles.every(role => {
        if (role === 'ROLE_ADMIN') {
          this.authority = 'admin';
          return false;
        }
        this.authority = 'user';
        return true;
      });
    }
  }
 
  logout() {
    this.token.signOut();
    window.location.reload();
  }
}

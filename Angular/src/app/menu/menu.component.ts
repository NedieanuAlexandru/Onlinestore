import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { TokenStorageService } from '../auth/token-storage.service';
import { UserAccountService } from '../userAccount.service';
import { UserAccountData } from '../userAccountData';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  userAccount: UserAccountData = new UserAccountData();

  info: any;
  authority: string;
  tokenStorageBlunt: any;
  roles: any;
 
  constructor(private token: TokenStorageService, private route:Router,
    private activateRoutes: ActivatedRoute, private userAccountService: UserAccountService,

    ) { }
 
  ngOnInit() {
    this.info = {
      token: this.token.getToken(),
      username: this.token.getUsername(),
      authorities: this.token.getAuthorities()
    };

    let id = this.activateRoutes.snapshot.paramMap.get("id");
    console.log("Id: " + id);
    this.userAccountService.getUserAccount(Number(id)).subscribe(userResult => {
      this.userAccount = userResult;
    })

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

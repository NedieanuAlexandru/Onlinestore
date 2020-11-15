import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from '../auth/token-storage.service';
import { AuthLoginInfo } from '../auth/login-info';
import { AuthService } from '../auth/auth.service';
import { UserAccountData } from '../userAccountData';
import { ActivatedRoute, Router } from '@angular/router';
import { UserAccountService } from '../userAccount.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  userAccount: UserAccountData = new UserAccountData();

  form: any = {};
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];
  info: any;
  id: any;
  private loginInfo: AuthLoginInfo;
 
  constructor(private authService: AuthService, private tokenStorage: TokenStorageService,
    private userAccountService: UserAccountService, private router: Router,
    private activateRoutes: ActivatedRoute) { }
 
  ngOnInit() {
    let id = this.activateRoutes.snapshot.paramMap.get("id");
    console.log("Id: " + id);
    this.userAccountService.getUserAccount(Number(id)).subscribe(userResult => {
      this.userAccount = userResult;
    })

    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.roles = this.tokenStorage.getAuthorities();
    }

    this.info = {
      token: this.tokenStorage.getToken(),
      username: this.tokenStorage.getUsername(),
      authorities: this.tokenStorage.getAuthorities(),
    };
  }
 
  onSubmit() {
    console.log(this.form);
 
    this.loginInfo = new AuthLoginInfo(
      this.form.username,
      this.form.password);
 
    this.authService.attemptAuth(this.loginInfo).subscribe(
      data => {
        this.tokenStorage.saveToken(data.accessToken);
        this.tokenStorage.saveUsername(data.username);
        this.tokenStorage.saveAuthorities(data.authorities);
        this.tokenStorage
 
        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.roles = this.tokenStorage.getAuthorities();
        this.reloadPage();
      },
      error => {
        console.log(error);
        this.errorMessage = error.error.message;
        this.isLoginFailed = true;
      }
    );
  }
 
  reloadPage() {
    window.location.reload();
  }

  delete(id: number) {
    this.userAccountService.deleteUserAccount(id).subscribe(message => {
      console.log(message);
      this.router.navigateByUrl('');
    })
  }
}

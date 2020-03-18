import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { AuthService } from '../auth.service';
import { TokenService } from 'src/app/shared/services/token.service';
import { Auth } from '../auth.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              private authService: AuthService,
              private tokenService: TokenService) { }

  ngOnInit() {
    this.loginForm = new FormGroup({
      'userName': new FormControl(null, Validators.required),
      'password': new FormControl(null, Validators.required),
    });
  }

  onSubmit() {
    const auth = new Auth();
    auth.storeUser = {
      userName: this.loginForm.get('userName').value,
      password: this.loginForm.get('password').value
    };
    this.authService.login(auth)
      .subscribe(
        response => {
          this.tokenService.saveToken(response.jwtToken);
          this.tokenService.saveUsername(response.storeUser.userName);
          this.tokenService.saveAuthorities(response.storeUser.roles);
          this.router.navigate(['/dashboard'], { relativeTo: this.activatedRoute });
        }
      );
  }
}

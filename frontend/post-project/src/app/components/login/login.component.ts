import { Component, OnInit } from '@angular/core';
import { UserService } from './../../servers/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  errorMessage!: string;

  user = {
    email: '',
    password: '',
  };
  ngOnInit(): void {}

  constructor(private ur: UserService, private router: Router) {}
  token: any;
  login() {
    this.ur.login(this.user).subscribe(
      (res) => {
        this.token = res;
        console.log(res);
        localStorage.setItem('token', this.token.mytoken._id);
        localStorage.setItem('currentUser', this.token.mytoken._id);
        this.router.navigate(['/post']);
      },

      (err) => {
        this.errorMessage =
          "Vérifiez votre mot de passe ou votre adresse e-mail s'il vous plaît";
      }
    );
  }
}

import { Component } from '@angular/core';
import { UserService } from './../../servers/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent   {
  constructor(public ur :UserService , private router: Router){
  }
  navigateMyAccount(){
  this.router.navigate(['/user/'+ localStorage.getItem('currentUser')])
 }

 logout(){
  this.ur.logout();
  this.router.navigate(['/login']);
 }
}

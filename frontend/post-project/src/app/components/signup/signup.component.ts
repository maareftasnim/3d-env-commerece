import { Component, OnInit } from '@angular/core';
import { UserService } from './../../servers/user.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  errorMessage!: string;

  user = {
      firstname:'',
      lastname:'',
      email:'',
      password:'',
      age:'',
      gender:''

  }
  image: any;
  select(e:any){
    this.image = e.target.files[0];
  }
constructor(private usr: UserService , private router: Router){

}
ngOnInit(): void {

}
register(){
  let fd = new FormData()
  fd.append('firstname', this.user.firstname)
  fd.append('lastname', this.user.lastname)
  fd.append('email', this.user.email)
  fd.append('password', this.user.password)
  fd.append('age', this.user.age)
  fd.append('gender', this.user.gender)
  fd.append('image', this.image)

  this.usr.register(fd)
   .subscribe(
      (res)=>{
        this.router.navigate(['/login'])
      },
      (err) => {
        this.errorMessage =
          "Veuillez respectez ses champs s'il vous plait et verifier que votre adresse est non utilisée";
      }
   )
}
}

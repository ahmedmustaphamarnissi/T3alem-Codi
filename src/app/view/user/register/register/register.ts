import { Component } from '@angular/core';
import { AddstudentRoutingModule } from "../../../admin/addstudent/addstudent-routing-module";
import { AuthUser } from '../../../services/auth-user';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [AddstudentRoutingModule,FormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  constructor(private auth:AuthUser , private router:Router){
    
  }
  userDto = {
    Id: 0 ,
    UserName:"",
    Email:"" ,
    HashPassword:"" ,
    role:"User"
}
Register(form:any){
  this.userDto.UserName = form.value.username;
  this.userDto.Email = form.value.email;
  this.userDto.HashPassword = form.value.password;
  this.auth.Register(this.userDto).subscribe({
    next : (res:any) => {
      alert('User Account Created!');
      this.router.navigate(['/login']);
    },
    error : (err:any) => {
      alert('Registration failed!');
    }
  });
}
}

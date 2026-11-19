import { Component } from '@angular/core';
import { AddstudentRoutingModule } from '../../../admin/addstudent/addstudent-routing-module';
import { FormsModule } from '@angular/forms';
import { AuthUser } from '../../../services/auth-user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-loginuser',
  imports: [AddstudentRoutingModule, FormsModule],
  templateUrl: './loginuser.html',
  styleUrl: './loginuser.css',
})
export class Loginuser {
  constructor(
    private auth: AuthUser,
    private router: Router,
  ) {}
  loginRequest = {
    Email: '',
    Password: '',
  };
  Login(form: any) {
    this.loginRequest.Email = form.value.email;
    this.loginRequest.Password = form.value.password;
    this.auth.Login(this.loginRequest).subscribe({
      next: (res: any) => {
        if (this.auth.checkrole(res.token)) {
          localStorage.setItem('token', res.token);
          this.router.navigate(['/allstudents']);
        } else {
          alert("We don't have user with this credentials!");
        }
      },
      error: (err) => {
        console.log(err);
        alert('Invalid Credentials!');
      },
    });
  }
}

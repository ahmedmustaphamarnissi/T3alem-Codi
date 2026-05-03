import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AdminAuth } from '../../view/services/admin-auth';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-auth-admin-login',
  imports: [FormsModule],
  templateUrl: './auth-admin-login.html',
  styleUrl: './auth-admin-login.css',
})
export class AuthAdminLogin implements OnInit {
  url:any;
    constructor(private auth :AdminAuth , private route:Router,private acRoute:ActivatedRoute){
      
    }
    ngOnInit(): void {
      this.url = this.acRoute.snapshot.queryParams['returnUrl'] || '/admin';
    }
    loginAdmin(form:any){
        this.auth.login(form.value.email, form.value.password).subscribe({
          next : (res:any) => {
            if(this.auth.CheckAdmin(res)){
              this.auth.SaveData(res);
              this.route.navigate([this.url]);
            }
            else{
              alert('we havent found any admin with this credential!');
            }
          },
          error : (err:any) => {
            alert('Invalid credentials!');
          }
        });
    }
  }

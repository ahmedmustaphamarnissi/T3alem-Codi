import {  NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Loginuser } from './loginuser/loginuser';

const routes: Routes = [{path : '' , component:Loginuser}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginuserRoutingModule { }

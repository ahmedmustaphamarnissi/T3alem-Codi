import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Addstudent } from './addstudent/addstudent';

const routes: Routes = [{path:'' , component:Addstudent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddstudentRoutingModule { }

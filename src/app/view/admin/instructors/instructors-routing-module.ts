import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Instructors } from './instructors/instructors';

const routes: Routes = [{path:'', component:Instructors}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InstructorsRoutingModule { }

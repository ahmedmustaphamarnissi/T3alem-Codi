import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddCourse } from './add-course/add-course';

const routes: Routes = [{path : '' , component : AddCourse}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddCourseRoutingModule { }

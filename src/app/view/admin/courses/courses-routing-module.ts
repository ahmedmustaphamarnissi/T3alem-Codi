import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Courses } from './courses/courses';
import { CourseDetails } from './course-details/course-details';

const routes: Routes = [
  { path: '', component: Courses },
  { path: 'details/:id', component: CourseDetails },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CoursesRoutingModule {}

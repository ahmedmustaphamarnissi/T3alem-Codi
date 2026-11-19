import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Allstudents } from './allstudents/allstudents';

const routes: Routes = [{ path: '', component: Allstudents }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AllstudentsRoutingModule {}

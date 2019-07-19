import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StudentsDisplayComponent } from './students-display/students-display.component';


const routes: Routes = [
  {path: '', component: StudentsDisplayComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentsRoutingModule { }

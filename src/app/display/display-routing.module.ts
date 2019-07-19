import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StudentsDisplayComponent } from './students-display/students-display.component';
import { CoursesDisplayComponent } from './courses-display/courses-display.component';


const routes: Routes = [
  {
    path: 'students',
    component: StudentsDisplayComponent
  },
  {
    path: 'courses',
    component: CoursesDisplayComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DisplayRoutingModule { }

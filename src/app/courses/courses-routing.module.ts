import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CoursesDisplayComponent } from './courses-display/courses-display.component';
import { NewCourseFormComponent } from './new-course-form/new-course-form.component';


const routes: Routes = [
  {path: '', component: CoursesDisplayComponent},
  {path: 'add', component: NewCourseFormComponent},
  {path: 'edit/:id', component: NewCourseFormComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoursesRoutingModule { }

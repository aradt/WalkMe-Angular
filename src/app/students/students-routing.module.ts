import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StudentsDisplayComponent } from './students-display/students-display.component';
import { NewStudentFormComponent } from './new-student-form/new-student-form.component';


const routes: Routes = [
  {path: '', component: StudentsDisplayComponent},
  {path: 'add', component: NewStudentFormComponent},
  {path: 'edit/:id', component: NewStudentFormComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentsRoutingModule { }

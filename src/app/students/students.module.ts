import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudentsRoutingModule } from './students-routing.module';
import { ShareModule } from '../share/share.module';
import { StudentsDisplayComponent } from './students-display/students-display.component';
import { NewStudentFormComponent } from './new-student-form/new-student-form.component';
import { StudentsService } from './services/students.service';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [StudentsDisplayComponent, NewStudentFormComponent],
  imports: [
    CommonModule,
    StudentsRoutingModule,
    ShareModule,
    FormsModule
  ],
  providers: [StudentsService]
})
export class StudentsModule { }

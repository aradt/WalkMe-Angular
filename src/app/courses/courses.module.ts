import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoursesRoutingModule } from './courses-routing.module';
import { ShareModule } from '../share/share.module';
import { CoursesDisplayComponent } from './courses-display/courses-display.component';
import { NewCourseFormComponent } from './new-course-form/new-course-form.component';


@NgModule({
  declarations: [CoursesDisplayComponent, NewCourseFormComponent],
  imports: [
    CommonModule,
    CoursesRoutingModule,
    ShareModule
  ]
})
export class CoursesModule { }

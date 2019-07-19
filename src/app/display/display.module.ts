import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DisplayRoutingModule } from './display-routing.module';
import { StudentsDisplayComponent } from './students-display/students-display.component';
import { CoursesDisplayComponent } from './courses-display/courses-display.component';


@NgModule({
  declarations: [StudentsDisplayComponent, CoursesDisplayComponent],
  imports: [
    CommonModule,
    DisplayRoutingModule
  ]
})
export class DisplayModule { }

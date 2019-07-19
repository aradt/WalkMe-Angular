import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudentsRoutingModule } from './students-routing.module';
import { ShareModule } from '../share/share.module';
import { StudentsDisplayComponent } from './students-display/students-display.component';


@NgModule({
  declarations: [StudentsDisplayComponent],
  imports: [
    CommonModule,
    StudentsRoutingModule,
    ShareModule
  ]
})
export class StudentsModule { }

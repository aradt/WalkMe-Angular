import { Component, OnInit } from '@angular/core';
import { StudentsService } from './services/students.service';
import { Observable } from 'rxjs';
import { Student } from 'src/app/models/student';

@Component({
  selector: 'app-students-display',
  templateUrl: './students-display.component.html',
  styleUrls: ['./students-display.component.scss'],
  providers: [ StudentsService]
})
export class StudentsDisplayComponent implements OnInit {

  students$: Observable<Student>;

  constructor(private studentsService: StudentsService) { }

  ngOnInit() {
    this.students$ = this.studentsService.getStudetns();
  }

}

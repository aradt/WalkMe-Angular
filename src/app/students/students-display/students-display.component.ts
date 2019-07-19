import { Component, OnInit } from '@angular/core';
import { StudentsService } from '../services/students.service';
import { Observable } from 'rxjs';
import { Student } from 'src/app/models/student';
import { shareReplay } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-students-display',
  templateUrl: './students-display.component.html',
  styleUrls: ['./students-display.component.scss'],
  providers: [ ]
})
export class StudentsDisplayComponent implements OnInit {

  students$: Observable<Student[]>;

  constructor(private studentsService: StudentsService, private route: Router) { }

  ngOnInit() {
    this.studentsService.refresh();
    this.students$ = this.studentsService.getStudetns();
  }

  onRowClicked(student: Student) {
    this.route.navigate(['/students/edit/' + student.ID]);
  }

}

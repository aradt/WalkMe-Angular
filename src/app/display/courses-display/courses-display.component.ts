import { Component, OnInit } from '@angular/core';
import { CoursesService } from './services/courses.service';
import { Observable } from 'rxjs';
import { Course } from 'src/app/models/course';

@Component({
  selector: 'app-courses-display',
  templateUrl: './courses-display.component.html',
  styleUrls: ['./courses-display.component.scss'],
  providers: [CoursesService]
})
export class CoursesDisplayComponent implements OnInit {

  courses$: Observable<Course>;

  constructor(private coursesService: CoursesService) { }

  ngOnInit() {
    this.courses$ = this.coursesService.getCourses();
  }

}

import { Component, OnInit } from '@angular/core';
import { CoursesService } from '../services/courses.service';
import { Observable } from 'rxjs';
import { Course } from 'src/app/models/course';
import { map, shareReplay } from 'rxjs/operators';

@Component({
  selector: 'app-courses-display',
  templateUrl: './courses-display.component.html',
  styleUrls: ['./courses-display.component.scss'],
  providers: []
})
export class CoursesDisplayComponent implements OnInit {

  courses$: Observable<Course[]>;

  constructor(private coursesService: CoursesService) { }

  ngOnInit() {
    this.courses$ = this.coursesService.getCourses();
  }

  onAddCourseClicked() {

  }

}

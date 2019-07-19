import { Component, OnInit } from '@angular/core';
import { CoursesService } from '../services/courses.service';
import { Observable } from 'rxjs';
import { Course } from 'src/app/models/course';
import { map, shareReplay } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-courses-display',
  templateUrl: './courses-display.component.html',
  styleUrls: ['./courses-display.component.scss'],
  providers: []
})
export class CoursesDisplayComponent implements OnInit {

  courses$: Observable<Course[]>;

  constructor(private coursesService: CoursesService, private route: Router) { }

  ngOnInit() {
    this.courses$ = this.coursesService.getCourses();
  }

  onRowClicked(course: Course) {
    this.route.navigate(['/courses/edit/' + course.ID]);
  }

}

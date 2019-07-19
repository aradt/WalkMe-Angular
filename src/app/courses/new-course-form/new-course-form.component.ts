import { Component, OnInit, OnDestroy } from '@angular/core';
import { CoursesService } from '../services/courses.service';
import { Router, ActivatedRoute, UrlSegment } from '@angular/router';
import { tap, takeUntil, switchMap } from 'rxjs/operators';
import { Subject, empty, throwError } from 'rxjs';
import { Course, emptyCourse } from 'src/app/models/course';



@Component({
  selector: 'app-new-course-form',
  templateUrl: './new-course-form.component.html',
  styleUrls: ['./new-course-form.component.scss']
})
export class NewCourseFormComponent implements OnInit, OnDestroy {

  private unsubscribeSubject = new Subject();

  course: Course = emptyCourse();

  mode: 'Edit' | 'Add';

  constructor(private coursesService: CoursesService,
    private activeRouter: ActivatedRoute,
    private route: Router) { }

  ngOnInit() {
    this.activeRouter.url.pipe(
      takeUntil(this.unsubscribeSubject),
      switchMap((urlParams: UrlSegment[]) => {
        this.mode = urlParams[0].path === 'add' ? 'Add' : 'Edit';
        if (this.mode === 'Add') {
          return empty();
        } else {
          // load exist course
          // not ready yet
          return this.coursesService.getCourseById('0');
        }
      })
    ).subscribe();
  }

  ngOnDestroy() {
    this.unsubscribeSubject.next();
    this.unsubscribeSubject.complete();
  }

  onAddClick() {
    this.coursesService.getCourses().pipe(
      tap( courses => {
        // check if the course exist by id;
        courses.filter(existCourse => existCourse.ID === this.course.ID );
        // if course with the same if had been found
        if (courses.length === 0) {
          this.coursesService.Add(this.course);
        } else {
          // incase that the id is exist
          throw new Error('Course id alread exist');
        }
      })
    ).subscribe( () => {
      this.route.navigate(['/courses']);
    }, err => {
      console.log(err);
    });
  }

}

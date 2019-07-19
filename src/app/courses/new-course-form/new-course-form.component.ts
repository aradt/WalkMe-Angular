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
          return this.coursesService.getCourseById(urlParams[1].path);
        }
      })
    ).subscribe(existCourse => {
      this.course = existCourse[0];
    });
  }

  ngOnDestroy() {
    this.unsubscribeSubject.next();
    this.unsubscribeSubject.complete();
  }

  onSaveClick() {
    this.mode === 'Add' ? this.onAddClick() : this.onEditClick();
  }

  onAddClick() {
    this.coursesService.getCourses().pipe(
      tap( courses => {
        // check if the course exist by id;
        const existCourses = courses.filter(existCourse => existCourse.ID === this.course.ID );
        // if course with the same if had been found
        if (existCourses.length === 0) {
          this.coursesService.add(this.course);
        }
      })
    ).subscribe( () => {
      this.route.navigate(['/courses']);
    }, err => {
      console.log(err);
    });
  }

  onEditClick() {
    this.coursesService.getCourses().pipe(
      tap( courses => {
        // check if the course exist by id;
        const existCourses = courses.filter(existCourse => existCourse.ID === this.course.ID );
        // if course with the same if had been found
        if (existCourses.length > 0) {
          this.coursesService.edit(this.course);
        } else {
          // incase that the id is exist
          throw new Error('Course not exist');
        }
      })
    ).subscribe( () => {
      this.route.navigate(['/courses']);
    }, err => {
      console.log(err);
    });
  }

}

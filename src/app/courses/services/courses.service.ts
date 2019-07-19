import { Injectable } from '@angular/core';
import { HttpRequestService } from 'src/app/services/http-request.service';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { Course } from 'src/app/models/course';
import { shareReplay, switchMap, map, tap } from 'rxjs/operators';
import { filter } from 'minimatch';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {
  private courseSubject = new BehaviorSubject<Course[]>([]);
  private newCourses: Course[] = [];
  private editCourses: Course[] = [];
  private coursesObservavle$: Observable<Course[]>;

  constructor(private httpRequestService: HttpRequestService) {
    // save the data local
    this.coursesObservavle$ = this.httpRequestService.getCourses().pipe(
      shareReplay(1),
    );
  }

  getCourses() {
    return this.courseSubject.asObservable().pipe(
      switchMap(addedList => this.coursesObservavle$.pipe(
        // combine the data from the server with the new courses
        map(courses => [...courses, ...addedList]),
        // update the edited courses
        tap(courses => courses.forEach(existCourse => {
          const editCourses = this.editCourses.filter(editCourse => editCourse.ID === existCourse.ID);
          if (editCourses.length > 0) {
            Object.assign(existCourse, editCourses[0]);
          }
        }))
      )),

    );
  }

  refresh() {
    this.courseSubject.next(this.newCourses);
  }

  getCourseById(id: string) {
    return this.coursesObservavle$.pipe(
      map((courses: Course[]) => courses.filter(course => course.ID === id))
    );
  }

  add(course: Course) {
    this.newCourses.push(course);
  }

  edit(course: Course) {
    this.editCourses.push(course);
  }
}

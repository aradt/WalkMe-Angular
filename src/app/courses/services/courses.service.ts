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
  private addedCourses: Course[] = [];
  private coursesObservavle$: Observable<Course[]>;

  constructor(private httpRequestService: HttpRequestService) {
    this.coursesObservavle$ = this.httpRequestService.getCourses().pipe(
      shareReplay(1),
    );
  }

  getCourses() {
    return this.courseSubject.asObservable().pipe(
      switchMap(addedList => this.coursesObservavle$.pipe(
        map(courses => [...courses, ...addedList])
      )),

    );
  }

  getCourseById(id: string) {
    return this.coursesObservavle$.pipe(
      map((courses: Course[]) => courses.filter(course => course.ID === id))
    );
  }

  Add(course: Course) {
    this.addedCourses.push(course);
    this.courseSubject.next(this.addedCourses);
  }
}

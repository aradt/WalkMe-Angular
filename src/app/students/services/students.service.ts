import { Injectable } from '@angular/core';
import { HttpRequestService } from 'src/app/services/http-request.service';
import { Observable, BehaviorSubject } from 'rxjs';
import { Student } from 'src/app/models/student';
import { shareReplay, switchMap, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class StudentsService {

  private studentSubject = new BehaviorSubject<Student[]>([]);
  private addedStudents: Student[] = [];
  private studentObserver$: Observable<Student[]>;

  constructor(private httpRequestService: HttpRequestService) {
    this.studentObserver$ = this.httpRequestService.getStudents().pipe(
      shareReplay()
    );
  }

  getStudetns() {
    return this.studentSubject.asObservable().pipe(
      switchMap(addedList => this.studentObserver$.pipe(
        map(students => [...students, ...addedList])
      ))
    );
  }

  add(student: Student) {
    this.addedStudents.push(student);
    this.studentSubject.next(this.addedStudents);
  }

}

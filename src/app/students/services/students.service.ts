import { Injectable } from '@angular/core';
import { HttpRequestService } from 'src/app/services/http-request.service';
import { Observable, BehaviorSubject } from 'rxjs';
import { Student } from 'src/app/models/student';
import { shareReplay, switchMap, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class StudentsService {

  private studentSubject = new BehaviorSubject<Student[]>([]);
  private addedStudents: Student[] = [];
  private editedStudents: Student[] = [];
  private studentObserver$: Observable<Student[]>;

  constructor(private httpRequestService: HttpRequestService) {
    // save the data local
    this.studentObserver$ = this.httpRequestService.getStudents().pipe(
      shareReplay(1)
    );
  }

  getStudetns() {
    return this.studentSubject.asObservable().pipe(
      switchMap(addedList => this.studentObserver$.pipe(
        // combine the data from the server with the new courses
        map(students => [...students, ...addedList]),
        // update the edited courses
        tap(students => students.forEach(existCourse =>{
          const editStudents = this.editedStudents.filter(editCourse => editCourse.ID === existCourse.ID);
          if (editStudents.length > 0) {
            Object.assign(existCourse, editStudents[0]);
          }
        }))
      ))
    );
  }

  refresh() {
    this.studentSubject.next(this.addedStudents);
  }

  add(student: Student) {
    this.addedStudents.push(student);
  }

  getStudentById(id: string) {
    return this.studentObserver$.pipe(
      map((student: Student[]) => student.filter(existStudent => existStudent.ID === id))
    );
  }

  edit(student: Student) {
    this.editedStudents.push(student);
  }

}

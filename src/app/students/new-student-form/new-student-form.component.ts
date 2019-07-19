import { Component, OnInit, OnDestroy } from '@angular/core';
import { StudentsService } from '../services/students.service';
import { Student, emptyStudent } from 'src/app/models/student';
import { tap, takeUntil, switchMap } from 'rxjs/operators';
import { ActivatedRoute, Router, UrlSegment } from '@angular/router';
import { empty, Subject } from 'rxjs';

@Component({
  selector: 'app-new-student-form',
  templateUrl: './new-student-form.component.html',
  styleUrls: ['./new-student-form.component.scss']
})
export class NewStudentFormComponent implements OnInit, OnDestroy {

  private unsubscribeSubject = new Subject();
  mode: 'Edit' | 'Add';
  student: Student = emptyStudent();

  constructor(private studentsService: StudentsService,
    private activeRouter: ActivatedRoute,
    private route: Router) {

   }

  ngOnInit() {
    this.activeRouter.url.pipe(
      takeUntil(this.unsubscribeSubject),
      switchMap((urlParams: UrlSegment[]) => {
        this.mode = urlParams[0].path === 'add' ? 'Add' : 'Edit';
        if (this.mode === 'Add') {
          return empty();
        } else {
          // load exist student
          // not ready yet
          return this.studentsService.getStudentById(urlParams[1].path);
        }
      })
    ).subscribe(existStudents => {
      this.student = existStudents[0];
    });
  }

  ngOnDestroy() {
    this.unsubscribeSubject.next();
    this.unsubscribeSubject.complete();
  }

  onSave() {
    this.mode === 'Add' ? this.onAddClick() : this.onEditClick();
  }

  private onAddClick() {
    this.studentsService.getStudetns().pipe(
      tap( students => {
        // check if the course exist by id;
        const existStudents = students.filter(student => student.ID === this.student.ID );
        // if course with the same if had been found
        if (existStudents.length === 0) {
          this.studentsService.add(this.student);
        }
      })
    ).subscribe( () => {
      this.route.navigate(['/students']);
    }, err => {
      console.log(err);
    });
  }

  private onEditClick() {
    this.studentsService.getStudetns().pipe(
      tap( students => {
        // check if the course exist by id;
        students.filter(student => student.ID === this.student.ID );
        // if course with the same if had been found
        if (students.length > 0) {
          this.studentsService.edit(this.student);
        } else {
          // incase that the id is exist
           throw new Error('student does not exist');
        }
      })
    ).subscribe( () => {
      this.route.navigate(['/students']);
    }, err => {
      console.log(err);
    });
  }

}

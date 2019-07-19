import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { Student } from '../models/student';
import { HttpClient } from '@angular/common/http';
import { Course } from '../models/course';
import { Mark } from '../models/mark';

@Injectable({
  providedIn: 'root'
})
export class HttpRequestService {
  private studentsUrl = 'https://my-json-server.typicode.com/YonatanKra/demoStudentsServer/students';
  private coursesurl = 'https://my-json-server.typicode.com/YonatanKra/demoStudentsServer/courses';
  private marksUrl = 'https://my-json-server.typicode.com/YonatanKra/demoStudentsServer/marks';

  constructor(private httpClient: HttpClient) { }

  getStudents(): Observable<Student[]> {
    return this.httpClient.get<Student[]>(this.studentsUrl);
  }

  getCourses(): Observable<Course[]> {
    return this.httpClient.get<Course[]>(this.coursesurl);
  }

  getMarks(): Observable<Mark[]> {
    return this.httpClient.get<Mark[]>(this.marksUrl);
  }

}

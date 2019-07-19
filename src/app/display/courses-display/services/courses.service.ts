import { Injectable } from '@angular/core';
import { HttpRequestService } from 'src/app/services/http-request.service';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  constructor(private httpRequestService: HttpRequestService) { }

  getCourses() {
    return this.httpRequestService.getCourses();
  }
}

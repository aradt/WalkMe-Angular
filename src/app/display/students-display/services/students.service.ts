import { Injectable } from '@angular/core';
import { HttpRequestService } from 'src/app/services/http-request.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentsService {

  constructor(private httpRequestService: HttpRequestService) { }

  getStudetns() {
    return this.httpRequestService.getStudents();
  }

}

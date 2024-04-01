import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FacultyService {
  constructor(
    private http: HttpClient
  ) { }

  getAllFaculties(): Observable<any> {
    const url = 'http://localhost:8080/api/faculty';
    return this.http.get<any>(url);
  }

  getAllFacultyChoices(groupId: string): Observable<any> {
    const url = 'http://localhost:8080/api/facultyChoice/' + groupId;
    return this.http.get<any>(url);
  }

  saveFacultyChoice(groupId: string, facultyId: string): Observable<any> {
    const url = 'http://localhost:8080/api/facultyChoice/' + groupId + '/' + facultyId;
    return this.http.post<any>(url, {});
  }

  changePriority(groupId: string, facultyId: string, priority: number): Observable<any> {
    const url = 'http://localhost:8080/api/facultyChoice/changePriority/' + groupId + '/' + facultyId + '/' + priority;
    return this.http.post<any>(url, {});
  }

  removeFacultyChoice(facultyId: string, groupId: string) {
    const url = "http://localhost:8080/api/facultyChoice/" + groupId + "/" + facultyId;
    return this.http.delete<any>(url);
  }
}

import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  Observable,
  catchError,
  map,
  of,
  throwError,
} from 'rxjs';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Student } from '../interface/student';
import { Faculty } from '../interface/faculty';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  private dashboard = new BehaviorSubject<boolean>(true);
  private addStudents = new BehaviorSubject<boolean>(false);
  private addFaculties = new BehaviorSubject<boolean>(false);
  private phaseControl = new BehaviorSubject<boolean>(false);
  private communication = new BehaviorSubject<boolean>(false);

  _dashboard = this.dashboard.asObservable();
  _addStudents = this.addStudents.asObservable();
  _addFaculties = this.addFaculties.asObservable();
  _phaseControl = this.phaseControl.asObservable();
  _communication = this.communication.asObservable();
  updateState(
    dashboard: boolean,
    addStudents: boolean,
    addFaculties: boolean,
    phaseControl: boolean,
    communication: boolean
  ) {
    this.addStudents.next(addStudents);
    this.dashboard.next(dashboard);
    this.addFaculties.next(addFaculties);
    this.phaseControl.next(phaseControl);
    this.communication.next(communication);
  }

  private apiUrl = 'http://localhost:8080';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(private httpClient: HttpClient) {}

  getAllStudents(): Observable<any> {
    const url = this.apiUrl + '/api/student';
    return this.httpClient.get<any>(url);
  }

  getAllFaculties(): Observable<any> {
    const url = this.apiUrl + '/api/faculty';
    return this.httpClient.get<any>(url);
  }

  saveStudent(student: Student): Observable<boolean> {
    const url = this.apiUrl + '/api/student';
    return this.httpClient.post(url, student).pipe(
      map((response: any) => {
        console.log('POST request successful', response);
        return true;
      }),
      catchError((error) => {
        console.error('Error in POST request', error);
        return of(false);
      })
    );
  }

  saveFaculty(
    faculty: Faculty
  ): Observable<{ success: boolean; data?: any; error?: any }> {
    const url = `${this.apiUrl}/api/faculty`;
    return this.httpClient
      .post(url, faculty, { observe: 'response', responseType: 'text' })
      .pipe(
        map((response: HttpResponse<any>) => {
          if (response.status === 200) {
            console.log('POST request successful', response);
            return { success: true, data: response.body };
          } else {
            console.error('Error in POST request', response);
            return { success: false, error: response.body };
          }
        }),
        catchError((error) => {
          console.error('Error in POST request', error);
          return of({ success: false, error });
        })
      );
  }

  addUpdateResult(
    result: any,
    studentID: number
  ): Observable<{ success: boolean; data?: any; error?: any }> {
    const url = `${this.apiUrl}/api/result/${studentID}`;
    return this.httpClient
      .post(url, result, { observe: 'response', responseType: 'text' })
      .pipe(
        map((response: HttpResponse<any>) => {
          if (response.status === 200) {
            console.log('POST request successful', response);
            return { success: true, data: response.body };
          } else {
            console.error('Error in POST request', response);
            return { success: false, error: response.body };
          }
        }),
        catchError((error) => {
          console.error('Error in POST request', error);
          return of({ success: false, error });
        })
      );
  }

  getAllPhases(): Observable<any> {
    const url = this.apiUrl + '/api/phase';
    return this.httpClient.get<any>(url);
  }

  groupAllocation(): Observable<boolean> {
    const url = this.apiUrl + '/api/group/assignRank';
    return this.httpClient.post(url, {}).pipe(
      map((response: any) => {
        console.log('POST request successful', response);
        return true;
      }),
      catchError((error) => {
        console.error('Error in POST request', error);
        return of(false);
      })
    );
  }

  projectAllocation(): Observable<boolean> {
    const url = this.apiUrl + '/api/projectChoice/assignProject';
    return this.httpClient.post(url, {}).pipe(
      map((response: any) => {
        console.log('POST request successful', response);
        return true;
      }),
      catchError((error) => {
        console.error('Error in POST request', error);
        return of(false);
      })
    );
  }

  facultyAllocation(): Observable<boolean> {
    const url = this.apiUrl + '/api/facultyChoice/assignFaculty';
    return this.httpClient.post(url, {}).pipe(
      map((response: any) => {
        console.log('POST request successful', response);
        return true;
      }),
      catchError((error) => {
        console.error('Error in POST request', error);
        return of(false);
      })
    );
  }

  savePhase(
    phase: any
  ): Observable<{ success: boolean; data?: any; error?: any }> {
    const url = `${this.apiUrl}/api/phase`;
    return this.httpClient
      .post(url, phase, { observe: 'response', responseType: 'text' })
      .pipe(
        map((response: HttpResponse<any>) => {
          if (response.status === 200) {
            console.log('POST request successful', response);
            return { success: true, data: response.body };
          } else {
            console.error('Error in POST request', response);
            return { success: false, error: response.body };
          }
        }),
        catchError((error) => {
          console.error('Error in POST request', error);
          return of({ success: false, error });
        })
      );
  }
}

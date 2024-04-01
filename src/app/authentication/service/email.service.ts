import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EmailService {
  constructor(private http: HttpClient) {}

  apiUrl = 'http://localhost:8080';

  sendEmail(
    email: any
  ): Observable<{ success: boolean; data?: any; error?: any }> {
    const url = `${this.apiUrl}/api/e-mail`;
    return this.http
      .post(url, email, { observe: 'response', responseType: 'text' })
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

import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Todo } from './todo';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  [x: string]: any;
  private apiURL = 'http://localhost:3000/todo';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(private httpClient: HttpClient) {}

  getAll(): Observable<Todo[]> {
    return this.httpClient
      .get<Todo[]>(this.apiURL)
      .pipe(catchError(this.errorHandler));
  }
  create(Todo: Todo): Observable<any> {
    return this.httpClient
        .post<any>(
          this.apiURL + '/add',
          JSON.stringify(Todo),
          this.httpOptions
        );
  }
  // create(Todo: Todo): Observable<Todo> {
  //   // alert(JSON.stringify(Todo));
  //   return this.httpClient
  //     .post<Todo>(
  //       this.apiURL + '/add',
  //       JSON.stringify(Todo),
  //       this.httpOptions
  //     )
  //     .pipe(catchError(this.errorHandler));
  // }

  find(id: number): Observable<Todo> {
    return this.httpClient
      .get<Todo>(this.apiURL + '/' + id + '/read')
      .pipe(catchError(this.errorHandler));
  }

  update(id: number, Todo: Todo): Observable<Todo> {

    return this.httpClient
      .put<Todo>(
        this.apiURL + '/' + id + '/update',
        JSON.stringify(Todo),
        this.httpOptions
      )
      .pipe(catchError(this.errorHandler));
  }

  delete(id: number) {
    return this.httpClient
      .delete<Todo>(this.apiURL + '/' + id + '/delete', this.httpOptions)
      .pipe(catchError(this.errorHandler));
  }

  errorHandler(error: any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }
}


import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LessonsService {
  private apiUrl = 'http://localhost:3000/api/courses';

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const token = sessionStorage.getItem('userToken');
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  getLessons(courseId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/${courseId}/lessons`, { headers: this.getHeaders() });
  }

  getLesson(courseId: number, lessonId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${courseId}/lessons/${lessonId}`, { headers: this.getHeaders() });
  }

  addLesson(courseId: number, title: string, content: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/${courseId}/lessons`, 
      { title, content, courseId }, 
      { headers: this.getHeaders() }
    );
  }

  updateLesson(courseId: number, lessonId: number, title: string, content: string): Observable<any> {
    return this.http.put(`${this.apiUrl}/${courseId}/lessons/${lessonId}`, 
      { title, content, courseId }, 
      { headers: this.getHeaders() }
    );
  }

  deleteLesson(courseId: number, lessonId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${courseId}/lessons/${lessonId}`, { headers: this.getHeaders() });
  }
}

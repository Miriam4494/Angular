
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Course } from '../models/course';


@Injectable({
  providedIn: 'root'
})
export class CoursesService {
  private apiUrl = 'http://localhost:3000/api/courses';

  constructor(private http: HttpClient) {}


  getAllCourses(): Observable<Course[]> {
    const token = sessionStorage.getItem('userToken'); 
    if (!token) {
      throw new Error('User is not logged in');
    }
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<Course[]>(this.apiUrl, { headers });
  }



  checkEnrollment(courseId: string, studentId: string): Observable<boolean> {
    const token = sessionStorage.getItem('userToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    
    return this.http.get<any[]>(`${this.apiUrl}/student/${studentId}`, { headers }).pipe(
      map(courses => {
      
        return courses.some(course => course.id == courseId);
      })
    );
  }

  enrollInCourse(courseId: string, userId: string): Observable<any> {
    const token = sessionStorage.getItem('userToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post<any>(`${this.apiUrl}/${courseId}/enroll`, { userId }, { headers });
  }

  getCourseById(courseId: string): Observable<Course> {
    const token = sessionStorage.getItem('userToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<Course>(`${this.apiUrl}/${courseId}`, { headers });
  }

  leaveCourse(courseId: string, userId: string): Observable<any> {
    const token = sessionStorage.getItem('userToken');
    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${token}`);
  
    return this.http.delete<any>(`${this.apiUrl}/${courseId}/unenroll`, { 
      headers, 
      body: { userId } 
    });
  }

  createCourse(courseData: { title: string, description: string, teacherId: string }): Observable<any> {
    const token = sessionStorage.getItem('userToken');
    if (!token) {
      throw new Error('User is not logged in');
    }
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post<any>('http://localhost:3000/api/courses', courseData, { headers });
  }
  
  updateCourse(courseId: string, courseData: { title: string, description: string, teacherId: string }): Observable<any> {
    const token = sessionStorage.getItem('userToken');
    if (!token) {
      throw new Error('User is not logged in');
    }
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.put<any>(`http://localhost:3000/api/courses/${courseId}`, courseData, { headers });
  }
  

  deleteCourse(courseId: string): Observable<any> {
    const token = sessionStorage.getItem('userToken');
    if (!token) {
      throw new Error('User is not logged in');
    }
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.delete<any>(`${this.apiUrl}/${courseId}`, { headers });
  }

getStudentCourses(studentId: string): Observable<Course[]> {
  const token = sessionStorage.getItem('userToken');
  if (!token) {
    throw new Error('User is not logged in');
  }
  const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

  return this.http.get<Course[]>(`${this.apiUrl}/student/${studentId}`, { headers });
}

  
}

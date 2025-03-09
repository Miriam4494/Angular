import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/api'; 

  private userSubject = new BehaviorSubject<User | null>(null); 
  user$: Observable<User | null> = this.userSubject.asObservable(); 

  constructor(private http: HttpClient) {
    const storedUser = sessionStorage.getItem('user');
    if (storedUser) {
      this.userSubject.next(JSON.parse(storedUser)); 
    }
  }

  postLoginOrRegister(userStatus: string, data: Partial<User>): Observable<{ token: string, user: User }> {
    return new Observable(observer => {
      this.http.post<{ token: string, user: User }>(`${this.apiUrl}/auth/${userStatus}`, data).subscribe({
        next: (response) => {
          sessionStorage.setItem('userToken', response.token); 
          sessionStorage.setItem('user', JSON.stringify(response.user)); 
          this.userSubject.next(response.user); 
          observer.next(response);
          observer.complete();
        },
        error: (err) => observer.error(err)
      });
    });
  }

  getToken(): string | null {
    return sessionStorage.getItem('userToken');
  }

  logout(): void {
    sessionStorage.removeItem('userToken');
    sessionStorage.removeItem('user');
    this.userSubject.next(null); 
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  getUserDetails(userId: string): Observable<User> {
    const token = this.getToken();
    if (!token) {
      throw new Error('User is not logged in');
    }
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<User>(`${this.apiUrl}/users/${userId}`, { headers });
  }

  getUser(): Observable<User | null> {
    return this.user$;
  }
}

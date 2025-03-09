import { Component, Inject, OnInit } from '@angular/core';
import { Course } from '../../models/course';
import { CoursesService } from '../../services/course.service';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.css'],
  imports:[RouterModule,CommonModule,MatIconModule]
})
export class CoursesListComponent implements OnInit {
  courses: Course[] = []; 
  error: string = ''; 

  constructor(@Inject(CoursesService) private coursesService: CoursesService,private authService:AuthService) { }

  ngOnInit(): void {
    this.loadCourses();
  }

  loadCourses(): void {
    this.coursesService.getAllCourses().subscribe({
      next: (courses) => {
        this.courses = courses; 
      },
      error: (err) => {

        this.error = 'Error loading courses';
        console.error(err);
      }
    });
  }
  isTeacher() {
    return this.authService.isTeacher();}
    deleteCourse(courseId: string): void {
      if (confirm('Are you sure you want to delete this course?')) {
        this.coursesService.deleteCourse(courseId).subscribe({
          next: () => {
            alert('Course deleted successfully');
            this.loadCourses(); 
          },
          error: (err) => {
            console.error('Error deleting course:', err);
            alert('Error deleting course');
          }
        });
      }
    }
    
}


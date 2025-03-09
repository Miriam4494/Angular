
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CoursesService } from '../../services/course.service';
import { Course } from '../../models/course';
import { AuthService } from '../../services/auth.service';
import { LessonsComponent } from '../lessons/lessons.component';
import { MatIconModule } from '@angular/material/icon';
import Swal from 'sweetalert2'


@Component({
  selector: 'app-course-detail',
  templateUrl: './course-details.component.html',
  styleUrls: ['./course-details.component.css'],
  imports: [LessonsComponent, MatIconModule]
})
export class CourseDetailComponent implements OnInit {
  course: Course | null = null;
  error: string = '';
  isEnrolled: boolean = false;

  constructor(
    private coursesService: CoursesService,
    private route: ActivatedRoute,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    const courseId = this.route.snapshot.paramMap.get('id');
    if (courseId) {
      this.loadCourseDetails(courseId);
      this.checkEnrollment(courseId);
    }
  }

  loadCourseDetails(courseId: string): void {
    this.coursesService.getCourseById(courseId).subscribe({
      next: (course) => {
        this.course = course;
      },
      error: (err) => {
        this.error = 'Error loading course details';
        console.error(err);
      }
    });
  }

  checkEnrollment(courseId: string): void {
    const userId = this.authService.getUserId();
    if (userId) {

      this.coursesService.checkEnrollment(courseId, userId).subscribe({
        next: (isEnrolled) => {
          this.isEnrolled = isEnrolled;
        },
        error: (err) => {
          console.error("Error checking enrollment:", err);
          this.isEnrolled = false;
        }
      });


    }
  }

  enrollInCourse(courseId: string): void {
    const userId = this.authService.getUserId();
    console.log(userId);

    if (userId) {
      this.coursesService.enrollInCourse(courseId, userId).subscribe({
        next: (response) => {
          this.isEnrolled = true;
          console.log("Enrolling");
          console.log(this.isEnrolled);

          Swal.fire({
            title: "Enrolled in course successfully!",
            icon: "success",
            draggable: true
          });
        },
        error: (err) => {
          console.error('Error enrolling in course', err);
        }
      });
    }
  }
  leaveCourse(courseId: string): void {
    const userId = this.authService.getUserId();

    if (userId) {
      this.coursesService.leaveCourse(courseId, userId).subscribe({
        next: () => {
          this.isEnrolled = false;
          Swal.fire({
            title: "You have left the course!",
            icon: "success",
            draggable: true
          });
        },
        error: (err) => {
          console.error('Error leaving course', err);
        }
      });
    }
  }

}


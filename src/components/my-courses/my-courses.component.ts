
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Course } from '../../models/course';
import { CoursesService } from '../../services/course.service';

@Component({
  selector: 'app-my-courses',
  templateUrl: './my-courses.component.html',
  styleUrls: ['./my-courses.component.css']
})
export class MyCoursesComponent implements OnInit {
  myCourses: Course[] = [];
  userId: string | null = null;

  constructor(private coursesService: CoursesService, private authService: AuthService) {}

  ngOnInit(): void {
    this.userId = this.authService.getUserId();
    if (this.userId) {
      this.fetchMyCourses();
    }
  }

  fetchMyCourses(): void {
    if (!this.userId) return;
    this.coursesService.getStudentCourses(this.userId).subscribe(
      (courses) => this.myCourses = courses,
      (error) => console.error('Error fetching courses:', error)
    );
  }

  leaveCourse(courseId: string): void {
    if (!this.userId) return;
    this.coursesService.leaveCourse(courseId, this.userId).subscribe(
      () => {
        this.myCourses = this.myCourses.filter(course => course.id.toString() !== courseId);
      },
      (error) => console.error('Error leaving course:', error)
    );
  }
}

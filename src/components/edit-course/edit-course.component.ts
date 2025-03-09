
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CoursesService } from '../../services/course.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2'


@Component({
  selector: 'app-edit-course',
  templateUrl: './edit-course.component.html',
  styleUrls: ['./edit-course.component.css'],
  imports: [ReactiveFormsModule, CommonModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatOptionModule, MatSelectModule, FormsModule]

})
export class EditCourseComponent implements OnInit {
  courseId!: string;
  course = {
    title: '',
    description: '',
    teacherId: ''
  };

  constructor(
    private route: ActivatedRoute,
    private coursesService: CoursesService,
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.courseId = this.route.snapshot.paramMap.get('id')!;
    this.loadCourse();
  }

  loadCourse() {
    this.coursesService.getCourseById(this.courseId).subscribe({
      next: (data) => {
        this.course = {
          title: data.title,
          description: data.description,
          teacherId: data.teacherId.toString()
        }


      }
    });

  }

  updateCourse() {
    const teacherId = this.authService.getUserId();
    if (teacherId) {
      this.course.teacherId = teacherId;

      this.coursesService.updateCourse(this.courseId, this.course).subscribe({
        next: () => {
          Swal.fire({
            title: "Course updated successfully!",
            icon: "success",
            draggable: true
          });

          this.router.navigate(['/courses']);
        },
        error: (err) => {
          alert('Error updating course');
          console.error(err);
        }
      });
    } else {
      alert('You are not authorized to update this course.');
    }
  }
}

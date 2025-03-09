
import { Component } from '@angular/core';
import { Router } from '@angular/router';
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
  selector: 'app-create-course',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.css']
  ,imports:[ReactiveFormsModule, CommonModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatOptionModule, MatSelectModule,FormsModule]
})
export class AddCourseComponent {
  course = {
    title: '',
    description: '',
    teacherId: ''
  };

  constructor(private coursesService: CoursesService, private router: Router,  private authService: AuthService 
  ) {}

  addCourse() {
    const teacherId =  this.authService.getUserId();
    console.log(teacherId);
    
    if (teacherId) {
      this.course.teacherId = teacherId;

      this.coursesService.createCourse(this.course).subscribe({
        next: (response) => {
          Swal.fire({
            title: "Course created successfully!",
            icon: "success",
            draggable: true
          });
          this.router.navigate(['/courses']);  
        },
        error: (error) => {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Error creating course!",
          });
          console.error(error);
        }
      });
    } else {
      alert('You are not logged in as a teacher.');
    }
  }
}

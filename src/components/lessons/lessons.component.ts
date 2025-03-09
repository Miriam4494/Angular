
import { Component, Input, OnInit } from '@angular/core';
import { LessonsService } from '../../services/lesson.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { AuthService } from '../../services/auth.service';
import { MatIconModule } from '@angular/material/icon';
import Swal from 'sweetalert2'


@Component({
  selector: 'app-lessons',
  templateUrl: './lessons.component.html',
  styleUrls: ['./lessons.component.css']
  , imports: [ReactiveFormsModule, MatIconModule, CommonModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatOptionModule, MatSelectModule, FormsModule]

})
export class LessonsComponent implements OnInit {
  @Input() courseId!: number;
  lessons: any[] = [];
  newLesson = { title: '', content: '' };
  showAddLessonForm: boolean = false;

  constructor(private lessonsService: LessonsService, private authService: AuthService) { }

  ngOnInit(): void {
    this.loadLessons();
  }

  loadLessons(): void {
    this.lessonsService.getLessons(this.courseId).subscribe({
      next: (data) => this.lessons = data,
    });
  }


  updateLesson(lesson: any): void {
    const updatedTitle = prompt('Enter new title', lesson.title);
    const updatedContent = prompt('Enter new content', lesson.content);

    if (!updatedTitle || !updatedContent) return;

    this.lessonsService.updateLesson(this.courseId, lesson.id, updatedTitle, updatedContent).subscribe({
      next: () => {
        Swal.fire({
          title: "Lesson updated successfully!",
          icon: "success",
          draggable: true
        });
        this.loadLessons();
      },
    });
  }

  deleteLesson(lessonId: number): void {


    this.lessonsService.deleteLesson(this.courseId, lessonId).subscribe({
      next: () => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "The lesson deleted!",
        });
        this.loadLessons();
      },
    });
  }
  isTeacher() {
    return this.authService.isTeacher();
  }

  toggleAddLessonForm() {
    this.showAddLessonForm = !this.showAddLessonForm;
  }

  addLesson() {
    if (!this.newLesson.title.trim() || !this.newLesson.content.trim()) return;

    this.lessonsService.addLesson(this.courseId, this.newLesson.title, this.newLesson.content).subscribe(() => {
      this.lessons.push({ ...this.newLesson });
      this.newLesson = { title: '', content: '' };
      this.toggleAddLessonForm();
      Swal.fire({
        title: "Lesson created successfully!",
        icon: "success",
        draggable: true
      });
    });
  }
}

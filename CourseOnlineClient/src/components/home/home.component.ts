import { Component } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { LoginComponent } from '../login/login.component';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthIconPipe } from '../../pipes/auth-icon.pipe';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MatDialogModule, MatFormFieldModule, FormsModule,RouterModule,CommonModule,AuthIconPipe,MatIconModule ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})

export class HomeComponent {
  user$: Observable<User | null>; 
  userId: string = ''; 
  user: User | null = null
  constructor(public authService: AuthService, private dialog: MatDialog) { this.user$ = this.authService.getUser(); 
      
  }


  logout() {
    this.authService.logout();
  }
  openLoginDialog(type: string) {
    this.dialog.open(LoginComponent, {
      width: '400px',
      data: { type }
    });
  }

  isTeacher() {
    return this.authService.isTeacher();}
    
}




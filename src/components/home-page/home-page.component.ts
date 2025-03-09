import { Component } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthIconPipe } from '../../pipes/auth-icon.pipe';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css',
  imports: [MatDialogModule, MatFormFieldModule, FormsModule,RouterModule,CommonModule,MatIconModule ],
  
})
export class HomePageComponent {

}

// import { Component } from '@angular/core';
// import { RouterOutlet } from '@angular/router';
// import { HomeComponent } from '../components/home/home.component';


// @Component({
//   selector: 'app-root',
//   imports: [RouterOutlet,HomeComponent],
//   templateUrl: './app.component.html',
//   styleUrl: './app.component.css'
// })
// export class AppComponent {
//   title = 'CourseOnlineClient';
// }

import { Component } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { LoginComponent } from '../components/login/login.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [MatDialogModule,CommonModule,RouterModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private dialog: MatDialog) {}

  openLoginDialog() {
    this.dialog.open(LoginComponent);
  }
  title = 'CourseOnlineClient';

}
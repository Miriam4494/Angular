

import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Role, userPartial } from '../../models/user';
import { AuthService } from '../../services/auth.service';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';


@Component({
  selector: 'app-login-dialog',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [ReactiveFormsModule, CommonModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatOptionModule, MatSelectModule]
})
export class LoginComponent {
  form: FormGroup;
  roles = Object.values(Role); 

  constructor(
    public dialogRef: MatDialogRef<LoginComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { type: string },
    private fb: FormBuilder,
    private authService: AuthService,


  ) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      name: this.data.type === 'register' ? ['', Validators.required] : null,
      role: this.data.type === 'register' ? ['', Validators.required] : null
    });

  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    if (this.form.valid) {
      const formValue = this.form.value;

      if (this.data.type === 'register') {
        const newUser: userPartial = {
          name: formValue.name,
          email: formValue.email,
          password: formValue.password,
          role: formValue.role
        };
        this.authService.postLoginOrRegister(this.data.type, newUser).subscribe({
          next: (response) => {
            console.log('Registration successful', response);
            sessionStorage.setItem('userToken', response.token);

            this.closeDialog();
          },
          error: (error) => {

            console.error('Registration failed', error);
            alert("The user is already logged in"),
              this.closeDialog();

          }
        });

      }
      else {
        this.authService.postLoginOrRegister(this.data.type, { email: formValue.email, password: formValue.password }).subscribe({
          next: (response) => {
            console.log('Login successful', response);
            sessionStorage.setItem('userToken', response.token);

            this.closeDialog();
          },
          error: (error) => {
            console.error('Login failed', error);
            alert("User does not exist, please register first");
            this.closeDialog();

          }
        });
      }
    }
  }
}


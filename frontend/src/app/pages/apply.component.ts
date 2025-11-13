import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators, FormGroup } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { ApplicationsService } from '../core/api/applications.service';

@Component({
  selector: 'app-apply',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatCardModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatSnackBarModule],
  templateUrl: './apply.component.html',
  styleUrl: './apply.component.scss'
})
export class ApplyComponent {
  form!: FormGroup;

  loading = false;

  constructor(private fb: FormBuilder, private api: ApplicationsService, private sb: MatSnackBar) {
    this.form = this.fb.group({
      internshipId: [null, [Validators.required]],
      fullName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required]],
      resumeUrl: [''],
      coverLetter: ['', [Validators.required]],
    });
  }

  submit() {
    if (this.form.invalid) { this.form.markAllAsTouched(); return; }
    this.loading = true;
    this.api.create(this.form.getRawValue() as any).subscribe({
      next: () => {
        this.sb.open('Application submitted!', 'OK', { duration: 2500 });
        this.form.reset();
        this.loading = false;
      },
      error: () => {
        this.sb.open('Failed to submit. Please try again.', 'Dismiss', { duration: 3000 });
        this.loading = false;
      }
    });
  }
}

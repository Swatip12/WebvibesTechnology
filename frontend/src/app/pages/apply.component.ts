import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators, FormGroup, AbstractControl, ValidationErrors } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSelectModule } from '@angular/material/select';
import { ApplicationsService } from '../core/api/applications.service';
import { InternshipsService, Internship } from '../core/api/internships.service';

@Component({
  selector: 'app-apply',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatCardModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatSnackBarModule, MatSelectModule],
  templateUrl: './apply.component.html',
  styleUrl: './apply.component.scss'
})
export class ApplyComponent implements OnInit {
  form!: FormGroup;
  internships: Internship[] = [];
  loading = false;

  constructor(
    private fb: FormBuilder, 
    private api: ApplicationsService, 
    private internshipsService: InternshipsService,
    private sb: MatSnackBar
  ) {
    this.form = this.fb.group({
      internshipId: [null, [Validators.required]],
      fullName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, this.phoneValidator]],
      resumeUrl: [''],
      coverLetter: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.internshipsService.listActive().subscribe({
      next: (internships) => {
        this.internships = internships;
      },
      error: () => {
        this.sb.open('Failed to load internships', 'Dismiss', { duration: 3000 });
      }
    });
  }

  phoneValidator(control: AbstractControl): ValidationErrors | null {
    if (!control.value) {
      return null;
    }
    const phoneRegex = /^[\d\s\-\+\(\)]+$/;
    const valid = phoneRegex.test(control.value) && control.value.replace(/\D/g, '').length >= 10;
    return valid ? null : { invalidPhone: true };
  }

  submit() {
    if (this.form.invalid) { 
      this.form.markAllAsTouched(); 
      return; 
    }
    this.loading = true;
    this.api.create(this.form.getRawValue() as any).subscribe({
      next: () => {
        this.sb.open('Application submitted successfully!', 'OK', { duration: 2500 });
        this.form.reset();
        Object.keys(this.form.controls).forEach(key => {
          this.form.controls[key].setErrors(null);
        });
        this.loading = false;
      },
      error: () => {
        this.sb.open('Failed to submit. Please try again.', 'Dismiss', { duration: 3000 });
        this.loading = false;
      }
    });
  }

  getErrorMessage(fieldName: string): string {
    const control = this.form.get(fieldName);
    if (!control || !control.errors || !control.touched) {
      return '';
    }

    if (control.errors['required']) {
      return 'This field is required';
    }
    if (control.errors['email']) {
      return 'Please enter a valid email address';
    }
    if (control.errors['invalidPhone']) {
      return 'Please enter a valid phone number (at least 10 digits)';
    }
    return '';
  }
}

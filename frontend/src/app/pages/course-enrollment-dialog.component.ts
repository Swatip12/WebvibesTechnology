import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatStepperModule } from '@angular/material/stepper';
import { Course } from '../core/api/courses.service';

@Component({
  selector: 'app-course-enrollment-dialog',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatStepperModule
  ],
  templateUrl: './course-enrollment-dialog.component.html',
  styleUrl: './course-enrollment-dialog.component.scss'
})
export class CourseEnrollmentDialogComponent implements OnInit {
  personalInfoForm!: FormGroup;
  educationForm!: FormGroup;
  
  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<CourseEnrollmentDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { course: Course }
  ) {}

  ngOnInit() {
    this.personalInfoForm = this.fb.group({
      fullName: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^[0-9+\-\s()]{10,15}$/)]],
      address: ['', Validators.required]
    });

    this.educationForm = this.fb.group({
      qualification: ['', Validators.required],
      institution: ['', Validators.required],
      experience: ['', Validators.required],
      motivation: ['', [Validators.required, Validators.minLength(50)]]
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    if (this.personalInfoForm.valid && this.educationForm.valid) {
      const enrollmentData = {
        ...this.personalInfoForm.value,
        ...this.educationForm.value,
        courseId: this.data.course.id,
        courseTitle: this.data.course.title
      };
      this.dialogRef.close(enrollmentData);
    }
  }
}

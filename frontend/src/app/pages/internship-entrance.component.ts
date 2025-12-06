import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-internship-entrance',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatIconModule,
    MatSnackBarModule
  ],
  templateUrl: './internship-entrance.component.html',
  styleUrls: ['./internship-entrance.component.scss']
})
export class InternshipEntranceComponent implements OnInit {
  entranceForm!: FormGroup;
  isSubmitting = false;

  areasOfInterest = [
    'Web Development',
    'Mobile Development',
    'UI/UX Design',
    'Data Science',
    'Machine Learning',
    'Cloud Computing',
    'DevOps',
    'Cybersecurity',
    'Digital Marketing',
    'Other'
  ];

  educationLevels = [
    'High School',
    'Undergraduate - 1st Year',
    'Undergraduate - 2nd Year',
    'Undergraduate - 3rd Year',
    'Undergraduate - 4th Year',
    'Graduate',
    'Postgraduate',
    'Other'
  ];

  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.entranceForm = this.fb.group({
      fullName: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
      education: ['', Validators.required],
      areaOfInterest: ['', Validators.required],
      coverLetter: ['', [Validators.maxLength(500)]]
    });
  }

  getErrorMessage(fieldName: string): string {
    const field = this.entranceForm.get(fieldName);
    
    if (field?.hasError('required')) {
      return 'This field is required';
    }
    
    if (field?.hasError('email')) {
      return 'Please enter a valid email address';
    }
    
    if (field?.hasError('minLength')) {
      return `Minimum ${field.errors?.['minLength'].requiredLength} characters required`;
    }
    
    if (field?.hasError('pattern')) {
      return 'Please enter a valid 10-digit phone number';
    }
    
    if (field?.hasError('maxLength')) {
      return `Maximum ${field.errors?.['maxLength'].requiredLength} characters allowed`;
    }
    
    return '';
  }

  onSubmit(): void {
    if (this.entranceForm.valid) {
      this.isSubmitting = true;
      
      // Simulate API call
      setTimeout(() => {
        console.log('Form submitted:', this.entranceForm.value);
        
        this.snackBar.open(
          'Application submitted successfully! We will contact you soon.',
          'Close',
          {
            duration: 5000,
            horizontalPosition: 'center',
            verticalPosition: 'top',
            panelClass: ['success-snackbar']
          }
        );
        
        this.entranceForm.reset();
        this.isSubmitting = false;
      }, 1500);
    } else {
      // Mark all fields as touched to show validation errors
      Object.keys(this.entranceForm.controls).forEach(key => {
        this.entranceForm.get(key)?.markAsTouched();
      });
      
      this.snackBar.open(
        'Please fill in all required fields correctly',
        'Close',
        {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: ['error-snackbar']
        }
      );
    }
  }
}

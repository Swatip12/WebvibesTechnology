import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators, FormGroup } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { ContactService } from '../core/api/contact.service';
import { LazyImageDirective } from '../core/directives/lazy-image.directive';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatCardModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatSnackBarModule, MatIconModule, LazyImageDirective],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent {
  form!: FormGroup;
  loading = false;
  submitSuccess = false;
  submitError = false;

  constructor(private fb: FormBuilder, private api: ContactService, private sb: MatSnackBar) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      subject: ['', Validators.required],
      message: ['', Validators.required],
    });
  }

  submit() {
    if (this.form.invalid) { 
      this.form.markAllAsTouched(); 
      return; 
    }
    
    this.loading = true;
    this.submitSuccess = false;
    this.submitError = false;
    
    this.api.create(this.form.getRawValue() as any).subscribe({
      next: () => { 
        this.loading = false;
        this.submitSuccess = true;
        this.sb.open('✓ Message sent successfully! We\'ll get back to you soon.', 'Close', { 
          duration: 4000,
          panelClass: ['success-snackbar'],
          horizontalPosition: 'center',
          verticalPosition: 'top'
        }); 
        this.form.reset();
        
        // Reset success state after animation
        setTimeout(() => {
          this.submitSuccess = false;
        }, 4000);
      },
      error: (err) => { 
        this.loading = false;
        this.submitError = true;
        this.sb.open('✗ Failed to send message. Please try again.', 'Dismiss', { 
          duration: 4000,
          panelClass: ['error-snackbar'],
          horizontalPosition: 'center',
          verticalPosition: 'top'
        });
        
        // Reset error state after animation
        setTimeout(() => {
          this.submitError = false;
        }, 4000);
      }
    });
  }
}

import { Component, OnInit, OnDestroy } from '@angular/core';
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
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [
    CommonModule, 
    ReactiveFormsModule, 
    MatCardModule, 
    MatFormFieldModule, 
    MatInputModule, 
    MatButtonModule, 
    MatSnackBarModule, 
    MatIconModule, 
    LazyImageDirective
  ],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent implements OnInit, OnDestroy {
  form!: FormGroup;
  loading = false;
  submitSuccess = false;
  submitError = false;
  private destroy$ = new Subject<void>();

  constructor(
    private fb: FormBuilder, 
    private api: ContactService, 
    private sb: MatSnackBar
  ) {
    this.initializeForm();
  }

  ngOnInit(): void {
    // Add entrance animations after component loads
    setTimeout(() => {
      this.addAnimationClasses();
    }, 100);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private initializeForm(): void {
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      subject: ['', [Validators.required, Validators.minLength(5)]],
      message: ['', [Validators.required, Validators.minLength(10)]],
    });
  }

  private addAnimationClasses(): void {
    const elements = document.querySelectorAll('.fade-in-up');
    elements.forEach((element, index) => {
      setTimeout(() => {
        element.classList.add('animate');
      }, index * 100);
    });
  }

  submit(): void {
    if (this.form.invalid) { 
      this.form.markAllAsTouched(); 
      this.showValidationErrors();
      return; 
    }
    
    this.loading = true;
    this.submitSuccess = false;
    this.submitError = false;
    
    // Add loading state visual feedback
    this.addLoadingEffects();
    
    this.api.create(this.form.getRawValue() as any)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => { 
          this.handleSubmitSuccess();
        },
        error: (err) => { 
          this.handleSubmitError(err);
        }
      });
  }

  private showValidationErrors(): void {
    const firstErrorField = Object.keys(this.form.controls).find(key => 
      this.form.get(key)?.invalid
    );
    
    if (firstErrorField) {
      const fieldElement = document.querySelector(`[formControlName="${firstErrorField}"]`);
      if (fieldElement) {
        fieldElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
        (fieldElement as HTMLElement).focus();
      }
    }

    this.sb.open('⚠️ Please fill in all required fields correctly', 'Dismiss', { 
      duration: 4000,
      panelClass: ['warning-snackbar'],
      horizontalPosition: 'center',
      verticalPosition: 'top'
    });
  }

  private addLoadingEffects(): void {
    const submitBtn = document.querySelector('.enhanced-btn');
    if (submitBtn) {
      submitBtn.classList.add('loading-state');
    }
  }

  private removeLoadingEffects(): void {
    const submitBtn = document.querySelector('.enhanced-btn');
    if (submitBtn) {
      submitBtn.classList.remove('loading-state');
    }
  }

  private handleSubmitSuccess(): void {
    this.loading = false;
    this.submitSuccess = true;
    this.removeLoadingEffects();
    
    // Enhanced success feedback
    this.sb.open('✅ Message sent successfully! We\'ll get back to you within 24 hours.', 'Close', { 
      duration: 6000,
      panelClass: ['success-snackbar'],
      horizontalPosition: 'center',
      verticalPosition: 'top'
    });
    
    // Reset form with animation
    setTimeout(() => {
      this.form.reset();
      this.form.markAsUntouched();
    }, 1000);
    
    // Reset success state after animation
    setTimeout(() => {
      this.submitSuccess = false;
    }, 6000);

    // Add celebration effect
    this.addCelebrationEffect();
  }

  private handleSubmitError(error: any): void {
    this.loading = false;
    this.submitError = true;
    this.removeLoadingEffects();
    
    console.error('Contact form submission error:', error);
    
    // Enhanced error feedback with more specific messages
    let errorMessage = '❌ Failed to send message. ';
    if (error.status === 0) {
      errorMessage += 'Please check your internet connection.';
    } else if (error.status >= 500) {
      errorMessage += 'Server error. Please try again later.';
    } else {
      errorMessage += 'Please try again or contact us directly.';
    }
    
    this.sb.open(errorMessage, 'Retry', { 
      duration: 8000,
      panelClass: ['error-snackbar'],
      horizontalPosition: 'center',
      verticalPosition: 'top'
    }).onAction().subscribe(() => {
      this.submit(); // Retry on snackbar action
    });
    
    // Reset error state after animation
    setTimeout(() => {
      this.submitError = false;
    }, 8000);
  }

  private addCelebrationEffect(): void {
    // Create temporary celebration particles
    const container = document.querySelector('.contact-form-card');
    if (!container) return;

    for (let i = 0; i < 10; i++) {
      const particle = document.createElement('div');
      particle.className = 'celebration-particle';
      particle.style.cssText = `
        position: absolute;
        width: 6px;
        height: 6px;
        background: linear-gradient(45deg, #667eea, #764ba2);
        border-radius: 50%;
        pointer-events: none;
        z-index: 1000;
        top: 50%;
        left: 50%;
        animation: celebrate-${i} 2s ease-out forwards;
      `;
      
      container.appendChild(particle);
      
      // Remove particle after animation
      setTimeout(() => {
        if (particle.parentNode) {
          particle.parentNode.removeChild(particle);
        }
      }, 2000);
    }

    // Add celebration keyframes dynamically
    if (!document.getElementById('celebration-styles')) {
      const style = document.createElement('style');
      style.id = 'celebration-styles';
      style.textContent = `
        @keyframes celebrate-0 { to { transform: translate(-100px, -100px) scale(0); opacity: 0; } }
        @keyframes celebrate-1 { to { transform: translate(100px, -100px) scale(0); opacity: 0; } }
        @keyframes celebrate-2 { to { transform: translate(-100px, 100px) scale(0); opacity: 0; } }
        @keyframes celebrate-3 { to { transform: translate(100px, 100px) scale(0); opacity: 0; } }
        @keyframes celebrate-4 { to { transform: translate(-150px, 0px) scale(0); opacity: 0; } }
        @keyframes celebrate-5 { to { transform: translate(150px, 0px) scale(0); opacity: 0; } }
        @keyframes celebrate-6 { to { transform: translate(0px, -150px) scale(0); opacity: 0; } }
        @keyframes celebrate-7 { to { transform: translate(0px, 150px) scale(0); opacity: 0; } }
        @keyframes celebrate-8 { to { transform: translate(-75px, -75px) scale(0); opacity: 0; } }
        @keyframes celebrate-9 { to { transform: translate(75px, 75px) scale(0); opacity: 0; } }
      `;
      document.head.appendChild(style);
    }
  }

  // Getter methods for template
  get nameError(): string {
    const control = this.form.get('name');
    if (control?.hasError('required')) return 'Name is required';
    if (control?.hasError('minlength')) return 'Name must be at least 2 characters';
    return '';
  }

  get emailError(): string {
    const control = this.form.get('email');
    if (control?.hasError('required')) return 'Email is required';
    if (control?.hasError('email')) return 'Please enter a valid email address';
    return '';
  }

  get subjectError(): string {
    const control = this.form.get('subject');
    if (control?.hasError('required')) return 'Subject is required';
    if (control?.hasError('minlength')) return 'Subject must be at least 5 characters';
    return '';
  }

  get messageError(): string {
    const control = this.form.get('message');
    if (control?.hasError('required')) return 'Message is required';
    if (control?.hasError('minlength')) return 'Message must be at least 10 characters';
    return '';
  }
}

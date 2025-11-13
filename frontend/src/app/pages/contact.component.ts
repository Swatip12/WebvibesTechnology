import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators, FormGroup } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { ContactService } from '../core/api/contact.service';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatCardModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatSnackBarModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent {
  form!: FormGroup;
  loading = false;

  constructor(private fb: FormBuilder, private api: ContactService, private sb: MatSnackBar) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      message: ['', Validators.required],
    });
  }

  submit() {
    if (this.form.invalid) { this.form.markAllAsTouched(); return; }
    this.loading = true;
    this.api.create(this.form.getRawValue() as any).subscribe({
      next: () => { this.sb.open('Message sent!', 'OK', { duration: 2500 }); this.form.reset(); this.loading = false; },
      error: () => { this.sb.open('Failed to send message', 'Dismiss', { duration: 3000 }); this.loading = false; }
    });
  }
}

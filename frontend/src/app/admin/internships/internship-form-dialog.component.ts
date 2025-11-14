import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { Internship } from '../../core/api/internships.service';

@Component({
  selector: 'app-internship-form-dialog',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCheckboxModule
  ],
  template: `
    <h2 mat-dialog-title>{{ data ? 'Edit Internship' : 'Create Internship' }}</h2>
    <mat-dialog-content>
      <form [formGroup]="form" class="internship-form">
        <mat-form-field appearance="outline">
          <mat-label>Title</mat-label>
          <input matInput formControlName="title" required>
          <mat-error *ngIf="form.get('title')?.hasError('required')">
            Title is required
          </mat-error>
        </mat-form-field>

        <mat-form-field appearance="outline">
          <mat-label>Department</mat-label>
          <input matInput formControlName="department" required>
          <mat-error *ngIf="form.get('department')?.hasError('required')">
            Department is required
          </mat-error>
        </mat-form-field>

        <mat-form-field appearance="outline">
          <mat-label>Location</mat-label>
          <input matInput formControlName="location" required>
          <mat-error *ngIf="form.get('location')?.hasError('required')">
            Location is required
          </mat-error>
        </mat-form-field>

        <mat-form-field appearance="outline">
          <mat-label>Duration (weeks)</mat-label>
          <input matInput type="number" formControlName="durationWeeks" required min="1">
          <mat-error *ngIf="form.get('durationWeeks')?.hasError('required')">
            Duration is required
          </mat-error>
          <mat-error *ngIf="form.get('durationWeeks')?.hasError('min')">
            Duration must be at least 1 week
          </mat-error>
        </mat-form-field>

        <mat-form-field appearance="outline">
          <mat-label>Description</mat-label>
          <textarea matInput formControlName="description" rows="5" required></textarea>
          <mat-error *ngIf="form.get('description')?.hasError('required')">
            Description is required
          </mat-error>
        </mat-form-field>

        <mat-checkbox formControlName="active">Active</mat-checkbox>
      </form>
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button (click)="onCancel()">Cancel</button>
      <button mat-raised-button color="primary" (click)="onSave()" [disabled]="form.invalid || saving">
        {{ saving ? 'Saving...' : 'Save' }}
      </button>
    </mat-dialog-actions>
  `,
  styles: [`
    .internship-form {
      display: flex;
      flex-direction: column;
      gap: 16px;
      min-width: 500px;
      padding: 20px 0;
    }

    mat-form-field {
      width: 100%;
    }

    mat-dialog-content {
      max-height: 70vh;
      overflow-y: auto;
    }
  `]
})
export class InternshipFormDialogComponent implements OnInit {
  form: FormGroup;
  saving = false;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<InternshipFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Internship | null
  ) {
    this.form = this.fb.group({
      title: ['', Validators.required],
      department: ['', Validators.required],
      location: ['', Validators.required],
      durationWeeks: [1, [Validators.required, Validators.min(1)]],
      description: ['', Validators.required],
      active: [true]
    });
  }

  ngOnInit(): void {
    if (this.data) {
      this.form.patchValue(this.data);
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    if (this.form.valid) {
      this.saving = true;
      this.dialogRef.close(this.form.value);
    }
  }
}

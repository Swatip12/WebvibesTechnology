import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { InternshipsService, Internship } from '../../core/api/internships.service';
import { SocketService } from '../../core/ws/socket.service';
import { InternshipFormDialogComponent } from './internship-form-dialog.component';
import { DeleteConfirmationDialogComponent } from './delete-confirmation-dialog.component';

@Component({
  selector: 'app-admin-internships',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    MatDialogModule,
    MatSnackBarModule
  ],
  templateUrl: './admin-internships.component.html',
  styleUrl: './admin-internships.component.scss'
})
export class AdminInternshipsComponent implements OnInit {
  internships: Internship[] = [];
  displayedColumns: string[] = ['title', 'department', 'location', 'durationWeeks', 'active', 'actions'];

  constructor(
    private api: InternshipsService,
    private socket: SocketService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadInternships();
    this.socket.onInternships().subscribe(() => {
      this.loadInternships();
    });
  }

  loadInternships(): void {
    this.api.list().subscribe({
      next: (data) => {
        this.internships = data;
      },
      error: (error) => {
        console.error('Failed to load internships:', error);
        this.snackBar.open('Failed to load internships', 'Dismiss', { duration: 3000 });
      }
    });
  }

  openCreateDialog(): void {
    const dialogRef = this.dialog.open(InternshipFormDialogComponent, {
      width: '600px',
      data: null
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.api.create(result).subscribe({
          next: () => {
            this.snackBar.open('Internship created successfully', 'Dismiss', { duration: 3000 });
            this.loadInternships();
          },
          error: (error) => {
            console.error('Failed to create internship:', error);
            this.snackBar.open('Failed to create internship', 'Dismiss', { duration: 3000 });
          }
        });
      }
    });
  }

  openEditDialog(internship: Internship): void {
    const dialogRef = this.dialog.open(InternshipFormDialogComponent, {
      width: '600px',
      data: internship
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result && internship.id) {
        this.api.update(internship.id, result).subscribe({
          next: () => {
            this.snackBar.open('Internship updated successfully', 'Dismiss', { duration: 3000 });
            this.loadInternships();
          },
          error: (error) => {
            console.error('Failed to update internship:', error);
            this.snackBar.open('Failed to update internship', 'Dismiss', { duration: 3000 });
          }
        });
      }
    });
  }

  deleteInternship(internship: Internship): void {
    const dialogRef = this.dialog.open(DeleteConfirmationDialogComponent, {
      width: '400px',
      data: { title: internship.title }
    });

    dialogRef.afterClosed().subscribe(confirmed => {
      if (confirmed && internship.id) {
        this.api.delete(internship.id).subscribe({
          next: () => {
            this.snackBar.open('Internship deleted successfully', 'Dismiss', { duration: 3000 });
            this.loadInternships();
          },
          error: (error) => {
            console.error('Failed to delete internship:', error);
            this.snackBar.open('Failed to delete internship', 'Dismiss', { duration: 3000 });
          }
        });
      }
    });
  }
}

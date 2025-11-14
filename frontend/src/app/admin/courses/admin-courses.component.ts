import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { CoursesService, Course } from '../../core/api/courses.service';
import { SocketService } from '../../core/ws/socket.service';
import { CourseFormDialogComponent } from './course-form-dialog.component';
import { DeleteConfirmationDialogComponent } from '../internships/delete-confirmation-dialog.component';

@Component({
  selector: 'app-admin-courses',
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
  templateUrl: './admin-courses.component.html',
  styleUrl: './admin-courses.component.scss'
})
export class AdminCoursesComponent implements OnInit {
  courses: Course[] = [];
  displayedColumns: string[] = ['title', 'instructor', 'category', 'duration', 'active', 'actions'];

  constructor(
    private api: CoursesService,
    private socket: SocketService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadCourses();
    this.socket.onCourses().subscribe(() => {
      this.loadCourses();
    });
  }

  loadCourses(): void {
    this.api.list().subscribe({
      next: (data) => {
        this.courses = data;
      },
      error: (error) => {
        console.error('Failed to load courses:', error);
        this.snackBar.open('Failed to load courses', 'Dismiss', { duration: 3000 });
      }
    });
  }

  openCreateDialog(): void {
    const dialogRef = this.dialog.open(CourseFormDialogComponent, {
      width: '600px',
      data: null
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.api.create(result).subscribe({
          next: () => {
            this.snackBar.open('Course created successfully', 'Dismiss', { duration: 3000 });
            this.loadCourses();
          },
          error: (error) => {
            console.error('Failed to create course:', error);
            this.snackBar.open('Failed to create course', 'Dismiss', { duration: 3000 });
          }
        });
      }
    });
  }

  openEditDialog(course: Course): void {
    const dialogRef = this.dialog.open(CourseFormDialogComponent, {
      width: '600px',
      data: course
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result && course.id) {
        this.api.update(course.id, result).subscribe({
          next: () => {
            this.snackBar.open('Course updated successfully', 'Dismiss', { duration: 3000 });
            this.loadCourses();
          },
          error: (error) => {
            console.error('Failed to update course:', error);
            this.snackBar.open('Failed to update course', 'Dismiss', { duration: 3000 });
          }
        });
      }
    });
  }

  deleteCourse(course: Course): void {
    const dialogRef = this.dialog.open(DeleteConfirmationDialogComponent, {
      width: '400px',
      data: { title: course.title }
    });

    dialogRef.afterClosed().subscribe(confirmed => {
      if (confirmed && course.id) {
        this.api.delete(course.id).subscribe({
          next: () => {
            this.snackBar.open('Course deleted successfully', 'Dismiss', { duration: 3000 });
            this.loadCourses();
          },
          error: (error) => {
            console.error('Failed to delete course:', error);
            this.snackBar.open('Failed to delete course', 'Dismiss', { duration: 3000 });
          }
        });
      }
    });
  }
}

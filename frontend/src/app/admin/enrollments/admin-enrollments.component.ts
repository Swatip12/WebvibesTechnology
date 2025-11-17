import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { CourseEnrollmentsService, CourseEnrollment } from '../../core/api/course-enrollments.service';

@Component({
  selector: 'app-admin-enrollments',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    MatCardModule,
    MatChipsModule
  ],
  templateUrl: './admin-enrollments.component.html',
  styleUrl: './admin-enrollments.component.scss'
})
export class AdminEnrollmentsComponent implements OnInit {
  enrollments: CourseEnrollment[] = [];
  displayedColumns: string[] = ['id', 'course', 'fullName', 'email', 'phone', 'qualification', 'enrolledAt', 'actions'];

  constructor(private api: CourseEnrollmentsService) {}

  ngOnInit() {
    this.loadEnrollments();
  }

  loadEnrollments() {
    this.api.list().subscribe({
      next: (data) => {
        this.enrollments = data;
      },
      error: (err) => {
        console.error('Failed to load enrollments:', err);
      }
    });
  }

  viewDetails(enrollment: CourseEnrollment) {
    const details = `
      Name: ${enrollment.fullName}
      Email: ${enrollment.email}
      Phone: ${enrollment.phone}
      Address: ${enrollment.address}
      
      Qualification: ${enrollment.qualification}
      Institution: ${enrollment.institution}
      Experience: ${enrollment.experience}
      
      Motivation:
      ${enrollment.motivation}
    `;
    alert(details);
  }

  deleteEnrollment(id: number | undefined) {
    if (!id) return;
    
    if (confirm('Are you sure you want to delete this enrollment?')) {
      this.api.delete(id).subscribe({
        next: () => {
          this.loadEnrollments();
        },
        error: (err) => {
          console.error('Failed to delete enrollment:', err);
          alert('Failed to delete enrollment');
        }
      });
    }
  }
}

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { FormsModule } from '@angular/forms';
import { ApplicationsService, ApplicationPayload } from '../../core/api/applications.service';
import { InternshipsService, Internship } from '../../core/api/internships.service';
import { SocketService } from '../../core/ws/socket.service';

@Component({
  selector: 'app-admin-applications',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    MatSelectModule,
    MatFormFieldModule,
    MatSnackBarModule,
    FormsModule
  ],
  templateUrl: './admin-applications.component.html',
  styleUrl: './admin-applications.component.scss'
})
export class AdminApplicationsComponent implements OnInit {
  applications: ApplicationPayload[] = [];
  filteredApplications: ApplicationPayload[] = [];
  internships: Internship[] = [];
  selectedInternshipId: number | null = null;
  displayedColumns: string[] = ['fullName', 'email', 'phone', 'internship', 'resumeUrl', 'coverLetter', 'appliedAt'];

  constructor(
    private applicationsService: ApplicationsService,
    private internshipsService: InternshipsService,
    private socket: SocketService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadInternships();
    this.loadApplications();
    this.subscribeToApplicationUpdates();
  }

  loadInternships(): void {
    this.internshipsService.list().subscribe({
      next: (data) => {
        this.internships = data;
      },
      error: (error) => {
        console.error('Failed to load internships:', error);
        this.snackBar.open('Failed to load internships', 'Dismiss', { duration: 3000 });
      }
    });
  }

  loadApplications(): void {
    this.applicationsService.list().subscribe({
      next: (data) => {
        this.applications = data;
        this.applyFilter();
      },
      error: (error) => {
        console.error('Failed to load applications:', error);
        this.snackBar.open('Failed to load applications', 'Dismiss', { duration: 3000 });
      }
    });
  }

  subscribeToApplicationUpdates(): void {
    this.socket.onApplications().subscribe(() => {
      this.loadApplications();
    });
  }

  applyFilter(): void {
    if (this.selectedInternshipId) {
      this.filteredApplications = this.applications.filter(
        app => app.internshipId === this.selectedInternshipId
      );
    } else {
      this.filteredApplications = [...this.applications];
    }
  }

  onFilterChange(): void {
    this.applyFilter();
  }

  getInternshipTitle(internshipId: number): string {
    const internship = this.internships.find(i => i.id === internshipId);
    return internship ? internship.title : `ID: ${internshipId}`;
  }

  getCoverLetterExcerpt(coverLetter: string): string {
    if (!coverLetter) return '';
    return coverLetter.length > 100 ? coverLetter.substring(0, 100) + '...' : coverLetter;
  }

  exportToCSV(): void {
    if (this.filteredApplications.length === 0) {
      this.snackBar.open('No applications to export', 'Dismiss', { duration: 3000 });
      return;
    }

    const headers = ['Full Name', 'Email', 'Phone', 'Internship', 'Resume URL', 'Cover Letter', 'Applied At'];
    const csvRows = [headers.join(',')];

    this.filteredApplications.forEach(app => {
      const row = [
        this.escapeCSV(app.fullName),
        this.escapeCSV(app.email),
        this.escapeCSV(app.phone),
        this.escapeCSV(this.getInternshipTitle(app.internshipId)),
        this.escapeCSV(app.resumeUrl || ''),
        this.escapeCSV(app.coverLetter),
        this.escapeCSV(app.appliedAt || '')
      ];
      csvRows.push(row.join(','));
    });

    const csvContent = csvRows.join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    
    link.setAttribute('href', url);
    link.setAttribute('download', `applications_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    this.snackBar.open('Applications exported successfully', 'Dismiss', { duration: 3000 });
  }

  private escapeCSV(value: string): string {
    if (!value) return '';
    const stringValue = String(value);
    if (stringValue.includes(',') || stringValue.includes('"') || stringValue.includes('\n')) {
      return `"${stringValue.replace(/"/g, '""')}"`;
    }
    return stringValue;
  }
}

import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CoursesService, Course } from '../core/api/courses.service';
import { CourseEnrollmentsService } from '../core/api/course-enrollments.service';
import { SocketService } from '../core/ws/socket.service';
import { CourseEnrollmentDialogComponent } from './course-enrollment-dialog.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-courses',
  standalone: true,
  imports: [
    CommonModule, 
    MatCardModule, 
    MatButtonModule, 
    MatIconModule,
    MatChipsModule,
    MatSelectModule,
    MatFormFieldModule,
    MatDialogModule,
    MatTooltipModule,
    RouterModule,
    FormsModule
  ],
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.scss'
})
export class CoursesComponent implements OnInit, OnDestroy {
  data: Course[] = [];
  filteredData: Course[] = [];
  isLoading: boolean = true;
  selectedDuration: string = 'all';
  selectedCategory: string = 'all';
  private wsSubscription?: Subscription;

  durationOptions = [
    { value: 'all', label: 'All Durations' },
    { value: '4 weeks', label: '4 weeks' },
    { value: '6 weeks', label: '6 weeks' },
    { value: '8 weeks', label: '8 weeks' },
    { value: '12 weeks', label: '12 weeks' }
  ];

  categoryOptions = [
    { value: 'all', label: 'All Categories' },
    { value: 'Programming', label: 'Programming' },
    { value: 'Design', label: 'Design' },
    { value: 'Business', label: 'Business' },
    { value: 'Data Science', label: 'Data Science' },
    { value: 'Marketing', label: 'Marketing' }
  ];

  constructor(
    private api: CoursesService,
    private enrollmentApi: CourseEnrollmentsService,
    private socket: SocketService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.load();
    this.setupWebSocket();
  }

  ngOnDestroy() {
    if (this.wsSubscription) {
      this.wsSubscription.unsubscribe();
    }
  }

  load() {
    this.isLoading = true;
    this.api.listActive().subscribe({
      next: (d) => {
        this.data = d;
        this.applyFilters();
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Failed to load courses:', error);
        this.data = [];
        this.filteredData = [];
        this.isLoading = false;
      }
    });
  }

  setupWebSocket() {
    this.wsSubscription = this.socket.onCourses().subscribe((data) => {
      console.log('WebSocket update received for courses:', data);
      this.load();
    });
  }

  applyFilters() {
    this.filteredData = this.data.filter(course => {
      const durationMatch = this.selectedDuration === 'all' || course.duration === this.selectedDuration;
      const categoryMatch = this.selectedCategory === 'all' || course.category === this.selectedCategory;
      return durationMatch && categoryMatch;
    });
  }

  onFilterChange() {
    this.applyFilters();
  }

  enrollCourse(course: Course) {
    const dialogRef = this.dialog.open(CourseEnrollmentDialogComponent, {
      width: '700px',
      maxWidth: '95vw',
      data: { course },
      panelClass: 'enrollment-dialog-container'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result && course.id) {
        this.enrollmentApi.create(result, course.id).subscribe({
          next: () => {
            alert(`Thank you for enrolling in "${course.title}"! We will contact you soon with further details.`);
          },
          error: (err) => {
            console.error('Failed to submit enrollment:', err);
            alert('Failed to submit enrollment. Please try again.');
          }
        });
      }
    });
  }

  getCategoryIcon(category: string | undefined): string {
    if (!category) return 'category';
    const icons: { [key: string]: string } = {
      'Programming': 'code',
      'Design': 'palette',
      'Business': 'business_center',
      'Data Science': 'analytics',
      'Marketing': 'campaign'
    };
    return icons[category] || 'category';
  }
}

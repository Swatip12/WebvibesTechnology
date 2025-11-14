import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { InternshipsService } from '../core/api/internships.service';
import { CoursesService } from '../core/api/courses.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, MatCardModule, MatButtonModule, MatIconModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  activeInternshipsCount = 0;
  activeCoursesCount = 0;

  constructor(
    private internshipsService: InternshipsService,
    private coursesService: CoursesService
  ) {}

  ngOnInit(): void {
    this.loadStatistics();
  }

  private loadStatistics(): void {
    this.internshipsService.listActive().subscribe({
      next: (internships) => {
        this.activeInternshipsCount = internships.length;
      },
      error: (err) => console.error('Error loading internships:', err)
    });

    this.coursesService.listActive().subscribe({
      next: (courses) => {
        this.activeCoursesCount = courses.length;
      },
      error: (err) => console.error('Error loading courses:', err)
    });
  }
}

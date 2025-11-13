import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { CoursesService, Course } from '../core/api/courses.service';

@Component({
  selector: 'app-courses',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatTableModule, MatButtonModule],
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.scss'
})
export class CoursesComponent {
  displayedColumns = ['title', 'instructor', 'duration', 'active'];
  data: Course[] = [];

  constructor(private api: CoursesService) {
    this.load();
  }

  load() {
    this.api.listActive().subscribe((d) => (this.data = d));
  }
}

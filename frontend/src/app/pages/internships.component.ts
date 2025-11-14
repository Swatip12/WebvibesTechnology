import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatExpansionModule } from '@angular/material/expansion';
import { InternshipsService, Internship } from '../core/api/internships.service';
import { SocketService } from '../core/ws/socket.service';

@Component({
  selector: 'app-internships',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatExpansionModule
  ],
  templateUrl: './internships.component.html',
  styleUrl: './internships.component.scss'
})
export class InternshipsComponent {
  data: Internship[] = [];
  filteredData: Internship[] = [];

  // Filter properties
  searchKeyword: string = '';
  selectedDepartment: string = '';
  selectedLocation: string = '';

  // Unique values for filters
  departments: string[] = [];
  locations: string[] = [];

  constructor(private api: InternshipsService, private socket: SocketService) {
    this.load();
    this.socket.onInternships().subscribe((data) => {
      console.log('WebSocket update received for internships:', data);
      this.load();
    });
  }

  load() {
    this.api.listActive().subscribe({
      next: (list) => {
        this.data = list;
        this.extractFilterOptions();
        this.applyFilters();
      },
      error: (error) => {
        console.error('Failed to load internships:', error);
        // Set empty data so the page still renders
        this.data = [];
        this.filteredData = [];
        this.departments = [];
        this.locations = [];
      }
    });
  }

  extractFilterOptions() {
    // Extract unique departments and locations
    this.departments = [...new Set(this.data.map(i => i.department))].sort();
    this.locations = [...new Set(this.data.map(i => i.location))].sort();
  }

  applyFilters() {
    this.filteredData = this.data.filter(internship => {
      // Search filter
      const matchesSearch = !this.searchKeyword ||
        internship.title.toLowerCase().includes(this.searchKeyword.toLowerCase()) ||
        internship.department.toLowerCase().includes(this.searchKeyword.toLowerCase()) ||
        internship.description.toLowerCase().includes(this.searchKeyword.toLowerCase());

      // Department filter
      const matchesDepartment = !this.selectedDepartment ||
        internship.department === this.selectedDepartment;

      // Location filter
      const matchesLocation = !this.selectedLocation ||
        internship.location === this.selectedLocation;

      return matchesSearch && matchesDepartment && matchesLocation;
    });
  }

  clearFilters() {
    this.searchKeyword = '';
    this.selectedDepartment = '';
    this.selectedLocation = '';
    this.applyFilters();
  }
}

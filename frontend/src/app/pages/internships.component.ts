import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { InternshipsService, Internship } from '../core/api/internships.service';
import { SocketService } from '../core/ws/socket.service';

@Component({
  selector: 'app-internships',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatCardModule, MatButtonModule, MatIconModule],
  templateUrl: './internships.component.html',
  styleUrl: './internships.component.scss'
})
export class InternshipsComponent {
  displayedColumns = ['title', 'department', 'location', 'durationWeeks', 'active'];
  data: Internship[] = [];

  constructor(private api: InternshipsService, private socket: SocketService) {
    this.load();
    this.socket.onInternships().subscribe(() => this.load());
  }

  load() {
    this.api.listActive().subscribe((list) => (this.data = list));
  }
}

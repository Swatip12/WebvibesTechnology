import { Component, OnInit, AfterViewInit, ElementRef } from '@angular/core';
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
export class HomeComponent implements OnInit, AfterViewInit {
  activeInternshipsCount = 0;
  activeCoursesCount = 0;

  constructor(
    private internshipsService: InternshipsService,
    private coursesService: CoursesService,
    private elementRef: ElementRef
  ) {}

  ngOnInit(): void {
    this.loadStatistics();
  }

  ngAfterViewInit(): void {
    this.setupScrollAnimations();
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

  private setupScrollAnimations(): void {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    // Observe feature cards
    const featureCards = this.elementRef.nativeElement.querySelectorAll('.feature-card-glass');
    featureCards.forEach((card: Element) => observer.observe(card));

    // Observe process cards
    const processCards = this.elementRef.nativeElement.querySelectorAll('.process-card');
    processCards.forEach((card: Element) => observer.observe(card));

    // Observe testimonial cards
    const testimonialCards = this.elementRef.nativeElement.querySelectorAll('.testimonial-card');
    testimonialCards.forEach((card: Element) => observer.observe(card));
  }
}

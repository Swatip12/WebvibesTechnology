import { Component, OnInit, AfterViewInit, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { InternshipsService } from '../core/api/internships.service';
import { CoursesService } from '../core/api/courses.service';
import { LazyImageDirective } from '../core/directives/lazy-image.directive';
import { optimizeAnimations } from '../core/utils/performance.utils';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, MatCardModule, MatButtonModule, MatIconModule, LazyImageDirective],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit, AfterViewInit {
  activeInternshipsCount = 0;
  activeCoursesCount = 0;
  displayedInternshipsCount = 0;
  displayedCoursesCount = 0;
  displayedStudentsCount = 0;

  constructor(
    private internshipsService: InternshipsService,
    private coursesService: CoursesService,
    private elementRef: ElementRef
  ) {}

  ngOnInit(): void {
    this.loadStatistics();
    // Optimize animations based on device performance
    optimizeAnimations();
  }

  ngAfterViewInit(): void {
    this.setupScrollAnimations();
    this.setupStatCounterAnimations();
  }

  private loadStatistics(): void {
    this.internshipsService.listActive().subscribe({
      next: (internships) => {
        this.activeInternshipsCount = internships.length;
        this.animateCounter('internships', this.activeInternshipsCount);
      },
      error: (err) => console.error('Error loading internships:', err)
    });

    this.coursesService.listActive().subscribe({
      next: (courses) => {
        this.activeCoursesCount = courses.length;
        this.animateCounter('courses', this.activeCoursesCount);
      },
      error: (err) => console.error('Error loading courses:', err)
    });
  }

  private setupStatCounterAnimations(): void {
    const observerOptions = {
      threshold: 0.5,
      rootMargin: '0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Animate students count when stats section is visible
          this.animateCounter('students', 5000);
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    const statsSection = this.elementRef.nativeElement.querySelector('.stats-glow-section');
    if (statsSection) {
      observer.observe(statsSection);
    }
  }

  private animateCounter(type: 'internships' | 'courses' | 'students', targetValue: number): void {
    const duration = 2000; // 2 seconds
    const steps = 60;
    const increment = targetValue / steps;
    const stepDuration = duration / steps;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      const currentValue = Math.min(Math.floor(increment * currentStep), targetValue);
      
      switch(type) {
        case 'internships':
          this.displayedInternshipsCount = currentValue;
          break;
        case 'courses':
          this.displayedCoursesCount = currentValue;
          break;
        case 'students':
          this.displayedStudentsCount = currentValue;
          break;
      }

      if (currentStep >= steps) {
        clearInterval(timer);
      }
    }, stepDuration);
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
          
          // Remove will-change after animation completes for better performance
          const element = entry.target as HTMLElement;
          element.addEventListener('animationend', () => {
            element.style.willChange = 'auto';
          }, { once: true });
          
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

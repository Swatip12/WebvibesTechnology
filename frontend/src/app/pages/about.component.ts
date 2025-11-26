import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { LazyImageDirective } from '../core/directives/lazy-image.directive';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule, MatButtonModule, LazyImageDirective],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss'
})
export class AboutComponent implements OnInit, AfterViewInit, OnDestroy {
  private observer?: IntersectionObserver;

  milestones = [
    {
      year: '2014',
      icon: 'rocket_launch',
      title: 'Company Founded',
      description: 'WebVibes Technology was established with a vision to revolutionize tech education and bridge the industry-academia gap'
    },
    {
      year: '2016',
      icon: 'school',
      title: 'First Training Program',
      description: 'Launched our flagship internship program, training the first batch of 50 aspiring developers'
    },
    {
      year: '2018',
      icon: 'workspace_premium',
      title: 'Industry Recognition',
      description: 'Received "Best EdTech Startup" award and expanded to multiple technology domains'
    },
    {
      year: '2020',
      icon: 'public',
      title: 'Global Expansion',
      description: 'Went fully remote and opened opportunities to students worldwide, reaching 1000+ interns'
    },
    {
      year: '2022',
      icon: 'auto_awesome',
      title: 'Innovation Hub',
      description: 'Established our innovation lab and launched advanced AI/ML and cloud computing programs'
    },
    {
      year: '2024',
      icon: 'celebration',
      title: 'Decade of Excellence',
      description: 'Celebrating 10 years of empowering 5000+ students and maintaining 95% placement success rate'
    }
  ];

  achievements = [
    {
      icon: 'groups',
      number: '500+',
      title: 'Interns Trained',
      description: 'Successfully mentored and trained over 500 interns'
    },
    {
      icon: 'school',
      number: '50+',
      title: 'Courses Offered',
      description: 'Comprehensive skill-building programs across technologies'
    },
    {
      icon: 'business',
      number: '10+',
      title: 'Years of Excellence',
      description: 'A decade of innovation and growth in technology'
    },
    {
      icon: 'emoji_events',
      number: '25+',
      title: 'Industry Awards',
      description: 'Recognized for excellence in technology and innovation'
    }
  ];

  teamValues = [
    {
      icon: 'lightbulb',
      title: 'Innovation',
      description: 'We foster creativity and encourage new ideas to solve complex problems',
      image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=600&q=80'
    },
    {
      icon: 'diversity_3',
      title: 'Collaboration',
      description: 'We believe in the power of teamwork and diverse perspectives',
      image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&q=80'
    },
    {
      icon: 'trending_up',
      title: 'Growth',
      description: 'We invest in continuous learning and professional development',
      image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&q=80'
    },
    {
      icon: 'verified',
      title: 'Excellence',
      description: 'We maintain the highest standards in everything we do',
      image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&q=80'
    }
  ];

  socialLinks = [
    { icon: 'facebook', url: 'https://facebook.com/webvibes', label: 'Facebook' },
    { icon: 'twitter', url: 'https://twitter.com/webvibes', label: 'Twitter' },
    { icon: 'linkedin', url: 'https://linkedin.com/company/webvibes', label: 'LinkedIn' },
    { icon: 'instagram', url: 'https://instagram.com/webvibes', label: 'Instagram' }
  ];

  contactInfo = {
    email: 'webvibestechnology@gmail.com',
    phone: '+91 7447839781',
    address: 'Bharatkunj-2, Kothrud, Pune, Maharashtra 411052'
  };

  ngOnInit(): void {
    // Component initialization
  }

  ngAfterViewInit(): void {
    this.setupScrollAnimations();
  }

  ngOnDestroy(): void {
    if (this.observer) {
      this.observer.disconnect();
    }
  }

  private setupScrollAnimations(): void {
    const options = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const delay = entry.target.getAttribute('data-delay') || '0';
          setTimeout(() => {
            entry.target.classList.add('visible');
          }, parseInt(delay));
          this.observer?.unobserve(entry.target);
        }
      });
    }, options);

    // Observe all elements with animate-on-scroll class
    const elements = document.querySelectorAll('.animate-on-scroll');
    elements.forEach(el => this.observer?.observe(el));
  }
}

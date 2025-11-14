import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule, MatButtonModule],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss'
})
export class AboutComponent {
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
      description: 'We foster creativity and encourage new ideas to solve complex problems'
    },
    {
      icon: 'diversity_3',
      title: 'Collaboration',
      description: 'We believe in the power of teamwork and diverse perspectives'
    },
    {
      icon: 'trending_up',
      title: 'Growth',
      description: 'We invest in continuous learning and professional development'
    },
    {
      icon: 'verified',
      title: 'Excellence',
      description: 'We maintain the highest standards in everything we do'
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
}

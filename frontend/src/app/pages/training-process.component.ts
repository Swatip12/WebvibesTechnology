import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { LazyImageDirective } from '../core/directives/lazy-image.directive';

@Component({
  selector: 'app-training-process',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule, MatButtonModule, RouterModule, LazyImageDirective],
  templateUrl: './training-process.component.html',
  styleUrl: './training-process.component.scss'
})
export class TrainingProcessComponent {
  trainingSteps = [
    {
      number: '01',
      icon: 'app_registration',
      title: 'Registration',
      description: 'Begin your journey by registering on our platform. Create your profile, upload your resume, and tell us about your interests and career goals.',
      duration: 'Day 1',
      highlights: ['Create account', 'Complete profile', 'Upload documents', 'Set preferences'],
      image: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=600&h=400&q=80&fit=crop&auto=format'
    },
    {
      number: '02',
      icon: 'assignment',
      title: 'Aptitude Test',
      description: 'Take our comprehensive aptitude test to assess your logical reasoning, problem-solving abilities, and technical knowledge. This helps us understand your current skill level.',
      duration: 'Day 2-3',
      highlights: ['Logical reasoning', 'Quantitative aptitude', 'Technical basics', 'Problem solving'],
      image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=600&h=400&q=80&fit=crop&auto=format'
    },
    {
      number: '03',
      icon: 'code',
      title: 'Technical Assessment',
      description: 'Demonstrate your coding skills through practical programming challenges. Solve real-world problems and showcase your technical expertise.',
      duration: 'Day 4-5',
      highlights: ['Coding challenges', 'Algorithm problems', 'Data structures', 'Code quality'],
      image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600&h=400&q=80&fit=crop&auto=format'
    },
    {
      number: '04',
      icon: 'groups',
      title: 'Group Discussion',
      description: 'Participate in group discussions on current technology trends and industry topics. Showcase your communication skills, teamwork, and thought leadership.',
      duration: 'Day 6',
      highlights: ['Team collaboration', 'Communication skills', 'Critical thinking', 'Leadership'],
      image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&h=400&q=80&fit=crop&auto=format'
    },
    {
      number: '05',
      icon: 'record_voice_over',
      title: 'Technical Interview',
      description: 'Face-to-face technical interview with our experts. Deep dive into your technical knowledge, project experience, and problem-solving approach.',
      duration: 'Day 7-8',
      highlights: ['Technical concepts', 'Project discussion', 'System design', 'Best practices'],
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&h=400&q=80&fit=crop&auto=format'
    },
    {
      number: '06',
      icon: 'psychology',
      title: 'HR Interview',
      description: 'Final round with HR to discuss your career aspirations, cultural fit, and expectations. We ensure mutual alignment for a successful journey.',
      duration: 'Day 9',
      highlights: ['Career goals', 'Cultural fit', 'Expectations', 'Compensation'],
      image: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?w=600&h=400&q=80&fit=crop&auto=format'
    },
    {
      number: '07',
      icon: 'task_alt',
      title: 'Selection & Offer',
      description: 'Receive your offer letter with program details, stipend information, and joining formalities. Welcome to the WebVibes family!',
      duration: 'Day 10-12',
      highlights: ['Offer letter', 'Program details', 'Documentation', 'Joining date'],
      image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=600&h=400&q=80&fit=crop&auto=format'
    },
    {
      number: '08',
      icon: 'celebration',
      title: 'Onboarding',
      description: 'Complete orientation, meet your team and mentor, get access to learning resources, and set up your development environment.',
      duration: 'Week 2',
      highlights: ['Orientation session', 'Team introduction', 'Tool setup', 'Resource access'],
      image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=400&q=80&fit=crop&auto=format'
    },
    {
      number: '09',
      icon: 'menu_book',
      title: 'Foundation Training',
      description: 'Build strong fundamentals through structured learning modules. Cover core concepts, best practices, and industry standards.',
      duration: 'Week 3-4',
      highlights: ['Core concepts', 'Best practices', 'Industry standards', 'Hands-on labs'],
      image: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=600&h=400&q=80&fit=crop&auto=format'
    },
    {
      number: '10',
      icon: 'construction',
      title: 'Project Work',
      description: 'Apply your learning to real-world projects. Work on live applications, contribute to codebases, and build production-ready features.',
      duration: 'Week 5-10',
      highlights: ['Real projects', 'Code reviews', 'Agile methodology', 'Version control'],
      image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=600&h=400&q=80&fit=crop&auto=format'
    },
    {
      number: '11',
      icon: 'quiz',
      title: 'Evaluation & Feedback',
      description: 'Regular assessments and feedback sessions to track your progress. Identify strengths and areas for improvement with personalized guidance.',
      duration: 'Week 11',
      highlights: ['Performance review', 'Skill assessment', 'Feedback session', 'Growth plan'],
      image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&h=400&q=80&fit=crop&auto=format'
    },
    {
      number: '12',
      icon: 'workspace_premium',
      title: 'Certification & Placement',
      description: 'Complete your final project presentation, receive industry-recognized certification, and get placement assistance to launch your career.',
      duration: 'Week 12',
      highlights: ['Final presentation', 'Certificate', 'Placement support', 'Alumni network'],
      image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=600&h=400&q=80&fit=crop&auto=format'
    }
  ];

  benefits = [
    {
      icon: 'verified',
      title: 'Industry-Recognized Certification',
      description: 'Earn certificates valued by top companies'
    },
    {
      icon: 'groups',
      title: 'Expert Mentorship',
      description: 'Learn from experienced professionals'
    },
    {
      icon: 'code',
      title: 'Real-World Projects',
      description: 'Build portfolio-worthy applications'
    },
    {
      icon: 'work',
      title: 'Placement Assistance',
      description: 'Get help landing your dream job'
    }
  ];
}

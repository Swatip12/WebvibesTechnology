import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CoursesComponent } from './courses.component';
import { CoursesService, Course } from '../core/api/courses.service';
import { CourseEnrollmentsService } from '../core/api/course-enrollments.service';
import { SocketService } from '../core/ws/socket.service';
import { MatDialog } from '@angular/material/dialog';
import { of } from 'rxjs';

describe('CoursesComponent', () => {
  let component: CoursesComponent;
  let fixture: ComponentFixture<CoursesComponent>;
  let coursesService: jasmine.SpyObj<CoursesService>;
  let socketService: jasmine.SpyObj<SocketService>;

  const mockCourses: Course[] = [
    {
      id: 1,
      title: 'Web Development Bootcamp',
      description: 'Learn full-stack web development',
      instructor: 'John Doe',
      duration: '12 weeks',
      category: 'Programming',
      active: true
    },
    {
      id: 2,
      title: 'UI/UX Design Fundamentals',
      description: 'Master design principles',
      instructor: 'Jane Smith',
      duration: '8 weeks',
      category: 'Design',
      active: true
    },
    {
      id: 3,
      title: 'Data Science with Python',
      description: 'Analyze data with Python',
      instructor: 'Bob Johnson',
      duration: '12 weeks',
      category: 'Data Science',
      active: true
    }
  ];

  beforeEach(async () => {
    const coursesServiceSpy = jasmine.createSpyObj('CoursesService', ['listActive']);
    const socketServiceSpy = jasmine.createSpyObj('SocketService', ['onCourses']);
    const enrollmentServiceSpy = jasmine.createSpyObj('CourseEnrollmentsService', ['create']);
    const dialogSpy = jasmine.createSpyObj('MatDialog', ['open']);

    coursesServiceSpy.listActive.and.returnValue(of(mockCourses));
    socketServiceSpy.onCourses.and.returnValue(of({}));

    await TestBed.configureTestingModule({
      imports: [
        CoursesComponent,
        HttpClientTestingModule,
        BrowserAnimationsModule
      ],
      providers: [
        { provide: CoursesService, useValue: coursesServiceSpy },
        { provide: SocketService, useValue: socketServiceSpy },
        { provide: CourseEnrollmentsService, useValue: enrollmentServiceSpy },
        { provide: MatDialog, useValue: dialogSpy }
      ]
    })
    .compileComponents();

    coursesService = TestBed.inject(CoursesService) as jasmine.SpyObj<CoursesService>;
    socketService = TestBed.inject(SocketService) as jasmine.SpyObj<SocketService>;

    fixture = TestBed.createComponent(CoursesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // Requirement 5.1: Modern card layout
  it('should display courses in a modern card layout', () => {
    component.data = mockCourses;
    component.applyFilters();
    fixture.detectChanges();

    const compiled = fixture.nativeElement;
    const courseCards = compiled.querySelectorAll('.course-card-glow');
    expect(courseCards.length).toBe(3);
  });

  // Requirement 5.2: Hover effects
  it('should have hover effects on course cards', () => {
    component.data = mockCourses;
    component.applyFilters();
    fixture.detectChanges();

    const compiled = fixture.nativeElement;
    const courseCard = compiled.querySelector('.course-card-glow');
    expect(courseCard).toBeTruthy();
    
    // Check if card has transition styles
    const styles = window.getComputedStyle(courseCard);
    expect(styles.transition).toContain('all');
  });

  // Requirement 5.3: Course details displayed clearly
  it('should show course details clearly', () => {
    component.data = mockCourses;
    component.applyFilters();
    fixture.detectChanges();

    const compiled = fixture.nativeElement;
    const courseTitle = compiled.querySelector('.course-title-glow');
    const courseDesc = compiled.querySelector('.course-desc-light');
    const courseMeta = compiled.querySelector('.course-meta-dark');

    expect(courseTitle).toBeTruthy();
    expect(courseDesc).toBeTruthy();
    expect(courseMeta).toBeTruthy();
  });

  // Requirement 5.4: Enrollment buttons
  it('should include enrollment buttons', () => {
    component.data = mockCourses;
    component.applyFilters();
    fixture.detectChanges();

    const compiled = fixture.nativeElement;
    const enrollButtons = compiled.querySelectorAll('.enroll-btn-gradient');
    expect(enrollButtons.length).toBe(3);
  });

  // Requirement 5.5: Consistent styling
  it('should use consistent styling with design system', () => {
    component.data = mockCourses;
    component.applyFilters();
    fixture.detectChanges();

    const compiled = fixture.nativeElement;
    const page = compiled.querySelector('.courses-page-dark');
    expect(page).toBeTruthy();
    
    // Check for gradient elements
    const gradientOrbs = compiled.querySelectorAll('.gradient-orb');
    expect(gradientOrbs.length).toBeGreaterThan(0);
  });

  // Search functionality
  it('should filter courses by search query', () => {
    component.data = mockCourses;
    component.searchQuery = 'Web Development';
    component.applyFilters();

    expect(component.filteredData.length).toBe(1);
    expect(component.filteredData[0].title).toBe('Web Development Bootcamp');
  });

  // Category filter
  it('should filter courses by category', () => {
    component.data = mockCourses;
    component.selectedCategory = 'Design';
    component.applyFilters();

    expect(component.filteredData.length).toBe(1);
    expect(component.filteredData[0].category).toBe('Design');
  });

  // Duration filter
  it('should filter courses by duration', () => {
    component.data = mockCourses;
    component.selectedDuration = '8 weeks';
    component.applyFilters();

    expect(component.filteredData.length).toBe(1);
    expect(component.filteredData[0].duration).toBe('8 weeks');
  });

  // Combined filters
  it('should apply multiple filters simultaneously', () => {
    component.data = mockCourses;
    component.selectedCategory = 'Programming';
    component.selectedDuration = '12 weeks';
    component.searchQuery = 'Web';
    component.applyFilters();

    expect(component.filteredData.length).toBe(1);
    expect(component.filteredData[0].title).toBe('Web Development Bootcamp');
  });

  // Reset filters
  it('should reset all filters', () => {
    component.data = mockCourses;
    component.selectedCategory = 'Design';
    component.selectedDuration = '8 weeks';
    component.searchQuery = 'test';
    component.applyFilters();

    component.resetFilters();

    expect(component.selectedCategory).toBe('all');
    expect(component.selectedDuration).toBe('all');
    expect(component.searchQuery).toBe('');
    expect(component.filteredData.length).toBe(3);
  });

  // Empty state
  it('should show empty state when no courses match filters', () => {
    component.data = mockCourses;
    component.searchQuery = 'nonexistent course';
    component.applyFilters();
    fixture.detectChanges();

    expect(component.filteredData.length).toBe(0);
    
    const compiled = fixture.nativeElement;
    const emptyState = compiled.querySelector('.empty-state-glow');
    expect(emptyState).toBeTruthy();
  });

  // Loading state
  it('should show loading state initially', () => {
    component.isLoading = true;
    fixture.detectChanges();

    const compiled = fixture.nativeElement;
    const skeletons = compiled.querySelectorAll('.skeleton');
    expect(skeletons.length).toBeGreaterThan(0);
  });

  // Category icons
  it('should return correct category icons', () => {
    expect(component.getCategoryIcon('Programming')).toBe('code');
    expect(component.getCategoryIcon('Design')).toBe('palette');
    expect(component.getCategoryIcon('Business')).toBe('business_center');
    expect(component.getCategoryIcon('Data Science')).toBe('analytics');
    expect(component.getCategoryIcon('Marketing')).toBe('campaign');
    expect(component.getCategoryIcon(undefined)).toBe('category');
  });

  // Category colors
  it('should return correct category colors', () => {
    expect(component.getCategoryColor('Programming')).toBe('#667eea');
    expect(component.getCategoryColor('Design')).toBe('#f093fb');
    expect(component.getCategoryColor('Business')).toBe('#4facfe');
    expect(component.getCategoryColor('Data Science')).toBe('#43e97b');
    expect(component.getCategoryColor('Marketing')).toBe('#fa709a');
    expect(component.getCategoryColor(undefined)).toBe('#667eea');
  });

  // Responsive design
  it('should have responsive grid layout', () => {
    component.data = mockCourses;
    component.applyFilters();
    fixture.detectChanges();

    const compiled = fixture.nativeElement;
    const grid = compiled.querySelector('.courses-grid-glow');
    expect(grid).toBeTruthy();
    
    const styles = window.getComputedStyle(grid);
    expect(styles.display).toBe('grid');
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { of, throwError } from 'rxjs';

import { ContactComponent } from './contact.component';
import { ContactService } from '../core/api/contact.service';

describe('ContactComponent', () => {
  let component: ContactComponent;
  let fixture: ComponentFixture<ContactComponent>;
  let mockContactService: jasmine.SpyObj<ContactService>;

  beforeEach(async () => {
    const contactServiceSpy = jasmine.createSpyObj('ContactService', ['create']);

    await TestBed.configureTestingModule({
      imports: [
        ContactComponent,
        ReactiveFormsModule,
        MatSnackBarModule,
        BrowserAnimationsModule
      ],
      providers: [
        { provide: ContactService, useValue: contactServiceSpy }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContactComponent);
    component = fixture.componentInstance;
    mockContactService = TestBed.inject(ContactService) as jasmine.SpyObj<ContactService>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form with empty values', () => {
    expect(component.form.get('name')?.value).toBe('');
    expect(component.form.get('email')?.value).toBe('');
    expect(component.form.get('subject')?.value).toBe('');
    expect(component.form.get('message')?.value).toBe('');
  });

  it('should validate required fields', () => {
    component.form.patchValue({
      name: '',
      email: '',
      subject: '',
      message: ''
    });
    
    expect(component.form.invalid).toBeTruthy();
    expect(component.form.get('name')?.hasError('required')).toBeTruthy();
    expect(component.form.get('email')?.hasError('required')).toBeTruthy();
    expect(component.form.get('subject')?.hasError('required')).toBeTruthy();
    expect(component.form.get('message')?.hasError('required')).toBeTruthy();
  });

  it('should validate email format', () => {
    component.form.patchValue({
      email: 'invalid-email'
    });
    
    expect(component.form.get('email')?.hasError('email')).toBeTruthy();
    
    component.form.patchValue({
      email: 'valid@email.com'
    });
    
    expect(component.form.get('email')?.hasError('email')).toBeFalsy();
  });

  it('should submit form when valid', () => {
    mockContactService.create.and.returnValue(of({}));
    
    component.form.patchValue({
      name: 'Test User',
      email: 'test@example.com',
      subject: 'Test Subject',
      message: 'Test message content'
    });
    
    component.submit();
    
    expect(mockContactService.create).toHaveBeenCalledWith({
      name: 'Test User',
      email: 'test@example.com',
      subject: 'Test Subject',
      message: 'Test message content'
    });
  });

  it('should handle form submission success', () => {
    mockContactService.create.and.returnValue(of({}));
    
    component.form.patchValue({
      name: 'Test User',
      email: 'test@example.com',
      subject: 'Test Subject',
      message: 'Test message content'
    });
    
    component.submit();
    
    expect(component.loading).toBeFalsy();
    expect(component.submitSuccess).toBeTruthy();
    expect(component.submitError).toBeFalsy();
  });

  it('should handle form submission error', () => {
    mockContactService.create.and.returnValue(throwError(() => new Error('API Error')));
    
    component.form.patchValue({
      name: 'Test User',
      email: 'test@example.com',
      subject: 'Test Subject',
      message: 'Test message content'
    });
    
    component.submit();
    
    expect(component.loading).toBeFalsy();
    expect(component.submitSuccess).toBeFalsy();
    expect(component.submitError).toBeTruthy();
  });

  it('should not submit invalid form', () => {
    component.form.patchValue({
      name: '',
      email: 'invalid-email',
      subject: '',
      message: ''
    });
    
    component.submit();
    
    expect(mockContactService.create).not.toHaveBeenCalled();
    expect(component.loading).toBeFalsy();
  });

  it('should return correct error messages', () => {
    component.form.get('name')?.setErrors({ required: true });
    expect(component.nameError).toBe('Name is required');
    
    component.form.get('name')?.setErrors({ minlength: true });
    expect(component.nameError).toBe('Name must be at least 2 characters');
    
    component.form.get('email')?.setErrors({ required: true });
    expect(component.emailError).toBe('Email is required');
    
    component.form.get('email')?.setErrors({ email: true });
    expect(component.emailError).toBe('Please enter a valid email address');
    
    component.form.get('subject')?.setErrors({ required: true });
    expect(component.subjectError).toBe('Subject is required');
    
    component.form.get('message')?.setErrors({ required: true });
    expect(component.messageError).toBe('Message is required');
  });
});

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface CourseEnrollment {
  id?: number;
  course?: {
    id: number;
    title: string;
  };
  fullName: string;
  email: string;
  phone: string;
  address: string;
  qualification: string;
  institution: string;
  experience: string;
  motivation: string;
  enrolledAt?: string;
}

@Injectable({
  providedIn: 'root'
})
export class CourseEnrollmentsService {
  private base = `${environment.apiUrl}/course-enrollments`;

  constructor(private http: HttpClient) { }

  list(): Observable<CourseEnrollment[]> {
    return this.http.get<CourseEnrollment[]>(this.base);
  }

  listByCourse(courseId: number): Observable<CourseEnrollment[]> {
    return this.http.get<CourseEnrollment[]>(`${this.base}/course/${courseId}`);
  }

  create(data: any, courseId: number): Observable<CourseEnrollment> {
    const payload = {
      ...data,
      course: { id: courseId }
    };
    return this.http.post<CourseEnrollment>(this.base, payload);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.base}/${id}`);
  }
}

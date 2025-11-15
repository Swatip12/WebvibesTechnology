import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface Course {
  id?: number;
  title: string;
  instructor: string;
  description: string;
  duration?: string;
  category?: string;
  active: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class CoursesService {
  private base = `${environment.apiUrl}/courses`;

  constructor(private http: HttpClient) { }

  list(): Observable<Course[]> { return this.http.get<Course[]>(this.base); }
  listActive(): Observable<Course[]> { return this.http.get<Course[]>(`${this.base}/active`); }
  get(id: number): Observable<Course> { return this.http.get<Course>(`${this.base}/${id}`); }
  create(data: Course): Observable<Course> { return this.http.post<Course>(this.base, data); }
  update(id: number, data: Course): Observable<Course> { return this.http.put<Course>(`${this.base}/${id}`, data); }
  delete(id: number): Observable<void> { return this.http.delete<void>(`${this.base}/${id}`); }
}

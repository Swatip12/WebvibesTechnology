import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface Internship {
  id?: number;
  title: string;
  department: string;
  location: string;
  durationWeeks: number;
  description: string;
  active: boolean;
  postedAt?: string;
}

@Injectable({
  providedIn: 'root'
})
export class InternshipsService {
  private base = `${environment.apiUrl}/internships`;

  constructor(private http: HttpClient) { }

  list(): Observable<Internship[]> {
    return this.http.get<Internship[]>(this.base);
  }

  listActive(): Observable<Internship[]> {
    return this.http.get<Internship[]>(`${this.base}/active`);
  }

  get(id: number): Observable<Internship> {
    return this.http.get<Internship>(`${this.base}/${id}`);
  }

  create(data: Internship): Observable<Internship> {
    return this.http.post<Internship>(this.base, data);
  }

  update(id: number, data: Internship): Observable<Internship> {
    return this.http.put<Internship>(`${this.base}/${id}`, data);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.base}/${id}`);
  }
}

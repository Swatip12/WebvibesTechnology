import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface ApplicationPayload {
  id?: number;
  internshipId: number;
  fullName: string;
  email: string;
  phone: string;
  resumeUrl?: string;
  coverLetter: string;
  appliedAt?: string;
}

@Injectable({
  providedIn: 'root'
})
export class ApplicationsService {
  private base = 'http://localhost:8080/api/applications';

  constructor(private http: HttpClient) { }

  list(): Observable<ApplicationPayload[]> { return this.http.get<ApplicationPayload[]>(this.base); }
  listByInternship(internshipId: number): Observable<ApplicationPayload[]> {
    return this.http.get<ApplicationPayload[]>(`${this.base}/internship/${internshipId}`);
  }
  create(data: ApplicationPayload): Observable<ApplicationPayload> { return this.http.post<ApplicationPayload>(this.base, data); }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface ContactMessage {
  id?: number;
  name: string;
  email: string;
  subject: string;
  message: string;
  sentAt?: string;
}

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private base = `${environment.apiUrl}/contact`;

  constructor(private http: HttpClient) { }

  list(): Observable<ContactMessage[]> { return this.http.get<ContactMessage[]>(this.base); }
  create(data: ContactMessage): Observable<ContactMessage> { return this.http.post<ContactMessage>(this.base, data); }
}

import { Injectable } from '@angular/core';
import { Client, IMessage, Stomp } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  private client?: Client;
  private connected = false;

  private ensureConnected() {
    if (this.connected) return;
    this.client = Stomp.over(() => new SockJS('http://localhost:8080/ws'));
    this.client.reconnectDelay = 3000;
    this.client.onStompError = (frame) => console.error('Broker error', frame.headers['message']);
    this.client.onWebSocketError = (evt) => console.error('WebSocket error', evt);
    this.client.activate();
    this.connected = true;
  }

  subscribe<T>(topic: string): Observable<T> {
    this.ensureConnected();
    return new Observable<T>((observer) => {
      const sub = this.client!.subscribe(topic, (msg: IMessage) => {
        try {
          observer.next(JSON.parse(msg.body) as T);
        } catch {
          // fallback for simple string payloads
          // @ts-ignore
          observer.next(msg.body);
        }
      });
      return () => sub.unsubscribe();
    });
  }

  onInternships() {
    return this.subscribe<any>('/topic/internships');
  }

  onApplications() {
    return this.subscribe<any>('/topic/applications');
  }
}

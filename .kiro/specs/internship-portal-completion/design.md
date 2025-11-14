# Design Document

## Overview

The WebVibes Technology Internship Portal completion project focuses on enhancing the existing full-stack application by implementing missing features and improving the user experience. The system uses Angular 18 for the frontend, Spring Boot 3.5.7 for the backend, MySQL for data persistence, and WebSocket (STOMP over SockJS) for real-time updates.

The design maintains the existing architecture while adding:
- Complete UI implementations for all pages
- Admin dashboard for content management
- Enhanced user experience with filtering, search, and validation
- Responsive design across all devices

## Architecture

### System Architecture

The application follows a three-tier architecture:

```
┌─────────────────────────────────────┐
│     Angular Frontend (Port 4200)    │
│  - Standalone Components            │
│  - Material Design UI               │
│  - Reactive Forms                   │
│  - WebSocket Client                 │
└──────────┬──────────────────────────┘
           │ HTTP REST + WebSocket
           │
┌──────────▼──────────────────────────┐
│   Spring Boot Backend (Port 8080)   │
│  - REST Controllers                 │
│  - Service Layer                    │
│  - JPA Repositories                 │
│  - WebSocket Broker                 │
└──────────┬──────────────────────────┘
           │ JDBC
           │
┌──────────▼──────────────────────────┐
│      MySQL Database (Port 3306)     │
│  - internships table                │
│  - applications table               │
│  - courses table                    │
│  - contact_messages table           │
└─────────────────────────────────────┘
```

### Technology Stack

**Frontend:**
- Angular 18.2 with standalone components
- Angular Material 18.2 for UI components
- RxJS 7.8 for reactive programming
- STOMP.js 7.2 + SockJS for WebSocket
- TypeScript 5.5

**Backend:**
- Spring Boot 3.5.7
- Spring Data JPA for database access
- Spring WebSocket w
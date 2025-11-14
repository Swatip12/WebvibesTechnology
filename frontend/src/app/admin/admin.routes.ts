import { Routes } from '@angular/router';
import { AdminLayoutComponent } from './admin-layout.component';

export const adminRoutes: Routes = [
  {
    path: '',
    component: AdminLayoutComponent,
    children: [
      { path: '', redirectTo: 'internships', pathMatch: 'full' },
      { 
        path: 'internships', 
        loadComponent: () => import('./internships/admin-internships.component').then(m => m.AdminInternshipsComponent)
      },
      { 
        path: 'applications', 
        loadComponent: () => import('./applications/admin-applications.component').then(m => m.AdminApplicationsComponent)
      },
      { 
        path: 'courses', 
        loadComponent: () => import('./courses/admin-courses.component').then(m => m.AdminCoursesComponent)
      },
    ],
  },
];

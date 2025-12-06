import { Routes } from '@angular/router';
import { ShellComponent } from './layout/shell.component';
import { HomeComponent } from './pages/home.component';
import { InternshipsComponent } from './pages/internships.component';
import { CoursesComponent } from './pages/courses.component';
import { ApplyComponent } from './pages/apply.component';
import { AboutComponent } from './pages/about.component';
import { ContactComponent } from './pages/contact.component';
import { TrainingProcessComponent } from './pages/training-process.component';
import { InternshipEntranceComponent } from './pages/internship-entrance.component';

export const routes: Routes = [
  {
    path: '',
    component: ShellComponent,
    children: [
      { path: '', component: HomeComponent },
      { path: 'internships', component: InternshipsComponent },
      { path: 'courses', component: CoursesComponent },
      { path: 'training-process', component: TrainingProcessComponent },
      { path: 'internship-entrance', component: InternshipEntranceComponent },
      { path: 'apply', component: ApplyComponent },
      { path: 'about', component: AboutComponent },
      { path: 'contact', component: ContactComponent },
    ],
  },
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.routes').then(m => m.adminRoutes),
  },
  { path: '**', redirectTo: '' },
];

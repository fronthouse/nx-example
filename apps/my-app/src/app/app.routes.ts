import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'users',
    loadChildren: () => import('./sections/users').then((m) => m.UsersSectionModule)
  },
  {
    path: '',
    redirectTo: 'users',
    pathMatch: 'full'
  }
];

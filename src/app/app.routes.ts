import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => {
      return import('./features/dashboard/dashboard.routes').then(r => r.DASHBOARD_ROUTES);
    }
  }
];

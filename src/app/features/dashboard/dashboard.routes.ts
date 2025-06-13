import type { Routes } from "@angular/router";

export const DASHBOARD_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => {
      return import('./pages/dashboard/dashboard.component').then(c => c.DashboardComponent);
    }
  }
]

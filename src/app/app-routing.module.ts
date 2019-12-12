import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const appRoutes: Routes = [
  { path: 'app', loadChildren: () => import('./customer-list/customer-list.module').then(m => m.CustomerListModule) },
  {
    path: '**',
    redirectTo: '/app',
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes),
    RouterModule.forChild(appRoutes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

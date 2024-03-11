import { Routes } from '@angular/router';
import { MainPageComponent } from './main-page/main-page.component';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/main' },
  { path: 'main', component: MainPageComponent }
];
import { Routes } from '@angular/router';
import { MainPageComponent } from './main-page/main-page.component';
import { UploadFileComponent } from './upload-file/upload-file.component';
import { LoginComponent } from './auth/components/login/login.component';


export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/login' },
  { path: 'login', component: LoginComponent },
  { path: 'videoflix', component: MainPageComponent },
  { path: 'upload', component: UploadFileComponent }
];
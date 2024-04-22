import { Routes } from '@angular/router';
import { MainPageComponent } from './main-page/main-page.component';
import { UploadFileComponent } from './upload-file/upload-file.component';
import { LoginComponent } from './auth/components/login/login.component';
import { MyListComponent } from './my-list/my-list.component';
import { VideoOverviewComponent } from './video-overview/video-overview.component';
import { MoviesComponent } from './movies/movies.component';
import { RegisterComponent } from './auth/components/register/register.component';
import { PasswordResetComponent } from './auth/components/password-reset/password-reset.component';
import { AuthGuard } from './auth/services/auth-guard';


export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/login' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'videoflix', component: MainPageComponent, canActivate: [AuthGuard] },
  { path: 'upload', component: UploadFileComponent, canActivate: [AuthGuard] },
  { path: 'mylist', component: MyListComponent, canActivate: [AuthGuard] },
  { path: 'overview', component: VideoOverviewComponent, canActivate: [AuthGuard] },
  { path: 'movies', component: MoviesComponent, canActivate: [AuthGuard] },
  { path: 'password-reset/:token', component: PasswordResetComponent }
];
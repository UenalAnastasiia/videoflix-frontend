import { Routes } from '@angular/router';
import { UploadFileComponent } from './upload-file/upload-file.component';
import { LoginComponent } from './auth/components/login/login.component';
import { MyListComponent } from './my-list/my-list.component';
import { VideoOverviewComponent } from './video-overview/video-overview.component';
import { MoviesComponent } from './movies/movies.component';
import { RegisterComponent } from './auth/components/register/register.component';
import { PasswordResetComponent } from './auth/components/password-reset/password-reset.component';
import { AuthGuard } from './auth/services/auth-guard';
import { HomeComponent } from './home/home.component';
import { ConfirmEmailComponent } from './auth/components/confirm-email/confirm-email.component';
import { ConfirmErrorComponent } from './auth/components/confirm-error/confirm-error.component';
import { UserSettingsComponent } from './settings-components/user-settings/user-settings.component';
import { UploadsSettingsComponent } from './settings-components/uploads-settings/uploads-settings.component';
import { CategoriesSettingsComponent } from './settings-components/categories-settings/categories-settings.component';


export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/login' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'confirm-email', component: ConfirmEmailComponent },
  { path: 'confirm-error', component: ConfirmErrorComponent },
  { path: 'videoflix', component: HomeComponent },
  { path: 'upload', component: UploadFileComponent },
  { path: 'mylist', component: MyListComponent },
  { path: 'overview', component: VideoOverviewComponent },
  { path: 'movies', component: MoviesComponent },
  { path: 'settings/user', component: UserSettingsComponent },
  { path: 'settings/uploads', component: UploadsSettingsComponent },
  { path: 'settings/categories', component: CategoriesSettingsComponent },
  // { path: 'videoflix', component: HomeComponent, canActivate: [AuthGuard] },
  // { path: 'upload', component: UploadFileComponent, canActivate: [AuthGuard] },
  // { path: 'mylist', component: MyListComponent, canActivate: [AuthGuard] },
  // { path: 'overview', component: VideoOverviewComponent, canActivate: [AuthGuard] },
  // { path: 'movies', component: MoviesComponent, canActivate: [AuthGuard] },
  { path: 'password-reset/:token', component: PasswordResetComponent }
];
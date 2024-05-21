import { RouterModule, Routes } from '@angular/router';
import { UploadFileComponent } from './upload-file/upload-file.component';
import { LoginComponent } from './auth/components/login/login.component';
import { MyListComponent } from './my-list/my-list.component';
import { RegisterComponent } from './auth/components/register/register.component';
import { PasswordResetComponent } from './auth/components/password-reset/password-reset.component';
import { AuthGuard } from './auth/services/auth-guard';
import { ConfirmEmailComponent } from './auth/components/confirm-email/confirm-email.component';
import { ConfirmErrorComponent } from './auth/components/confirm-error/confirm-error.component';
import { UserSettingsComponent } from './settings-components/user-settings/user-settings.component';
import { UploadsSettingsComponent } from './settings-components/uploads-settings/uploads-settings.component';
import { CategoriesSettingsComponent } from './settings-components/categories-settings/categories-settings.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { HomeComponent } from './home-components/home/home.component';
import { VideoOverviewComponent } from './video-overview-components/video-overview/video-overview.component';
import { MoviesComponent } from './movies-components/movies/movies.component';
import { ImprintComponent } from './footer-components/imprint/imprint.component';
import { DataProtectionComponent } from './footer-components/data-protection/data-protection.component';
import { NgModule } from '@angular/core';


export const routes: Routes = [
  //{ path: '**', component: NotFoundComponent },
  { path: '', pathMatch: 'full', redirectTo: '/login' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'confirm-email', component: ConfirmEmailComponent },
  { path: 'confirm-error', component: ConfirmErrorComponent },
  { path: 'videoflix', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'upload', component: UploadFileComponent, canActivate: [AuthGuard] },
  { path: 'mylist', component: MyListComponent, canActivate: [AuthGuard] },
  { path: 'overview', component: VideoOverviewComponent, canActivate: [AuthGuard] },
  { path: 'movies', component: MoviesComponent, canActivate: [AuthGuard] },
  { path: 'movies/search', component: MoviesComponent, canActivate: [AuthGuard] },
  { path: 'settings/user', component: UserSettingsComponent, canActivate: [AuthGuard] },
  { path: 'settings/uploads', component: UploadsSettingsComponent, canActivate: [AuthGuard] },
  { path: 'settings/categories', component: CategoriesSettingsComponent, canActivate: [AuthGuard] },
  { path: 'password-reset/:token', component: PasswordResetComponent },
  { path: 'imprint', component: ImprintComponent },
  { path: 'data-protection', component: DataProtectionComponent },
  { path: '**', component: LoginComponent }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
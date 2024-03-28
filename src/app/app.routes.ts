import { Routes } from '@angular/router';
import { MainPageComponent } from './main-page/main-page.component';
import { UploadFileComponent } from './upload-file/upload-file.component';
import { LoginComponent } from './auth/components/login/login.component';
import { MyListComponent } from './my-list/my-list.component';
import { VideoOverviewComponent } from './video-overview/video-overview.component';
import { MoviesComponent } from './movies/movies.component';
import { RegisterComponent } from './auth/components/register/register.component';


export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/login' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'videoflix', component: MainPageComponent },
  { path: 'upload', component: UploadFileComponent },
  { path: 'mylist', component: MyListComponent },
  { path: 'overview', component: VideoOverviewComponent },
  { path: 'movies', component: MoviesComponent }
];
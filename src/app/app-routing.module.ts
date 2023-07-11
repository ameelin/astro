import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { FindMatchesComponent } from './find-matches/find-matches.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { AboutComponent } from './about/about.component';
import { ShowMatchesComponent } from './show-matches/show-matches.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'findMatches', component: FindMatchesComponent },
  { path: 'showMatches', component: ShowMatchesComponent },
  { path: 'editUser', component: EditUserComponent },
  { path: 'editUser', component: AboutComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './login/login-page/login-page.component';
import { TrendingPageComponent } from './trending/trending-page/trending-page.component';
import { AdminPageComponent } from './admin/admin-page/admin-page.component';

const routes: Routes = [
    { path: '', component: LoginPageComponent },
    { path: 'trending', component: TrendingPageComponent },
    { path: 'admin', component: AdminPageComponent } 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

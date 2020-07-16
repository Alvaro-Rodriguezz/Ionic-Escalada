import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'home', loadChildren: () => import('./page/islas/islas.module').then(m => m.MunicipiosPageModule)},
  {path: 'add/:isla', loadChildren: () => import('./page/add/add.module').then( m => m.AddPageModule)},
  {path: 'login', loadChildren: () => import('./page/login/login.module').then( m => m.LoginPageModule)},
  {path: 'register', loadChildren: () => import('./page/register/register.module').then( m => m.RegisterPageModule)}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

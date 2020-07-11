import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IslasPage } from './islas.page';

const routes: Routes = [
  {
    path: '',
    component: IslasPage
  },
  {
    path: 'ruta-list',
    loadChildren: () => import('./ruta-list/ruta-list.module').then( m => m.RutaListPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MunicipiosPageRoutingModule {}

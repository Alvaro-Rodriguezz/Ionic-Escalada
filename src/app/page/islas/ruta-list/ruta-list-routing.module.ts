import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RutaListPage } from './ruta-list.page';

const routes: Routes = [
  {
    path: '',
    component: RutaListPage
  },
  {
    path: ':id',
    loadChildren: () => import('./ruta-detail/ruta-detail.module').then( m => m.RutaDetailPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RutaListPageRoutingModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RutaListPageRoutingModule } from './ruta-list-routing.module';

import { RutaListPage } from './ruta-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RutaListPageRoutingModule
  ],
  declarations: [RutaListPage]
})
export class RutaListPageModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MunicipiosPageRoutingModule } from './islas-routing.module';

import { IslasPage } from './islas.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MunicipiosPageRoutingModule
  ],
  declarations: [IslasPage]
})
export class MunicipiosPageModule {}

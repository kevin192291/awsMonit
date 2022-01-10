import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PointCardRoutingModule } from './point-card-routing.module';
import { CardListComponent } from './card-list/card-list.component';
import { CardCreateComponent } from './card-create/card-create.component';
import { ScanComponent } from './scan/scan.component';
import { SharedModule } from '../shared/shared.module';
import { QrComponent } from './qr/qr.component';
import { StampComponent } from './stamp/stamp.component';


@NgModule({
  declarations: [
    CardListComponent,
    CardCreateComponent,
    ScanComponent,
    QrComponent,
    StampComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    PointCardRoutingModule
  ]
})
export class PointCardModule { }

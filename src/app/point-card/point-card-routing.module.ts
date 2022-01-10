import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CardListComponent } from './card-list/card-list.component';
import { QrComponent } from './qr/qr.component';
import { ScanComponent } from './scan/scan.component';
import { StampComponent } from './stamp/stamp.component';

const routes: Routes = [
  { path: "", component: CardListComponent },
  { path: 'scan', component: ScanComponent },
  { path: 'qr', component: QrComponent },
  { path: 'stamp/:id', component: StampComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PointCardRoutingModule { }

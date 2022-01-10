import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StatusRoutingModule } from './status-routing.module';
import { StatusListComponent } from './status-list/status-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    StatusListComponent
  ],
  imports: [
    CommonModule,
    SharedModule,

    StatusRoutingModule
  ]
})
export class StatusModule { }

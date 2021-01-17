import { SharedModule } from './../../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditExpensePageRoutingModule } from './edit-expense-routing.module';

import { EditExpensePage } from './edit-expense.page';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonicModule,
    EditExpensePageRoutingModule,
    SharedModule
  ],
  declarations: [EditExpensePage]
})
export class EditExpensePageModule {}

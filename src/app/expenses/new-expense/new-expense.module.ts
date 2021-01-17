import { SharedModule } from './../../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NewExpensePageRoutingModule } from './new-expense-routing.module';

import { NewExpensePage } from './new-expense.page';


@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonicModule,
    NewExpensePageRoutingModule,
    SharedModule
  ],
  declarations: [NewExpensePage]
})
export class NewExpensePageModule {}

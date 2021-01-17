import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewExpensesPageRoutingModule } from './view-expenses-routing.module';

import { ViewExpensesPage } from './view-expenses.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViewExpensesPageRoutingModule
  ],
  declarations: [ViewExpensesPage]
})
export class ViewExpensesPageModule {}

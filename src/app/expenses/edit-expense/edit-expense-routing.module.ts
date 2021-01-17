import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditExpensePage } from './edit-expense.page';

const routes: Routes = [
  {
    path: '',
    component: EditExpensePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditExpensePageRoutingModule {}

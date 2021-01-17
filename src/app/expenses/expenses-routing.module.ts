import { NewExpensePage } from './new-expense/new-expense.page';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ExpensesPage } from './expenses.page';

const routes: Routes = [



  {
    // creates a tabs path which will lazy load other components from other forms but all will contain the Expenses Page component if going through the tab route
    path: 'tabs',
    component: ExpensesPage,
    // creates children to the tabs components, uses lazy loading to insert the other components
    children: [

      {
        path: 'view-expenses',
        children: [
          {
            path: '',
            loadChildren: () => import('./view-expenses/view-expenses.module').then( m => m.ViewExpensesPageModule)
          },
          {
            path: ':expenseId',
            loadChildren: () => import('./edit-expense/edit-expense.module').then( m => m.EditExpensePageModule)
          }
        ]
      },
      {
        path: 'new-expense',
        loadChildren: () => import('./new-expense/new-expense.module').then( m => m.NewExpensePageModule)
      },
      // if just expenses/tabs is the address redirects to view-expenses
      {
        path: '',
        redirectTo: '/expenses/tabs/view-expenses',
        pathMatch: 'full'
      }

    ]
  },
// if just expenses is selected redirects to view-expenses through the /expenses/tabs route
  {
    path: '',
    redirectTo: '/expenses/tabs/view-expenses',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ExpensesPageRoutingModule {}

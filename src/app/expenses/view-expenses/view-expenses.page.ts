import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Expense } from '../expenses.model';
import { ExpensesService } from '../expenses.service';

@Component({
  selector: 'app-view-expenses',
  templateUrl: './view-expenses.page.html',
  styleUrls: ['./view-expenses.page.scss'],
})
export class ViewExpensesPage implements OnInit, OnDestroy {

  loadedExpenses: Expense[];
  private expensesSub: Subscription;
  totalCost: number;


// injecting the expenses service by use of Expenses service in the constructor
  constructor(private expensesService: ExpensesService) { }

  ngOnInit() {
    this.expensesSub = this.expensesService.expenses.subscribe(expenses => {
      this.loadedExpenses = expenses;
      this.totalExpenses(expenses);
    });



  }

  totalExpenses(totalExpense: Expense[]){
    let i;
    let total = 0;
    for (i = 0; i < totalExpense.length; i++) {
        total += totalExpense[i].cost;
    }
    this.totalCost = total;
  }

  ngOnDestroy() {
    if (this.expensesSub) {
      this.expensesSub.unsubscribe();
    }
  }


  }



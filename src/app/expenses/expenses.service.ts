
// this is creating a service component which can be used by other components when imported

// imports the Expense model for the template of the Expense object
import { Expense } from './expenses.model';
// imports Injectable to allow the service to be injected
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { take, map, tap } from 'rxjs/operators';
import { Placeholder } from '@angular/compiler/src/i18n/i18n_ast';

// as injectable is at root it allows all components to access it
@Injectable({
  providedIn: 'root'
})

// creates class called ExpensesService
export class ExpensesService {

  // a new expenses array of type Expense is created
  private _expenses = new BehaviorSubject<Expense[]>(
    []
  ) ;

  // method returns array of expenses
  get expenses() {
    // the three... indicated this is a copy of the expenses object
    // this must return the same name given as in the private declaration above
    return this._expenses.asObservable();
  }

  constructor() { }

  getExpense(id: string) {
    return this.expenses.pipe(
      take(1),
      map(expenses => {
        return { ...expenses.find(p => p.id === id) };
      }));
  }

  totalCost() {
    return this.totalCost;
  }

  addExpense(title: string, description: string, cost: number, expenseDate: Date, imageLoc: string) {
    const newExpense = new Expense(Math.random().toString(), title, description, cost, imageLoc, expenseDate, 'abc');
    this.expenses.pipe(take(1)).subscribe(expenses => {
      this._expenses.next(expenses.concat(newExpense));
    });

  }

  updateExpense(expenseId: string, title: string, description: string, cost: number, imageLoc: string, expenseDate: Date) {
    return this.expenses.pipe(take(1), tap(expenses => {
      const updatedExpenseIndex = expenses.findIndex(ex => ex.id === expenseId);
      const updatedExpenses = [...expenses];
      const oldExpense = updatedExpenses[updatedExpenseIndex];
      // tslint:disable-next-line: max-line-length
      updatedExpenses[updatedExpenseIndex] = new Expense(oldExpense.id, title, description, cost, imageLoc, expenseDate, oldExpense.userId);

      this._expenses.next(updatedExpenses);
    }));

  }

  deleteExpense(expenseId: string){
    return this.expenses.pipe(
      take(1),
      tap(expenses => {
        this._expenses.next(expenses.filter(exp => exp.id !== expenseId));
      })
    );
  }

  totalExpense() {
    console.log('total expense');
  }
}

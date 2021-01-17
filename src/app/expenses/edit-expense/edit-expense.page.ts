import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Expense } from './../expenses.model';
import { ExpensesService } from './../expenses.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-edit-expense',
  templateUrl: './edit-expense.page.html',
  styleUrls: ['./edit-expense.page.scss'],
})
export class EditExpensePage implements OnInit, OnDestroy {
  expense: Expense;
  form: FormGroup;
  private expenseSub: Subscription;

  // tslint:disable-next-line: max-line-length
  constructor(private route: ActivatedRoute, private expensesService: ExpensesService, private navCtrl: NavController, private router: Router) { }

  ngOnInit() {
    this.expenseSub = this.route.paramMap.subscribe(paramMap => {
      if (!paramMap.has('expenseId')) {
        this.navCtrl.navigateBack('/expenses/tabs/view-expenses');
        return;
      }
      this.expensesService.getExpense(paramMap.get('expenseId')).subscribe(expense => {
        this.expense = expense;
      });
      this.form = new FormGroup({

        title: new FormControl(this.expense.title, {
          updateOn: 'blur',
          validators: [Validators.required]
        }),
        description: new FormControl(this.expense.description, {
          updateOn: 'blur',
          validators: [Validators.required, Validators.maxLength(180)]
        }),
        cost: new FormControl(this.expense.cost, {
          updateOn: 'blur',
          validators: [Validators.required, Validators.min(0)]
        }),
        imageLoc: new FormControl(this.expense.imageLoc, {
          updateOn: 'blur',
          validators: [Validators.required]
        }),
        expenseDate: new FormControl(this.expense.expenseDate.toISOString(), {
          updateOn: 'blur',
          validators: [Validators.required]
        })

      });
    });
  }

  onUpdateExpense() {
    if (!this.form.valid) {
      return;
    }
    // tslint:disable-next-line: max-line-length
    this.expensesService.updateExpense(
      this.expense.id,
      this.form.value.title,
      this.form.value.description,
      this.form.value.cost,
      this.expense.imageLoc,
      new Date(this.expense.expenseDate)
      ).subscribe();

    this.form.reset();
    this.router.navigate(['/expenses/tabs/view-expenses']);
  }

  onDeleteExpense() {
    this.expensesService.deleteExpense(this.expense.id).subscribe();
    this.router.navigate(['/expenses/tabs/view-expenses']);
  }

  ngOnDestroy() {
    if (this.expenseSub) {
      this.expenseSub.unsubscribe();
    }
  }


}

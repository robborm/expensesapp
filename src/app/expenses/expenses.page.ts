import { Expense } from './expenses.model';
import { ExpensesService } from './expenses.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-expenses',
  templateUrl: './expenses.page.html',
  styleUrls: ['./expenses.page.scss'],
})
export class ExpensesPage implements OnInit {

  constructor() { }

  ngOnInit() {

  }

}

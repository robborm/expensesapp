import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ViewExpensesPage } from './view-expenses.page';

describe('ViewExpensesPage', () => {
  let component: ViewExpensesPage;
  let fixture: ComponentFixture<ViewExpensesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewExpensesPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ViewExpensesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

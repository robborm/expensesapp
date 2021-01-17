import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EditExpensePage } from './edit-expense.page';

describe('EditExpensePage', () => {
  let component: EditExpensePage;
  let fixture: ComponentFixture<EditExpensePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditExpensePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EditExpensePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

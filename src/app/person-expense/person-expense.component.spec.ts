import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonExpenseComponent } from './person-expense.component';

describe('PersonExpenseComponent', () => {
  let component: PersonExpenseComponent;
  let fixture: ComponentFixture<PersonExpenseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PersonExpenseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PersonExpenseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

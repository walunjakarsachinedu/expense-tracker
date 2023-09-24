import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ExpenseTagComponent } from './expence-tag.component';

describe('expenseTagComponent', () => {
  let component: ExpenseTagComponent;
  let fixture: ComponentFixture<ExpenseTagComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExpenseTagComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExpenseTagComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ExpenseTagComponent } from './expence-tag/expence-tag.component';
import { PersonExpenseComponent } from './person-expense/person-expense.component';
import { ExpenseHistoryComponent } from './expense-history/expense-history.component';
import { ContentEditableDirective } from './content-editable.directive';
import { MonthPickerComponent } from './month-picker/month-picker.component';
import { Month } from 'src/model/types';

@NgModule({
  declarations: [
    AppComponent,
    ExpenseTagComponent,
    PersonExpenseComponent,
    ExpenseHistoryComponent,
    ContentEditableDirective,
    MonthPickerComponent
  ],
  imports: [
    BrowserModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ExpenseTagComponent } from './expence-tag/expence-tag.component';
import { PersonExpenseComponent } from './person-expense/person-expense.component';
import { ExpenseHistoryComponent } from './expense-history/expense-history.component';
import { ContentEditableDirective } from './content-editable.directive';
import { MonthPickerComponent } from './month-picker/month-picker.component';
import { Month } from 'src/model/types';
import { ContextMenuComponent } from './context-menu/context-menu.component';
import { ContextMenuDirective } from './context-menu.directive';
import { GraphQLModule } from './graphql.module';
import { HttpClientModule } from '@angular/common/http';
import { LoginPageComponent } from './login/login.component';
import { HomePageComponent } from './home-page/home-page.component';
import { AppRoutingModule } from './app-routing.module';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    ExpenseTagComponent,
    PersonExpenseComponent,
    ExpenseHistoryComponent,
    ContentEditableDirective,
    MonthPickerComponent,
    ContextMenuComponent,
    ContextMenuDirective,
    LoginPageComponent,
    HomePageComponent,
    PageNotFoundComponent,
  ],
  imports: [
    FormsModule,
    BrowserModule,
    GraphQLModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

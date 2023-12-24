import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { ClipboardService } from 'ngx-clipboard';
import { ContextMenuItem, ExpenseTag, PersonExpense } from 'src/model/types';
import { v4 as uuid, v4 } from 'uuid';
import { ExpenseService } from '../services/expense-service.service';

@Component({
  selector: 'person-expenses',
  templateUrl: './person-expense.component.html',
  styleUrls: ['./person-expense.component.scss']
})
export class PersonExpenseComponent implements OnInit {
  @Input() person?: PersonExpense;
  @Output() onTotalExpenseChange: EventEmitter<number> = new EventEmitter<number>();
  @Output() onPersonDelete = new EventEmitter<string>();
  isHovered = false; 

  constructor(
    private clipboardService: ClipboardService,
    private expenseService: ExpenseService
  ) { }

  contextMenuItems: ContextMenuItem[] = [
    { name: "Copy", icon: "fas fa-clone", onTap: this.copyPersonExpense.bind(this) },
    { name: "Delete", icon: "fas fa-trash", onTap: this.deletePerson.bind(this) },
  ]; 

  ngOnInit():void {
    if(!this.person) throw Error("Person not provided");
    this.refreshExpense();
  }

  refreshExpense() {
    var totalExpense = 0;
    this.person?.personExpense?.forEach(expense => totalExpense += expense.money ?? 0);
    this.onTotalExpenseChange.emit(totalExpense);
  }

  deleteExpense(id: string) {
    const index = this.person?.personExpense?.findIndex(v => v._id == id)!;
    const deletedExpense = this.person?.personExpense?.splice(index, 1)!;
    this.refreshExpense();
    this.expenseService.removePersonExpense(this.person!._id, id)
    .catch(() => this.person?.personExpense?.splice(index, 0, ...deletedExpense));
  }

  async addExpense() {
    if(!this.person!.personExpense) return;
    const expense = {_id: uuid()};
    this.person!.personExpense!.push(expense);
    await this.expenseService.addPersonExpense(this.person!._id, {tag: ""})
    .then((uploadedExpense) => expense._id = uploadedExpense._id)
    .catch(() => this.person?.personExpense?.pop());
  }

  async updateExpense(expense: ExpenseTag) {
    this.expenseService.updatePersonExpense(this.person!._id, expense);
  }

  public deletePerson() {
    this.onPersonDelete.emit(this.person?._id!.toString());
  }

  public updatePersonName() {
    this.expenseService.updatePersonName(this.person!._id, this.person?.personName ?? '');
  }

  public copyPersonExpense() {
    if(!this.person?.personExpense) return;
    let expenseTxt: String = this.person.personName ?? "";
    if(expenseTxt == "") expenseTxt = "person";
    expenseTxt += " : ";

    let total = 0;
    const expenses = this.person.personExpense;

    for(let i=0; i<expenses.length; i++) {
      total += expenses[i].money ?? 0;
      expenseTxt += `${expenses[i].money ?? 0}`;
      if((expenses[i].tag ?? "") != "") expenseTxt += `(${expenses[i].tag})`;
      if(i != expenses.length-1) expenseTxt += " + ";
    }
    expenseTxt += ` = ${total}`;
    this.clipboardService.copyFromContent(expenseTxt.toString());
  }
}

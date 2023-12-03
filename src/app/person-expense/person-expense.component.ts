import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ClipboardService } from 'ngx-clipboard';
import { ContextMenuItem, PersonExpense } from 'src/model/types';
import { v4 as uuid, v4 } from 'uuid';

@Component({
  selector: 'person-expenses',
  templateUrl: './person-expense.component.html',
  styleUrls: ['./person-expense.component.scss']
})
export class PersonExpenseComponent implements OnInit {
  @Input() personExpenses: PersonExpense = {id: v4(), personName: "", expenses: []};
  @Output() onTotalExpenseChange: EventEmitter<number> = new EventEmitter<number>();
  @Output() onPersonDelete = new EventEmitter<string>();
  isHovered = false; 

  constructor(private clipboardService: ClipboardService) { }

  contextMenuItems: ContextMenuItem[] = [
    { name: "Delete", icon: "fas fa-trash", onTap: this.deletePerson.bind(this) },
    { name: "Copy", icon: "fas fa-clone", onTap: this.copyPersonExpense.bind(this) },
  ]; 

  ngOnInit():void {
    this.refreshExpense();
  }

  refreshExpense() {
    var totalExpense = 0;
    this.personExpenses?.expenses?.forEach(expense => totalExpense += expense.money ?? 0);
    this.onTotalExpenseChange.emit(totalExpense);
  }

  deleteExpense(id: string) {
    const index = this.personExpenses?.expenses?.findIndex(v => v.id == id);
    if(index != undefined && index != -1) this.personExpenses?.expenses?.splice(index, 1);
    this.refreshExpense();
  }

  addExpense() {
    const id = uuid();
    this.personExpenses?.expenses?.push({id});
  }

  public deletePerson() {
    this.onPersonDelete.emit(this.personExpenses.id!.toString());
  }

  public copyPersonExpense() {
    if(!this.personExpenses.expenses) return;
    let expenseTxt: String = this.personExpenses.personName ?? "";
    if(expenseTxt == "") expenseTxt = "person";
    expenseTxt += " : ";

    let total = 0;
    const expenses = this.personExpenses.expenses;

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

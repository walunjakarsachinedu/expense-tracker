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
  @Input() person: PersonExpense = {_id: v4(), personName: "", personExpenses: []};
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
    this.person?.personExpenses?.forEach(expense => totalExpense += expense.money ?? 0);
    this.onTotalExpenseChange.emit(totalExpense);
  }

  deleteExpense(id: string) {
    const index = this.person?.personExpenses?.findIndex(v => v._id == id);
    if(index != undefined && index != -1) this.person?.personExpenses?.splice(index, 1);
    this.refreshExpense();
  }

  addExpense() {
    const _id = uuid();
    this.person?.personExpenses?.push({_id});
  }

  public deletePerson() {
    this.onPersonDelete.emit(this.person._id!.toString());
  }

  public copyPersonExpense() {
    if(!this.person.personExpenses) return;
    let expenseTxt: String = this.person.personName ?? "";
    if(expenseTxt == "") expenseTxt = "person";
    expenseTxt += " : ";

    let total = 0;
    const expenses = this.person.personExpenses;

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

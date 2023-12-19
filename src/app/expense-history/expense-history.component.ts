import { Component, Input } from '@angular/core';
import { PersonExpense } from 'src/model/types';
import { ExpenseService } from '../services/expense-service.service';
import { v4 } from 'uuid';

@Component({
  selector: 'expense-history',
  templateUrl: './expense-history.component.html',
  styleUrls: ['./expense-history.component.scss']
})
export class ExpenseHistoryComponent {
  @Input() people_expenses_lists?: PersonExpense[] = [];
  @Input() isDataLoading = true;
  @Input() expenseNotExist = false;
  total?: number;

  constructor(private expenseService: ExpenseService) {}

  calculateTotal() {
    this.total = 0;
    this.people_expenses_lists?.forEach(person => person.personExpense?.forEach(expense => this.total! += expense.money ?? 0));
  }

  addPerson() {
    const person = {_id: v4(), personName:"", personExpense: []};
    this.people_expenses_lists?.push(person);
    this.expenseService.addPerson("")
    .then((uploadedPerson) => person._id = uploadedPerson._id)
    .catch(() => this.people_expenses_lists?.pop());
  }

  ngOnInit():void {
    this.calculateTotal();
  }

  async deletePerson(id: string) {
    let deletePos = this.people_expenses_lists?.findIndex(person => person._id == id);
    let removedPerson = this.people_expenses_lists!.splice(deletePos!, 1);
    await this.expenseService.removePerson(id).catch(() => {
      this.people_expenses_lists?.splice(deletePos!, 0, ...removedPerson);
    });
  }
}

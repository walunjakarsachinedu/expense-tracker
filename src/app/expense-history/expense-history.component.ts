import { Component } from '@angular/core';
import { PersonExpense } from 'src/model/types';

@Component({
  selector: 'expense-history',
  templateUrl: './expense-history.component.html',
  styleUrls: ['./expense-history.component.css']
})
export class ExpenseHistoryComponent {
  personExpenses: PersonExpense[] = [
    {
      personName: 'पप्पा',
      expenses: [
        {money: 1000, tag: 'गाव'},
        {money: 500, tag: 'गाव'},
        {money: 500, tag: 'गाव'},
        {},
        {money: 249, tag: 'रिचार्ज'},
      ]
    },
    {
      personName: 'सचिन',
      expenses: [
        {money: 2000, tag: 'डिपोजिट'},
        {money: 249, tag: 'रिचार्ज'},
        {money: 4200, tag: 'लैपटॉप हफता'},
        {money: 3000, tag: 'व्याज'},
        {money: 250, tag: 'बस पास'},
      ]
    },
    {
      personName: 'नितीन',
      expenses: [
        {money: 1000, tag: 'गाव'},
      ]
    },
    {
      personName: 'बजाज',
      expenses: [
        {money: 2012, tag: 'वाशिंग मशीन हाफता'},
        {money: 2755, tag: 'टीव्ही हाफता'},
      ]
    },
    {
      personName: 'आई',
      expenses: [
        {money: 250, tag: 'किरकोळ'}
      ]
    },
  ];
}

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
        {id: '1', money: 1000, tag: 'गाव'},
        {id: '2', money: 500, tag: 'गाव'},
        {id: '3', money: 500, tag: 'गाव'},
        {id: '4', },
        {id: '5', money: 249, tag: 'रिचार्ज'},
      ]
    },
    {
      personName: 'सचिन',
      expenses: [
        {id: '1', money: 2000, tag: 'डिपोजिट'},
        {id: '2', money: 249, tag: 'रिचार्ज'},
        {id: '3', money: 4200, tag: 'लैपटॉप हफता'},
        {id: '4', money: 3000, tag: 'व्याज'},
        {id: '5', money: 250, tag: 'बस पास'},
      ]
    },
    {
      personName: 'नितीन',
      expenses: [
        {id: '1', money: 1000, tag: 'गाव'},
      ]
    },
    {
      personName: 'बजाज',
      expenses: [
        {id: '1', money: 2012, tag: 'वाशिंग मशीन हाफता'},
        {id: '2', money: 2755, tag: 'टीव्ही हाफता'},
      ]
    },
    {
      personName: 'आई',
      expenses: [
        {id: '1', money: 250, tag: 'किरकोळ'}
      ]
    },
  ];
}

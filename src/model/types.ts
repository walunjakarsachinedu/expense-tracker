interface Expense {
  id?: string;
  money?: number;
  tag?: string;
}

interface PersonExpense {
  personName?: String; 
  expenses?: Expense[];
}

enum Month {
  January = 'January',
  February = 'February',
  March = 'March',
  April = 'April',
  May = 'May',
  June = 'June',
  July = 'July',
  August = 'August',
  September = 'September',
  October = 'October',
  November = 'November',
  December = 'December',
}

type ExpensesByMonth = {
  [month in Month]?: PersonExpense[];
};


export {Expense, PersonExpense, ExpensesByMonth, Month};
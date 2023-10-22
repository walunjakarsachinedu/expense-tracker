interface Expense {
  id?: string;
  money?: number;
  tag?: string;
}

interface PersonExpense {
  id?: String;
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

interface ContextMenuItem {
  icon?: string;
  name?: string;
  onTap?: () => void
}

interface Position {
  x?: string;
  y?: string;
}


export {Expense, PersonExpense, ExpensesByMonth, Month, ContextMenuItem, Position};
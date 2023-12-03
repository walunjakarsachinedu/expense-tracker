interface Expense {
  _id?: string;
  month?: Month;
  year?: number;
  personExpenses?: PersonExpense[];
}

interface PersonExpense {
  _id?: String;
  personName?: String; 
  personExpenses?: ExpenseTag[];
}

interface ExpenseTag {
  _id?: string;
  money?: number;
  tag?: string;
}

enum Month {
  January = 'JANUARY',
  February = 'FEBRUARY',
  March = 'MARCH',
  April = 'APRIL',
  May = 'MAY',
  June = 'JUNE',
  July = 'JULY',
  August = 'AUGUST',
  September = 'SEPTEMBER',
  October = 'OCTOBER',
  November = 'NOVEMBER',
  December = 'DECEMBER',
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


export { ExpenseTag, Expense, PersonExpense, ExpensesByMonth, Month, ContextMenuItem, Position };
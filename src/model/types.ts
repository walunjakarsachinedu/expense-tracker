interface Expense {
  money?: number;
  tag?: string;
}

interface PersonExpense {
  personName?: String; 
  expenses?: Expense[];
}


export {Expense, PersonExpense};
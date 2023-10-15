import { PersonExpense, ExpensesByMonth, Month} from "src/model/types";

let expenseByMonth: ExpensesByMonth = {
  [Month.October]: [
    {
      personName: 'राजेश',
      expenses: [
        {id: '1', money: 1500, tag: 'बिल्स'},
        {id: '2', money: 800, tag: 'गाडी रेंट'},
        {id: '3', money: 450, tag: 'रेस्टोरेंट'},
        {id: '4', money: 300, tag: 'कॉफी'},
      ]
    },
    {
      personName: 'पूनम',
      expenses: [
        {id: '1', money: 1200, tag: 'शॉपिंग'},
        {id: '2', money: 600, tag: 'फैशन'},
      ]
    },
    {
      personName: 'अनुपम',
      expenses: [
        {id: '1', money: 3000, tag: 'होटल बुकिंग'},
        {id: '2', money: 1500, tag: 'टैक्सी'},
        {id: '3', money: 750, tag: 'दरबार खर्च'},
      ]
    },
    {
      personName: 'सोनिया',
      expenses: [
        {id: '1', money: 800, tag: 'फिटनेस'},
        {id: '2', money: 250, tag: 'फूड डिलिवरी'},
      ]
    },
    {
      personName: 'मोहन',
      expenses: [
        {id: '1', money: 2000, tag: 'घरच्या सामानाची खरेदी'},
        {id: '2', money: 500, tag: 'गिफ्ट्स'},
      ]
    }
  ],
};

export default expenseByMonth;
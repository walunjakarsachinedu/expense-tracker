import { PersonExpense, ExpensesByMonth, Month} from "src/model/types";

let expenseByMonth: ExpensesByMonth = {
  [Month.October]: [
    {
      id: "8f0d19fc-953d-4c22-af7b-1e41b33d0b5f",
      personName: 'राजेश',
      expenses: [
        {id: '1', money: 1500, tag: 'बिल्स'},
        {id: '2', money: 800, tag: 'गाडी रेंट'},
        {id: '3', money: 450, tag: 'रेस्टोरेंट'},
        {id: '4', money: 300, tag: 'कॉफी'},
      ]
    },
    {
      id: "cd5b0ec5-8c6e-4f62-b0e5-9aa7616e1921",
      personName: 'पूनम',
      expenses: [
        {id: '1', money: 1200, tag: 'शॉपिंग'},
        {id: '2', money: 600, tag: 'फैशन'},
      ]
    },
    {
      id: "2e79ab5b-6a8b-4d10-8e4c-37a36f1701b6",
      personName: 'अनुपम',
      expenses: [
        {id: '1', money: 3000, tag: 'होटल बुकिंग'},
        {id: '2', money: 1500, tag: 'टैक्सी'},
        {id: '3', money: 750, tag: 'दरबार खर्च'},
      ]
    },
    {
      id: "a9099fda-0756-4c5e-91ab-9a384fba253e",
      personName: 'सोनिया',
      expenses: [
        {id: '1', money: 800, tag: 'फिटनेस'},
        {id: '2', money: 250, tag: 'फूड डिलिवरी'},
      ]
    },
    {
      id: "65d51f7f-097a-4a84-bd09-cb2e07c938a9",
      personName: 'मोहन',
      expenses: [
        {id: '1', money: 2000, tag: 'घरच्या सामानाची खरेदी'},
        {id: '2', money: 500, tag: 'गिफ्ट्स'},
      ]
    }
  ],
};

export default expenseByMonth;
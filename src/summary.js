import { getData, getMonth } from "./utils.js";

let expensesData = getData();
let budgetData = getData(2);

const tHead = document.querySelector('.editor thead');
const tBody = document.querySelector('.editor tbody');
const tFoot = document.querySelector('.editor tfoot');

let expenses = Array.from(expensesData.values());
let budget = Array.from(budgetData.values());

let budgetDates = [];
let expensesDates = [];

let map = new Map();

budget.forEach(element => {
    budgetDates.push(element.date);
});

console.log(expenses);

for (let i = 0; i < budgetDates.length; i++) {

    let month = budgetDates[i].slice(0, 3);

    for (let j = 0; j < expenses.length; j++) {

        let record = expenses[j];
        let currMonth = expenses[j].date.slice(5, 7);
        let currCategory = record.category;
        debugger;
        if (month == getMonth(currMonth)) {
            if (!map.has(month)) {

                map.set(month, new Map().set(currCategory, new Array()))

                if (!map.get(month).has(currCategory)) {

                    map.get(month).set(currCategory, new Array());
                    map.get(month).get(currCategory).push(record.amount);
                } else {
                    map.get(month).get(currCategory).push(record.amount);
                }
            }
            else if (map.has(month)) {
                if (!map.get(month).has(currCategory)) {

                    map.get(month).set(currCategory, new Array());
                    map.get(month).get(currCategory).push(record.amount);
                } else {
                    map.get(month).get(currCategory).push(record.amount);
                }
            }
        }
    }
}

console.log(map);






